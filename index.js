const express = require("express");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/data", (req, res) => {
    let countryCode = req.query.code ? req.query.code : "NG";
    const url = `http://api.worldbank.org/countries/${countryCode}/indicators/SP.POP.TOTL?per_page=5000&format=json`;
    request({ url }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            return res.status(500).json({ err });
        }
        res.json(JSON.parse(body));
    });
});

app.listen("3000", () => console.log("Listening on 3000"));