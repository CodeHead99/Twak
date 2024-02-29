const express = require("express"); //web framework for node.js

const rountes = require("./routes/index");

const morgan = require("morgan"); // http request logger middleware for node.js

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const mongosanitize = require("express-mongo-sanitize");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mongosanitize());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

if (process.env.NODE_ENV !== "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, //in one hour
  message: "Too many requests, please try again later",
});

app.use("/twak", limiter);

//

app.use(routes);

module.exports = app;

//
