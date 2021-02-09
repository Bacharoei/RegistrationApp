const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");


const fs = require('fs');


let userFile = require('./usersData.json') || [];


function saveHistory(userFile) {
    fs.writeFileSync(__dirname + '/usersData.json', JSON.stringify(userFile));

}

// @route    Post api/users
// @desc     Register User Route
// @access   Public
router.post("/",
    //form validation
    [
        check("userName", "userName is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("age", "Please include a valid age").not().isEmpty(),

    ],
    async (req, res) => {
        //validation the errors
        const errors = validationResult(req);
        //check if there're errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await userFile.find(item => item.email === req.body.email);

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: `User with Email: ${req.body.email} already exists` }] })
            }

            userFile.push({
                id: new Date().getTime().toString(),
                ...req.body,
            });
            res.send(req.body);
            saveHistory(userFile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");

        }
    }
)

// @route    Post api/auth
// @desc     Authenticate User & get token
// @access   Public
router.post(
    "/auth",
    // form validation
    [
        check("email", "Please include a valid email").isEmail(),
        check("userName", "userName is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await userFile.find(item => item.email === req.body.email);
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Ivalid Credentials" }] });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @route    GET api/auth
// @desc     Get User Route
// @access   Public
router.get("/auth", auth, async (req, res) => {
    try {
        let user = await userFile.find(item => item.email === req.body.email);
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.get("/", (req, res) => {
    res.send(userFile)
})

module.exports = router;
