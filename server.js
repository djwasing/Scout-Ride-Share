// Dependencies
const express = require("express");
const path = require("path");

// Set up express app
const app = express();
const PORT = process.env.PORT || 9001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Security stuff
app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});