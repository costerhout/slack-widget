import React from 'react';
import './App.css';

const {
  WebClient
} = require('@slack/web-api');

const token = process.env.AKDEVALLIANCE_TOKEN;
const web = new WebClient(token);
const idChannel = 'C01D66F6E7K';

// Grab list of all the users
const getUsers = async () => {
  const limit = 50;
  let records = [];
  let keepGoing = true;
  let cursor = undefined;
  
  while (keepGoing) {
    let response = await web.users.list({
      limit: limit,
      cursor: cursor
    });
    await records.push.apply(records, response.members);
    cursor = response.response_metadata.next_cursor;
    
    keepGoing = response.ok && cursor !== '';
  }

  console.log(records.length);
}

getUsers();

function App() {
  return ( <
    div className = "slack-widget" >
    <
    h1 > Yo < /h1> <
    /div>
  );
}

export default App;