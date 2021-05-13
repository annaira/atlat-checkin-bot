import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { Chat, HeroCard } from "@progress/kendo-react-conversational-ui";
import { Calendar } from "@progress/kendo-react-dateinputs";
import { ApiAiClient } from "api-ai-javascript";
const client = new ApiAiClient({
  accessToken: "280344fb165a461a8ccfef7e1bb47e65",
});
const user = {
  id: 1,
  name: "John",
};
const bot = {
  id: "botty",
  name: "Botty McbotFace",
  avatarUrl: "https://demos.telerik.com/kendo-ui/content/chat/InsuranceBot.png",
};

const App = () => {
  const [messages, setMessages] = React.useState([]);
  const onResponse = React.useCallback(
    (activity) => {
      let responseMessages = [];
      activity.result.fulfillment.messages.forEach(function (element) {
        let newMessage;
        newMessage = {
          text: element.speech,
          author: bot,
          timestamp: new Date(activity.timestamp),
          suggestedActions: element.replies
            ? element.replies.map((x) => {
                return {
                  type: "reply",
                  title: x,
                  value: x,
                };
              })
            : [],
        };
        responseMessages.push(newMessage);
      });
      setMessages((oldMessages) => [...oldMessages, ...responseMessages]);

      if (activity.result.fulfillment.data) {
        let newMessage;
        newMessage = {
          text: "",
          author: bot,
          timestamp: new Date(activity.timestamp),
          suggestedActions: activity.result.fulfillment.data.null
            .suggestedActions
            ? parseActions(
                activity.result.fulfillment.data.null.suggestedActions
              )
            : [],
          attachments: activity.result.fulfillment.data.null.attachments
            ? activity.result.fulfillment.data.null.attachments
            : [],
        };
        setMessages((oldMessages) => [...oldMessages, newMessage]);
      }

      if (
        activity.result.fulfillment.speech ===
        "When do you want your insurance to start?"
      ) {
        let newAttachments = [
          {
            type: "calendar",
          },
        ];
        setMessages([
          ...messages,
          {
            author: bot,
            timestamp: new Date(activity.timestamp),
            attachments: newAttachments,
          },
        ]);
      }
    },
    [messages]
  );
  React.useEffect(() => {
    client.eventRequest("Welcome").then(onResponse);
  }, []);

  const аttachmentTemplate = (props) => {
    let attachment = props.item;

    if (attachment.type === "quote") {
      return (
        <div className="k-card k-card-type-rich">
          <div className="k-card-body">
            <div>
              <strong>Type:</strong>
              <span>{attachment.coverage}</span>
            </div>
            <div>
              <strong>Car model:</strong>
              <span>{attachment.make}</span>
            </div>
            <div>
              <strong>Car cost:</strong>
              <span>{attachment.worth}</span>
            </div>
            <div>
              <strong>Start date:</strong>
              <span>{attachment.startDate}</span>
            </div>
            <hr />
            <div>
              <strong>Total:</strong>
              <span>{attachment.premium}</span>
            </div>
          </div>
        </div>
      );
    } else if (attachment.type === "payment_plan") {
      return (
        <div className="k-card k-card-type-rich">
          <div className="k-card-body">
            {attachment.rows.map((row, index) => (
              <div key={index}>{row.text}</div>
            ))}
            <hr />
            <div>
              <strong>Total:</strong>
              <span>{attachment.premium}</span>
            </div>
          </div>
        </div>
      );
    } else if (attachment.type === "calendar") {
      return (
        <Calendar
          onChange={(event) => {
            addNewMessage(event);
          }}
        />
      );
    }

    return (
      <HeroCard
        title={attachment.title}
        imageUrl={attachment.images ? attachment.images[0].url : ""}
        subtitle={attachment.subtitle ? attachment.subtitle : ""}
        actions={attachment.buttons}
        onActionExecute={addNewMessage}
      />
    );
  };

  const parseActions = (actions) => {
    if (actions !== undefined) {
      actions.map((action) => {
        if (action.type === "postBack") {
          action.type = "reply";
        }
      });
      return actions;
    }

    return [];
  };

  const parseText = (event) => {
    if (event.action !== undefined) {
      return event.action.value;
    } else if (event.value) {
      return event.value;
    } else {
      return event.message.text;
    }
  };

  const addNewMessage = (event) => {
    let value = parseText(event);
    client.textRequest(value.toString()).then(onResponse, this);

    if (!event.value) {
      setMessages([
        ...messages,
        {
          author: user,
          text: value,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <Chat
      messages={messages}
      user={user}
      onMessageSend={addNewMessage}
      attachmentTemplate={аttachmentTemplate}
    />
  );
};

export default App;
