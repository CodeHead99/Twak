const app = require("./app");
const http = require("http");

const server = http.createServer(app);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
