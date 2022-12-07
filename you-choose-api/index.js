const express = require("express");
const mysql = require("mysql");
const config = require("./config.json");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var cn = mysql.createConnection(config);
cn.connect();

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/api/test", (req, res) => {
    cn.connect();

    var q = "SELECT * FROM User";
    cn.query(q, function (err, result, fields) {
        res.json(result);
    });
    cn.end();
});

app.post("/api/login", (req, res) => {
    var username = req.body.username;
    var userexists = false;

    var q = "SELECT count(*) as userexists FROM User where username = ?";
    cn.query(q, [username], function (err, result, fields) {
        userexists = result[0].userexists > 0 ? true : false;
        console.log("login: " + userexists + ", user: " + username);
        res.json({ success: userexists });
    });
});

app.post("/api/create-account", (req, res) => {
    var username = req.body.username;

    var q = "INSERT INTO User VALUES (?)";
    cn.query(q, [username], function (err, result, fields) {
        if (err) res.json({ success: false });
        else res.json({ success: true });
        console.log("create-account: " + username);
    });
});

app.post("/api/lists", (req, res) => {
    var username = req.body.username;

    var q = "SELECT * FROM List WHERE username = ? ORDER BY l_name";
    cn.query(q, [username], function (err, result, fields) {
        res.json(result);
        console.log("lists owned by: " + username);
    });
});

app.post("/api/choices", (req, res) => {
    var list_id = req.body.list_id;

    var q =
        "SELECT * FROM Choice WHERE list_id = ? AND c_name <> '' ORDER BY c_name";
    cn.query(q, [list_id], function (err, result, fields) {
        res.json(result);
        console.log("Choices for list: " + list_id);
    });
});

app.post("/api/add-list", (req, res) => {
    var username = req.body.username;
    var listname = req.body.listname;
    var listexists = false;

    var q1 =
        "SELECT count(*) as num_lists FROM List WHERE username = ? AND l_name = ?";
    cn.query(q1, [username, listname], function (err, result, fields) {
        listexists = result[0].num_lists > 0 ? true : false;
        if (listexists) {
            res.json({ success: false, list_id: 0 });
            console.log("Add list fail");
        } else {
            var q2 =
                "INSERT INTO List (username, l_name, public) VALUES (?, ?, 0)";
            cn.query(q2, [username, listname], function (err, result, fields) {
                res.json({
                    success: true,
                    list_id: result.insertId,
                });
                var list_id = result.insertId;
                console.log("New list: " + list_id);
            });
        }
    });
});

app.post("/api/save-choices", (req, res) => {
    var list_id = req.body.list_id;
    var choices = req.body.choices;

    console.log("List saved: " + list_id);
    choices.forEach((item) => {
        console.log(item);
    });

    var q = "DELETE FROM Choice WHERE list_id = ?";
    cn.query(q, [list_id], function (err, result, fields) {
        addChoices(list_id, choices);
        res.json({ success: true });
    });
});

function addChoices(list_id, choices) {
    var q = "INSERT INTO Choice (list_id, c_name) VALUES (?, ?)";
    choices.forEach((item) => {
        cn.query(q, [list_id, item], function (err, result, fields) {});
    });
}

app.post("/api/delete-list", (req, res) => {
    var list_id = parseInt(req.body.list_id);
    console.log("Delete list: " + list_id);
    var q = "DELETE FROM List WHERE list_id = ?";
    cn.query(q, [list_id], function (err, result, fields) {
        if (err) console.log(err);
        res.json({success:true});
        // var q1 = "DELETE FROM List WHERE list_id = ?";
        // cn.query(q1, [list_id], function (err, result, fields) {
        //     res.json({success:true});
        //     if (err) console.log(err);
        // });
    });
});

app.listen(PORT, function () {
    console.log(`Listening on Port ${PORT}`);
});

//cn.end();
