// import React, { useState, useEffect, useRef } from "react";
// import "./Chat.css";
// import Conversation from "./Conversation";
// import Chatbox from "./Chatbox";
// import { io } from "socket.io-client";

// import { useAuthContext } from "../../hooks/useAuthContext";

// const Chat = () => {
//   const { user } = useAuthContext();
//   const [chats, setChats] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receiveMessage, setReceiveMessage] = useState(null);
//   const socket = useRef();

//   // Send message to socket server
//   useEffect(() => {
//     if (sendMessage !== null) {
//       socket.current.emit("send-message", sendMessage);
//     }
//   }, [sendMessage]);

//   // Connect to Socket.io
//   useEffect(() => {
//     socket.current = io("ws://localhost:8800");
//     socket.current.emit("new-user-add", user?.userId);
//     socket.current.on("get-users", (users) => {
//       setOnlineUsers(users);
//     });
//   }, []);

//   // Receive message from socket server
//   useEffect(() => {
//     socket.current.on("receive-message", (data) => {
//       setReceiveMessage(data);
//     });
//   }, []);

//   // Fetch user chats
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/chat/${user.userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch chats");
//         }
//         const data = await response.json();
//         setChats(data);
//       } catch (error) {
//         console.error("Error fetching chats:", error);
//       }
//     };

//     fetchChats();
//   }, [user]);

//   return (
//     <div className="Chat">
//       {/* Left Side */}
//       <div className="Left-side-chat">
//         <h1 className="c-h1">Search Box</h1>
//         <div className="Chat-container">
//           <h2 className="c-h2">Chats</h2>
//           <div className="Chat-list">
//             {chats.map((chat) => (
//               <div key={chat._id} onClick={() => setCurrentChat(chat)}>
//                 <Conversation data={chat} currentUserId={user.userId} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="Right-side-chat">
//         {/* chat body */}
//         <Chatbox
//           chat={currentChat}
//           currentUser={user?.userId}
//           setSendMessage={setSendMessage}
//           receiveMessage={receiveMessage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Chat;

// Chat.js
import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import Conversation from "./Conversation";
import Chatbox from "./Chatbox";
import { io } from "socket.io-client";

import { useAuthContext } from "../../hooks/useAuthContext";

const Chat = () => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  // Send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user?.userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, [user]);

  // Fetch user chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/chat/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [user]);

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <h1 className="c-h1">Search Box</h1>
        <div className="Chat-container">
          <h2 className="c-h2">Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user.userId} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        {/* chat body */}
        <Chatbox
          chat={currentChat}
          currentUser={user?.userId}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
