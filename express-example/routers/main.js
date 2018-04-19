module.exports = function (app, fs) {
    app.get('/', (req, res) => {
        res.render('index', {
            title: "My HOMEPAGE",
            length: 5
        });
    });

    app.get('/list', (req, res) => {
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', (err, data) => {
            console.log(data);
            res.end(data);
        })
    });

    app.get('/getUser/:username', (req, res) => {
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', (err, data) => {
            const users = JSON.parse(data);
            res.json(users[req.params.username]);
        })
    });

    app.post('/addUser/:username', (req, res) => {
        let result = {};
        let username = req.params.username;

        //Check req validity
        if (!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        //Load data & check duplication
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', (err, data) => {
            const users = JSON.parse(data);
            if (users[username]) {
                //duplication found
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            // Add to data
            users[username] = req.body;
            fs.writeFile(__dirname + "/../data/" + "user.json",
                         JSON.stringify(users, null, '\t'), "utf8", (err, data) => {
                result = {"success": 1};
                res.json(result);
            })
        })
    })
    app.post('/addUser/:username', (req, res) => {
        let result = {};
        let username = req.params.username;

        //Check req validity
        if (!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        //Load data & check duplication
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', (err, data) => {
            const users = JSON.parse(data);
            if (users[username]) {
                //duplication found
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            // Add to data
            users[username] = req.body;
            fs.writeFile(__dirname + "/../data/" + "user.json",
                         JSON.stringify(users, null, '\t'), "utf8", (err, data) => {
                result = {"success": 1};
                res.json(result);
            })
        })
    })

    app.put('/updateUser/:username', (req, res) => {
        let result = {};
        let username = req.params.username;

        //Check req validity
        if (!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        //Load data
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', (err, data) => {
            const users = JSON.parse(data);
            if (!users[username]) {
                //can not found
                result["success"] = 0;
                result["error"] = "not found user";
                res.json(result);
                return;
            }

            // Add to data
            users[username] = req.body;
            fs.writeFile(__dirname + "/../data/" + "user.json",
                         JSON.stringify(users, null, '\t'), "utf8", (err, data) => {
                result = {"success": 1};
                res.json(result);
            })
        })
    })

    app.delete('/deleteUser/:username', (req, res) => {
        let result = {};
        let username = req.params.username;

        //Load data
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', (err, data) => {
            const users = JSON.parse(data);
            if (!users[username]) {
                //can not found
                result["success"] = 0;
                result["error"] = "not found user";
                res.json(result);
                return;
            }

            // delete data
            delete users[username];
            fs.writeFile(__dirname + "/../data/" + "user.json",
                         JSON.stringify(users, null, '\t'), "utf8", (err, data) => {
                result = {"success": 1};
                res.json(result);
                return;
            })
        })
    })
}