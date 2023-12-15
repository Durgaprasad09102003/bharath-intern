const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Registration_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection to the database successful`);
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });
