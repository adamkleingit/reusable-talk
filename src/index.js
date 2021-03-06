import React, { useState, useCallback } from "react";
import { createStore, ReusableProvider } from "reusable";
import ReactDOM from "react-dom";
import { LocaleSwitcher, useLocalization } from "./reusable-locale";
import { ENGLISH_MESSAGE, POLISH_MESSAGE } from "./messages";
import { generateJoke } from "./jokes";
import "./styles.css";

const useCurrentUser = createStore(() => {
  return useState('Adam');
})

const useChatMessages = createStore(() => {
  const [messages, setMessages] = useState([
    { text: "Hi", fromMe: false },
    { text: "Wanna hear a joke?", fromMe: false }
  ]);
  const [readIndex, setReadIndex] = useState(0);

  const [user, setUser] = useCurrentUser();

  const addMessage = useCallback(
    text => {
      setMessages(prev => [...prev, { text, fromMe: true }]);
      setReadIndex(prev => prev + 1);
      const joke = generateJoke();
      setTimeout(() => {
        setMessages(prev => [...prev, { text: joke, fromMe: false }]);
      }, 2000)
    },
    []
  );
  const markAsRead = useCallback(() => setReadIndex(messages.length), [
    messages.length
  ]);
  const unreadCount = messages.length - readIndex;

  return {
    messages,
    addMessage,
    markAsRead,
    unreadCount
  };
});

const Header = () => {
  // const [unreadCount, markAsRead] = [0, null];
  const { unreadCount, markAsRead } = useChatMessages();

  return (
    <header>
      <div>Adam</div>
      <div>Home</div>
      <div>Create</div>
      <div className="header-chat" onClick={markAsRead}>
        {unreadCount ? (
          <span className="header-chat-badge">{unreadCount}</span>
        ) : (
            ""
          )}
      </div>
      <LocaleSwitcher />
    </header>
  );
};

const Footer = () => {
  const { messages, addMessage, markAsRead, unreadCount } = useChatMessages();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      markAsRead();
    }
  };

  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  const handleKeyPress = useCallback(
    e => {
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
          Dad Jokes Bot {unreadCount ? `(${unreadCount})` : ""}
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
  const messagesLength = useChatMessages(
    state => state.messages.length
  );
  const { locale } = useLocalization();

  return <h1>
    <div>{locale === 'en' ? ENGLISH_MESSAGE : POLISH_MESSAGE}</div>
    Message count: {messagesLength}<br /> Render count: {++renderCount}
  </h1>;
};

function App() {
  return (
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ReusableProvider>
    <App />
  </ReusableProvider>,
  rootElement
);
