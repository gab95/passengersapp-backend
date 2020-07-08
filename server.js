const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

//routes
const authRoutes = require("./routes/auth.routes");
const passengerRoutes = require("./routes/passenger.routes");

//database config
require("./db");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRoutes);
app.use("/api/passenger", passengerRoutes);

//see the errors from validations, not all errors
app.use((error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
