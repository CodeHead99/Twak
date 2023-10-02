const express = require("express"); //web framework for Node.js

const morgan = require("morgan"); //HTTP request logger middleware fornode.js

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");
const xss = require("xss");
const cors = require("cors");
const mongosanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "DELETE", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try in one hour",
});

app.use("/tawk", limiter);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(mongosanitize());
module.exports = app;
