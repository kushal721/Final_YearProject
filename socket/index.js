// const io = require("socket.io")(8800, {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   });

// //we write on when we have to take something from other side
// //we write emit when we have to send something to other side

// let activeUsers = [];

// io.on("connection", (socket) => {
//     // add new User
//     socket.on("new-user-add", (newUserId) => {
//       // if user is not added previously
//       if (!activeUsers.some((user) => user.userId === newUserId)) {
//         activeUsers.push({ userId: newUserId, socketId: socket.id });
//         console.log("New User Connected", activeUsers);
//       }
//       // send all active users to new user
//       io.emit("get-users", activeUsers);
//     });

//   socket.on("disconnect", () => {
//     // remove user from active users
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//     console.log("User Disconnected", activeUsers);
//     // send all active users to all users
//     io.emit("get-users", activeUsers);
//   });

const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // Add new user
  socket.on("new-user-add", (newUserId) => {
    // Check if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // Send all active users to new user
    console.log("connected users", activeUsers);
    io.emit("get-users", activeUsers);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // Remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // Send updated active users list to all users
    io.emit("get-users", activeUsers);
  });

  // Send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending message from socket to :", receiverId);
    console.log("Message data: ", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    } else {
      console.log("Receiver not found:", receiverId);
    }
  });
});
