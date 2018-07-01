const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const config = require("./config/keys");
const items = require("./routes/api/items");


const app = express();

const PORT = process.env.PORT || 4000;

// body-parser Middleware
app.use(bodyParser.json())

// connect to mongodb
mongoose.connect(config.mongoURI).then(() => console.log("MongoDB connected")).catch(err => console.log(err));

// Use Routes
app.use("/api/items", items);

// Serve static asset if in prod
if(process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));
