const express = require("express");

const {login, getLogin, getFormCreateAccount, createAccount} = require("../controllers/account.controllers.js");

const accountRouter = express.Router();

accountRouter.post("/login", login);


accountRouter.post("/createAccount", createAccount);



module.exports = {
    accountRouter,
}