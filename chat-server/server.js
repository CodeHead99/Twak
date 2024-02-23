const app = require("./app");

const http = require("http");

const server = http.createServer(app);

// 3000, 5000

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
