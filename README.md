# Chat-App
Chat Application based on socket.io 

**Tech Stack:**

- Front End - React with Redux, scss
- Back End  - Express and socket.io for realtime communication



**To Run:**

Clone the repository and run the following commands under appropriate directories
 - Do 'npm install'
 - Run 'npm start'
Server starts at 8088 and client at 8080

**How it works:**
 - Provide a nickname
 - Server checks for the nickname availability and if available user gets routed to chat page 
 -  By default user gets connected to a default group which is 'Hall of Chatter' in this case
 - Click on the conversations tab to get the list of connected users and the groups you are a member of
 - All the groups appear in Italics while individual clients in normal text as bullet list
 - App pops notification if a message is received from another chat which is not currently active

**Code Structure and Characteristics:**

**1. Front End:**

 - React components are divided into 'components' and 'containers'
 - Components are dumb and are functional components
 - They do not know about the state or redux store, their role is to take care of the UI
 - Containers know about the states and are connected to redux stores
 - They just render the corresponding UI component
 - All the actions are dispatched via 'containers'
 - Reducers are responsible for updating the states in store
 - Reducers are pure functions
 - SASS is used are pre-processor for CSS

**2. Back end:**


 - All socket related events are written  socket.js file
 - Callbacks for socket events are written in different files separated by concerns
 - Modular pattern is used

**App Features:**

- Instant text messaging to a particular client or to a group
- New features will be added in future commits **:)**

 
