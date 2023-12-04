const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const mongo_host = "mongodb://localhost:27017/redux-projects";
const AppRouter = require("./router");
const cors = require("cors");
const bodyParser = require("body-parser");

// var whitelist = ["http://localhost:8080/api"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(mongo_host)
  .then(() => {
    console.log(`connected db`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", AppRouter);

const imagePath = "./uploads";
app.use("/files", express.static(imagePath));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
