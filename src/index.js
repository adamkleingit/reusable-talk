import React, { useState, useCallback } from "react";
import { createStore, ReusableProvider } from "reusable";
import ReactDOM from "react-dom";
import { LocaleSwitcher, useLocalization } from "./reusable-locale";
import { generateMessage } from "./messages";
import "./styles.css";

const initialMessages = [
  { text: generateMessage(), fromMe: false },
  { text: generateMessage(), fromMe: false },
];

// const useConfig = createStore(() => {
//   return useState({delay: 3000});
// })

const useChatMessages = () => {
  // return {
  //   messages,
  //   addMessage,
  //   markAsRead,
  //   unreadCount
  // };
};

const Header = () => {
  const [unreadCount, markAsRead] = [0, null];
  // const { unreadCount, markAsRead } = useChatMessages();

  const handleClick = () => {
    markAsRead();
  };

  return (
    <header>
      <div>Adam</div>
      <div>Home</div>
      <div>Create</div>
      <div className="header-chat" onClick={handleClick}>
        {unreadCount ? (
          <span className="header-chat-badge">{unreadCount}</span>
        ) : (
          ""
        )}
      </div>
      {/* <LocaleSwitcher /> */}
    </header>
  );
};

const Footer = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [readIndex, setReadIndex] = useState(0);

  const addMessage = useCallback((text) => {
    setMessages((prev) => [...prev, { text, fromMe: true }]);
    setReadIndex((prev) => prev + 1);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: generateMessage(), fromMe: false },
      ]);
    }, 3000);
  }, []);
  const markAsRead = useCallback(() => setReadIndex(messages.length), [
    messages.length,
  ]);
  const unreadCount = messages.length - readIndex;

  // const { messages, addMessage, markAsRead, unreadCount } = useChatMessages();

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      markAsRead();
    }
  };

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && value) {
        addMessage(value);
        setValue("");
      }
    },
    [value, addMessage]
  );
  return (
    <footer>
      <div className="chat">
        <div className="title" onClick={toggle}>
          Lorem Ipsum {unreadCount ? `(${unreadCount})` : ""}
        </div>
        {isOpen ? (
          <React.Fragment>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={message.fromMe ? "right" : ""}>
                  {message.text}
                </div>
              ))}
            </div>
            <input
              value={value}
              placeholder="Type a message"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </footer>
  );
};

let renderCount = 0;

const Body = () => {
  const { messages } = useChatMessages();
  // const { locale } = useLocalization();

  return (
    <h1>
      {/* <div>{locale === 'en' ? 'Where is the water?' : 'איפה הבירה?'}</div> */}
      Message count: {messages.length}
      <br /> Render count: {++renderCount}
    </h1>
  );
};

function App() {
  return (
    <React.Fragment>
      <Header />
      {/* <Body /> */}
      <Footer />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
