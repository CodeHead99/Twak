const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const { Server } = require("socket.io");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const http = require("http");
const User = require("./models/user");
const FriendRequest = require("./models/friendRequest");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD);

mongoose
  .connect(DB, {
    // useNewUrlParser: true, // The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
    // useCreateIndex: true, // Again previously MongoDB used an ensureIndex function call to ensure that Indexes exist and, if they didn't, to create one. This too was deprecated in favour of createIndex . the useCreateIndex option ensures that you are using the new function calls.
    // useFindAndModify: false, // findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    // useUnifiedTopology: true, // Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true , except for the unlikely case that it prevents you from maintaining a stable connection.
  })
  .then((con) => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000; // 3000, 5000

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

io.on("connection", async (socket) => {
  const user_id = socket.handshake.query["user_id"];
  const socket_id = socket.id;
  console.log(`Connecting to ${socket_id}`);
  if (Boolean(user_id)) {
    await User.findByIdAndUpdate(user_id, { socket_id });
  }
  socket.on("friend_request", async (data) => {
    const to_user = await User.findById(data.to).select("socket_id");
    const from_user = await User.findById(data.from).select("socket_id");
    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });
    io.to(to_user.socket_id).emit("new_friend_request", {
      message: "New friend request received",
    });
    io.to(from_user.socket_id).emit("request_sent", {
      message: "Request Sent Successfully",
    });
  });

  socket.on("accept_request", async (data) => {
    const request_doc = await FriendRequest.firndById(data.request_id);
    const sender = await User.findById(request_doc.sender);
    const receiver = await User.findById(request_doc.recipient);
    sender.friends.push(request_doc.recipient);
    receiver.friends.push(request_doc.sender);
    await receiver.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    await FriendRequest.findByIdAndDelete(data.request_id);

    io.to(sender.socket_id).emit("request_accepted", {
      message: "Request Accepted Successfully",
    });
    io.to(receiver.socket_id).emit("request_accepted", {
      message: "Request Accepted Successfully",
    });
  });

  socket.on("end", function (params) {
    console.log("Closing connection");
    socket.disconnect(0);
  });
});
process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
