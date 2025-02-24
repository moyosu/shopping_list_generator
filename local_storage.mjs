import { existsSync, writeFileSync, readFileSync } from 'fs';  // Import file system module

const dbFile = './data.json';

// Read data from local JSON file
const readDB = () => {
  try {
    // Check if file exists, if not create it
    if (!existsSync(dbFile)) {
      writeFileSync(dbFile, JSON.stringify([]));
    }
    return JSON.parse(readFileSync(dbFile));
  } catch (error) {
    console.error('Error reading data from file:', error);
    return [];
  }
};

// Write data to local JSON file
const writeDB = (data) => {
  try {
    // Write data to file
    writeFileSync(dbFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};

export { readDB, writeDB };