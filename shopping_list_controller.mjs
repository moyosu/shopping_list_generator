import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDB, writeDB } from './local_storage.mjs';

const app = express();
app.use(express.json());

// Error handling
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};

// Validate List name
const validateList = (req, res, next) => {
  const { name } = req.body;
  // Check if name is provided and is a string
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'List name is required and must be a string' });
  }
  next();
};

// Validate Item
const validateItem = (req, res, next) => {
  const { name, quantity } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Item name is required and must be a string' });
  }
  if (quantity && typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Quantity must be a number' });
  }
  next();
};

// List finder
const findList = (req, res, next) => {
  try {
    // Read all shopping lists from the database
    const lists = readDB();
    // Find the specific list by its ID from the URL parameters
    const list = lists.find(l => l.id === req.params.listId);
    // If no list is found with that ID, return a 404 error
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    // Attach the found list and all lists to the request object for later use
    req.list = list;
    req.lists = lists;
    // Continue to the next handler
    next();
  } catch (error) {
    next(error);
  }
};

// Item finder
const findItem = (req, res, next) => {
  const item = req.list.items.find(i => i.id === req.params.itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  req.item = item;
  next();
};

// Start Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Shopping List Generator running on http://localhost:${PORT}`);
});

// Create Shopping List
app.post('/lists', validateList, (req, res, next) => {
  try {
    const lists = readDB();
    // Define a list to be added
    const newList = { id: uuidv4(), name: req.body.name, items: [] };
    // Add list to the lists and write to local storage
    lists.push(newList);
    writeDB(lists);
    res.status(200).json(newList);
  } catch (error) {
    next(error);
  }
});

// Get All Lists
app.get('/lists', (req, res, next) => {
  try {
    res.json(readDB());
  } catch (error) {
    next(error);
  }
});

// Add Item to List
app.post('/lists/:listId/items', findList, validateItem, (req, res, next) => {
  try {
    // Define an item to be added to the list
    const newItem = {
      id: uuidv4(),
      name: req.body.name,
      quantity: req.body.quantity || 0,
      purchased: false
    };
    // Add item to the list
    req.list.items.push(newItem);
    // Write to local storage
    writeDB(req.lists);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

// Update Item in List
app.put('/lists/:listId/items/:itemId', findList, findItem, validateItem, (req, res, next) => {
  try {
    // Update the item's name if provided in the request, otherwise keep the existing name
    req.item.name = req.body.name || req.item.name;
    // Update the item's quantity if provided in the request, otherwise keep the existing quantity
    req.item.quantity = req.body.quantity ?? req.item.quantity;
    writeDB(req.lists);
    res.json(req.item);
  } catch (error) {
    next(error);
  }
});

// Delete Item from List
app.delete('/lists/:listId/items/:itemId', findList, (req, res, next) => {
  try {
    // Find the index of the item
    const itemIndex = req.list.items.findIndex(i => i.id === req.params.itemId);
    // If no item was found (index is -1), return a 404 error
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    // Remove exactly one item at the found index position from the items array
    req.list.items.splice(itemIndex, 1);
    writeDB(req.lists);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Mark Item as Purchased
app.patch('/lists/:listId/items/:itemId', findList, findItem, (req, res, next) => {
  try {
    const { purchased } = req.body;
    if (typeof purchased !== 'boolean') {
      return res.status(400).json({ error: 'Purchased must be a boolean value' });
    }
    req.item.purchased = purchased;
    writeDB(req.lists);
    res.json(req.item);
  } catch (error) {
    next(error);
  }
});

// Delete Shopping List
app.delete('/lists/:listId', findList, (req, res, next) => {
  try {
    const listIndex = req.lists.findIndex(l => l.id === req.params.listId);
    req.lists.splice(listIndex, 1);
    writeDB(req.lists);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Error handling
app.use(errorHandler);