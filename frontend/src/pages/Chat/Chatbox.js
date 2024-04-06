// import React, { useEffect, useState, useRef } from "react";
// import "./Chatbox.css";
// import { format } from "timeago.js";
// import InputEmoji from "react-input-emoji";

// const Chatbox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
//   const [userData, setUserData] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const scrollRef = useRef();

//   useEffect(() => {
//     if (receiveMessage !== null && chat && receiveMessage.chatId === chat._id) {
//       console.log("Received message:", receiveMessage);
//       setMessages((prevMessages) => [...prevMessages, receiveMessage]);
//     }
//   }, [receiveMessage, chat]);

//   useEffect(() => {
//     if (!chat) return;

//     const fetchUserData = async () => {
//       const otherUserId = chat?.members?.find((id) => id !== currentUser);
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/userr/${otherUserId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const userData = await response.json();
//         console.log("Fetched user data:", userData);
//         setUserData(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/message/${chat._id}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch messages");
//         }
//         const messages = await response.json();
//         console.log("Fetched messages:", messages);
//         setMessages(messages);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchUserData();
//     fetchMessages();
//   }, [chat, currentUser]);

//   const handleChange = (newMessage) => {
//     setNewMessage(newMessage);
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     const message = {
//       senderId: currentUser,
//       text: newMessage,
//       chatId: chat._id,
//     };

//     // Send message to the database
//     try {
//       const response = await fetch("http://localhost:4000/api/message", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }
//       const data = await response.json();
//       console.log("Sent message:", data);
//       setMessages((prevMessages) => [...prevMessages, data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }

//     // Send message to socket server
//     const receiverId = chat?.members?.find((id) => id !== currentUser);
//     setSendMessage({ ...message, receiverId });
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="ChatBox-container">
//       {chat ? (
//         <>
//           <div className="chat-header">
//             {userData && (
//               <div className="cb-user-info">
//                 <svg
//                   className="user-icon"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//                 <div className="cb-username">
//                   <span>{userData.username}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//           <hr />
//         </>
//       ) : (
//         <span className="chatbox-empty-message">
//           Tap on a Chat to start Conversation...
//         </span>
//       )}

//       {/* Chatbox messages */}
//       <div className="chat-body">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={
//               message.senderId === currentUser ? "message own" : "message"
//             }
//           >
//             <span>{message.text}</span>
//             <span>{format(message.createdAt)}</span>
//           </div>
//         ))}
//         <div ref={scrollRef}></div>
//       </div>

//       {/* chat-sender */}
//       <div className="chat-sender">
//         <div>+</div>
//         <InputEmoji value={newMessage} onChange={handleChange} />
//         <div className="send-button button" onClick={handleSend}>
//           Send
//         </div>
//         <input type="file" name="" id="" style={{ display: "none" }} />
//       </div>
//     </div>
//   );
// };

// export default Chatbox;

// Chatbox.js
import React, { useEffect, useState, useRef } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const Chatbox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (receiveMessage !== null && chat && receiveMessage.chatId === chat._id) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    }
  }, [receiveMessage, chat]);

  useEffect(() => {
    if (!chat) return;

    const fetchUserData = async () => {
      const otherUserId = chat?.members?.find((id) => id !== currentUser);
      try {
        const response = await fetch(
          `http://localhost:4000/api/userr/${otherUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/message/${chat._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const messages = await response.json();
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchUserData();
    fetchMessages();
  }, [chat, currentUser]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const response = await fetch("http://localhost:4000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    const receiverId = chat?.members?.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-header">
            {userData && (
              <div className="cb-user-info">
                <div className="user-icon"></div>
                <div className="cb-username">
                  <span>{userData.username}</span>
                </div>
              </div>
            )}
          </div>
          <hr />
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a Chat to start Conversation...
        </span>
      )}

      {/* Chatbox messages */}
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.senderId === currentUser ? "message own" : "message"
            }
          >
            <span>{message.text}</span>
            <span>{format(message.createdAt)}</span>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      {/* chat-sender */}
      <div className="chat-sender">
        <div>+</div>
        <InputEmoji value={newMessage} onChange={handleChange} />
        <div className="send-button button" onClick={handleSend}>
          Send
        </div>
        <input type="file" name="" id="" style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Chatbox;
