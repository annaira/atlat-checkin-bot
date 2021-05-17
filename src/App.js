import React, {useState} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.scss';
import {Chat} from "@progress/kendo-react-conversational-ui";
import {Slider, SliderLabel} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";

const user = {
  id: 1,
  avatarUrl: "https://raw.githubusercontent.com/annaira/atlat-checkin-bot/main/src/atlat-theme/user_avater_100px.png",
};
const bot = {
  id: 0,
  avatarUrl: "https://raw.githubusercontent.com/annaira/atlat-checkin-bot/main/src/atlat-theme/bot_avatar_100px.png",
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
  text: "How many hours of overtime have you worked in the last three months?",
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

const bye =
  {
  author: bot,
  timestamp: new Date(),
  text: "Goodbye.",
};

const reply_array = [workYearQuestion,
   blanco,
   wageQuestion,
   blanco,
   overtimeQuestion,
   blanco,
   safetyQuestion,
   blanco,
   ageQuestion,
   blanco,
   genderQuestion,
   blanco,
   promoterQuestion,
   blanco,
   thankYou,
   blanco,
   bye,
   blanco];

const App = () => {
  const [messages, setMessages] = React.useState(initialMessages);
  const [showToolbar, setShowToolbar] = React.useState(false);

  const addNewMessage = (event) => {
    const current_message = (messages.length-1);

    // Check for toolbar
    if (current_message === 12) {
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }

    // Ask next question
    let botResponse = Object.assign({}, event.message);
    botResponse = reply_array[current_message];
    setMessages([...messages, event.message]);
    setTimeout(() => {
      setMessages((oldMessages) => [...oldMessages, botResponse]);
    }, 1000);
  };

  const sliderStyle = {
    width: '400px',
    height: '32px'
  };

  const buttonStyle = {
    "marginLeft": '10px',
    "marginBottom": '20px',
  }

  const [value, setValue] = useState(5);

  const sliderButtonClick = (event) => {
    let sliderResponse;

    sliderResponse = {
      author: user,
      timestamp: new Date(),
      text: Math.round(value),
    };
    setMessages([...messages, sliderResponse]);

    // Check for toolbar
    const current_message = (messages.length-1);
    if (current_message === 12) {
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }

    let botResponse = thankYou;
    setTimeout(() => {
      setMessages((oldMessages) => [...oldMessages, botResponse]);
    }, 1000);
  };

  const handleChange = (event) => {
    setValue(event.value);
  };

  const Toolbar = () => {
    return (<span>
            <Slider buttons={false} step={1} value={value} min={0} max={10} style={sliderStyle} onChange={handleChange} >
            <SliderLabel position={0}>0</SliderLabel>
            <SliderLabel position={5}>5</SliderLabel>
            <SliderLabel position={10}>10</SliderLabel>
            </Slider>
            <Button style={buttonStyle} icon="play" onClick={sliderButtonClick}></Button>
          </span>);
  };

  // This function checks, if the normal message bar should be displayed
  const customMessage = (props) => {
    let result;
    const current_message = (messages.length-1);

    // Check for toolbar
    if (current_message === 13 || current_message === 14 ) {
      result = (<React.Fragment>
                </React.Fragment>);
    } else {
      result = (<React.Fragment>
                  {props.messageInput}
                  {props.sendButton}
                </React.Fragment>);
    }
    return (result);
  };

  return (
      <Chat
          user={user}
          messages={messages}
          onMessageSend={addNewMessage}
          placeholder={"Type a message..."}
          messageBox={customMessage}
          width={"100%"}
          showToolbar={showToolbar}
          toolbar={<Toolbar/>}
          style={{height: "100%", width: "100%", overflow: "hidden"}}
      />
  );
};
export default App;
