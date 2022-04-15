const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoURI } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/api/user");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB database connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
