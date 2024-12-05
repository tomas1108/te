import io from "socket.io-client"; // Add this
let socket;

// const connectSocket = (user_id) => {
//   socket = io("localhost:3001", {
//     query: `user_id=${user_id}`,
//   });
// } 
const connectSocket = (user_id) => {
  socket = io("https://be-kagd.onrender.com/", {
    query: `user_id=${user_id}`,
  });
} 



export {socket, connectSocket};
