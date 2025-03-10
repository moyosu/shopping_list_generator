## Ground Rules Established: 

Communication method: Discord. Discord is free, easy to use, and allows for text, audio, screensharing, video, etc. I think it would be the best tool for asynchronous communication. I have already started a Discord server for our group, so if we choose to use this as our main way to communicate then feel free to join and make a post in the general so we know who's here. Server: https://discord.gg/JBVGWVM3 Links to an external site.

Expectation for responsiveness: I think responding within 24 hours is a reasonable time given we all have other classes, responsibilities, and lives to manage. That being said, understanding deadlines and crunch times is necessary. If an assignment is due on Sunday and someone sends a last-minute message on Saturday morning, it's in our best interest to respond as quickly as possible. Acknowledge messages when you’ve seen them and respond within 24 hours.

Readable Code: When writing code that will be viewed, shared, or used by another teammate, ensure that it is commented on thoroughly and accurately. This is so that anyone reading it can understand what is happening and can make modications easily. If needed, use a README le to further elaborate or explain the code, your thinking, and the goal/purpose.

When will a backup plan for microservices go into effect:

- If a team member does not respond within 48 hours then we can escalate communication beyond Discord to email, Microsoft Teams, text, phone, or whatever else is available and within reason.

- If there is still no response within 24 hours of escalating communication, then the team can start the backup plan.

For a backup plan, the team should:

1. Assess the impact of the microservice and determine its role in the software.

2. Assess whether or not it is essential or could be delayed.

3. Determine if the microservice should be reassigned to another team member, not implementing the microservice, or delaying the microservice.

4. If the microservice is reassigned to a team member, communication is key. Advice or help should be given when possible and an overview of the steps, libraries, or features necessary should be discussed and written down.

5. If we choose to not implement the microservice, it would be easiest to make any adjustments or updates within the main program or other microservices to avoid any errors or bugs.

6. If we choose to delay the microservice, then a new timeline or plan should be put in place to discuss the implementation of the microservice down the road.

7. Important information during this decision-making process should be written down for future communication and accountability.

All group members should prioritize communication:

- If you think it's worth mentioning then it is.

- Notify teammates of availability or changes in availability.

- There are no bad questions.

- Document changes in your timeline, responsibilities, design, etc.

- Let everyone know what step of an assignment/microservice you're on.

- Be respectful to one another and avoid blame.

- Update team members if something unexpected happens.

- Respect other people's time: Show up to meetings on time and end meetings within the specied period. Additional meetings can be scheduled if a meeting exceeds the allotted time to respect other's schedules.

When Confused:

- Thoroughly read through the assignment/design doc

- Check Ed Discussion

- Ask teammates

- Ask TA or instructor

### How to programmatically REQUEST data

```
### Create a new shopping list
POST http://localhost:3001/lists
Content-Type: application/json

{
    "name": "Grocery List"
}

### Add item to Grocery List (replace LIST_ID with actual ID from response)
POST http://localhost:3001/lists/{{LIST_ID}}/items
Content-Type: application/json

{
    "name": "Milk",
    "quantity": 2
}

### Update item (replace LIST_ID and ITEM_ID with actual IDs)
PUT http://localhost:3001/lists/{{LIST_ID}}/items/{{ITEM_ID}}
Content-Type: application/json

{
    "name": "Whole Milk",
    "quantity": 3
}

### Mark item as purchased
PATCH http://localhost:3001/lists/{{LIST_ID}}/items/{{ITEM_ID}}
Content-Type: application/json

{
    "purchased": true
}
```
### How to programmatically REQUEST data
```
### Get all shopping lists
GET http://localhost:3001/lists

```

### UML Sequence Diagram
![UML Sequence Diagram](/shopping_list_service.png)

### Mitigation Plan
- #### Shopping List Generator is intended for *Tom Cocker*
- #### Current Status: Complete
- #### Access Microservice: ```gh repo clone moyosu/shopping_list_generator``` or [GITHUB](https://github.com/moyosu/shopping_list_generator.git)
- #### If teammate cannot access/call this microservice: Reach out to me via Discord server mentioned above. I will be available to help in the morning on weekdays before noon.
- #### Please try to make your own research on how to use REST API and/or git. If unable to access/call microservice for more than a day, reach out to me!
- #### Things to know:
  - I would recommended downloading Github Desktop for easier clone a repo.
  - After cloning the repo, run `npm install` or `npm ci` to install all dependencies.
  - run `npm start` to spin up the microservice.
  - I have to push a commit after you've cloned the repo and your origin/main branch is behind, run `git fetch` and `git pull` for the latest commit.
  - If you intend to modify the code, consider create a new branch using `git checkout -b [new-branch-name]`.
