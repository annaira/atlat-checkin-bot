import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { Calendar } from '@progress/kendo-react-dateinputs';
import { Chat } from '@progress/kendo-react-conversational-ui';

class App extends Component {

constructor(props) {
    super(props);
    this.user = {
      id: 1,
      avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
    };
    this.bot = { id: 0 };
    this.state = {
      messages: [
        {
          author: this.bot,
          suggestedActions: [
            {
              type: "reply",
              value: "Oh, really?",
            },
            {
              type: "reply",
              value: "Thanks, but this is boring.",
            },
          ],
          timestamp: new Date(),
          text: "Hello, this is a demo bot. I don't do much, but I can count symbols!",
        },
      ],
    };
  }

  addNewMessage = (event) => {
    let botResponce = Object.assign({}, event.message);
    botResponce.text = this.countReplayLength(event.message.text);
    botResponce.author = this.bot;
    this.setState((prevState) => ({
      messages: [...prevState.messages, event.message],
    }));
    setTimeout(() => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, botResponce],
      }));
    }, 1000);
  };

  countReplayLength = (question) => {
    let length = question.length;
    let answer = question + " contains exactly " + length + " symbols.";
    return answer;
  };

	render() {
	  return (
	    <div className="App">
	      <h1>Hello KendoReact!</h1>
	      <Calendar/>
        <Chat
          user={this.user}
          messages={this.state.messages}
          onMessageSend={this.addNewMessage}
          placeholder={"Type a message..."}
          width={400}
        />
	    </div>
	  );
	}
}

export default App;
