import React, { useState, useCallback, useEffect } from "react";
import { reusable, ReusableProvider } from "reusable";
import ReactDOM from "react-dom";
import { LocalSwitcher, useLocalization } from "./reusable-locale";
import "./styles.css";

const useChatMessages = reusable(() => {
  const [readIndex, setReadIndex] = useState(0);
  const [messages, setMessages] = useState(["Hi", "How Are You?", "I'm Fine"]);

  const addMessage = useCallback(
    message => setMessages(prev => [...prev, message]),
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
  const unreadCount = useChatMessages(state => state.unreadCount);
  const { currentTime } = useLocalization();

  return (
    <header>
      <div>{currentTime()}</div>
      <div>Adam</div>
      <div>Home</div>
      <div>Create</div>
      <div className="header-chat">
        {unreadCount ? (
          <span className="header-chat-badge">{unreadCount}</span>
        ) : (
          ""
        )}
      </div>
      <LocalSwitcher />
    </header>
  );
};

const Footer = () => {
  const { messages, addMessage, markAsRead, unreadCount } = useChatMessages();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      markAsRead();
    }
  };
  useEffect(() => {
    if (isOpen && unreadCount) {
      markAsRead();
    }
  }, [unreadCount, isOpen, markAsRead]);

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
          Maayan {unreadCount ? `(${unreadCount})` : ""}
        </div>
        {isOpen ? (
          <React.Fragment>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={index < 2 ? "" : "right"}>
                  {message}
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
const Body = () => {
  const messagesCount = useChatMessages(state => state.messages.length);
  console.log("Body");

  return <h1>{messagesCount}</h1>;
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
ReactDOM.render(
  <ReusableProvider>
    <App />
  </ReusableProvider>,
  rootElement
);
