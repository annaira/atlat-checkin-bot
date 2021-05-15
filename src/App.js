import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.scss';
import {Chat} from "@progress/kendo-react-conversational-ui";
import {Slider, SliderLabel} from "@progress/kendo-react-inputs";


const user = {
  id: 1,
  avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
};
const bot = {
  id: 0,
};


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
  text: "How old are you (in years)?",
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

const wageQuestion =
  {
  author: bot,
  suggestedActions: [
    {
      type: "reply",
      value: "yes",
    },
    {
      type: "reply",
      value: "not on time",
    },
    {
      type: "reply",
      value: "not in full",
    },
    {
      type: "reply",
      value: "neither in full nor on time",
    },
  ],
  timestamp: new Date(),
  text: "Have you always been paid your wages on time and in full in the last three months?",
};

const genderQuestion =
  {
  author: bot,
  suggestedActions: [
    {
      type: "reply",
      value: "man",
    },
    {
      type: "reply",
      value: "woman",
    },
    {
      type: "reply",
      value: "divers",
    },
  ],
  timestamp: new Date(),
  text: "What is your gender?",
};

const workYearQuestion =
  {
  author: bot,
  timestamp: new Date(),
  text: "In which year did you start to work at the factory?",
};

const overtimeQuestion =
  {
  author: bot,
  timestamp: new Date(),
  text: "How much overtime have you worked in the last three months?",
};

const promoterQuestion =
  {
  author: bot,
  timestamp: new Date(),
  text: "On a scale from 0 to 10, would you recommend your workplace to a friend? (From 0 = No! to 10 = Yes!)",
};

const blanco =
  {
  author: bot,
  timestamp: new Date(),
  text: "Oops, something went wrong",
};

const thankYou =
  {
  author: bot,
  timestamp: new Date(),
  text: "Thank you for helping us!",
};

const reply_array = [workYearQuestion, blanco, wageQuestion, blanco, overtimeQuestion, blanco, safetyQuestion, blanco, ageQuestion, blanco, genderQuestion, blanco, promoterQuestion, blanco, thankYou];



const App = () => {
  const [messages, setMessages] = React.useState(initialMessages);

  const addNewMessage = (event) => {
    const current_message = (messages.length-1);
    let botResponse = Object.assign({}, event.message);
    botResponse = reply_array[current_message];
//    botResponse.text = reply_array[(messages.length-1)];
//    botResponse.author = bot;
    setMessages([...messages, event.message]);
    setTimeout(() => {
      setMessages((oldMessages) => [...oldMessages, botResponse]);
    }, 1000);
  };

  const Toolbar = () => {
    return (<span>
            <Slider buttons={false} step={1} defaultValue={5} min={0} max={10}>
              <SliderLabel position={0}>0</SliderLabel>
              <SliderLabel position={5}>5</SliderLabel>
              <SliderLabel position={10}>10</SliderLabel>
            </Slider>
          </span>);
  };

  const countReplayLength = (question) => {
    let length = question.length;
    let answer = question + " contains exactly " + length + " symbols.";
    return answer;
  };



  return (
      <Chat
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        placeholder={"Type a message..."}
        width={"100%"}
        showToolbar={true}
        toolbar={<Toolbar />}
      />
  );
};
export default App;
