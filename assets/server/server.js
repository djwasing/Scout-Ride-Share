const express = require("express");
const fs = require("fs");
const path = require("path");
const appRouter = require("../app");

const app = express();
const PORT = 9001;

app.disable('x-powered-by');

app.use("/", appRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index./html"));
});


app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});