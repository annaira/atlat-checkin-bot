import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { Chat, HeroCard } from "@progress/kendo-react-conversational-ui";
import { Calendar } from "@progress/kendo-react-dateinputs";


const user = {
  id: 1,
  avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
};
const bot = {
  id: 0,
};

const reply_array = ["How many years are you old?","skip", "In which year did you start to work at the factory?", "skip"]


const initialMessages = [
  {
    author: bot,
    suggestedActions: [
      {
        type: "reply",
        value: "Okay",
      },
    ],
    timestamp: new Date(),
    text: "Hello, please help us to learn more about you and answer a few questions.",
  },
];

const ageQuestion =
  {
  author: bot,
  timestamp: new Date(),
  text: "How many years are you old?",
};

const safetyQuestion =
  {
  author: bot,
  suggestedActions: [
    {
      type: "reply",
      value: "very safe",
    },
    {
      type: "reply",
      value: "safe",
    },
    {
      type: "reply",
      value: "unsafe",
    },
    {
      type: "reply",
      value: "very unsafe",
    },
  ],
  timestamp: new Date(),
  text: "How do you rate the physical safety at your workplace?",
};

const workYearQuestion =
  {
  author: bot,
  timestamp: new Date(),
  text: "In which year did you start to work at the factory?",
};

const blanco =
  {
  author: bot,
  timestamp: new Date(),
  text: "Oops, something went wrong",
};

const reply_array_new = [ageQuestion, blanco, safetyQuestion, blanco, workYearQuestion, blanco];



const App = () => {
  const [messages, setMessages] = React.useState(initialMessages);

  const addNewMessage = (event) => {
    const current_message = (messages.length-1);
    let botResponse = Object.assign({}, event.message);
    botResponse = reply_array_new[current_message];
//    botResponse.text = reply_array[(messages.length-1)];
//    botResponse.author = bot;
    setMessages([...messages, event.message]);
    setTimeout(() => {
      setMessages((oldMessages) => [...oldMessages, botResponse]);
    }, 1000);
  };



  const countReplayLength = (question) => {
    let length = question.length;
    let answer = question + " contains exactly " + length + " symbols.";
    return answer;
  };



  return (
    <div>
      <Chat
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        placeholder={"Type a message..."}
        width={400}
        showToolbar={true}
      />
    </div>
  );
};
export default App;
