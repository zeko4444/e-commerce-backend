const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const database = require("./config/database");
const mountRoutes = require("./routs");
//connect with db
database();

// express app
const app = express();

//Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//mount routes
mountRoutes(app);

app.all("*", (req, res, next) => {
  //create error and send it to error handling middleware
  //const err = new Error(`can’t find this route ${req.originalUrl}`);
  //next(err);
  next(new ApiError(`can’t find this route ${req.originalUrl}`, 400));
});

//Global error handling middleware for express
app.use(globalError);

const { port } = process.env;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`shut down ....`);
    process.exit(1);
  });
});
