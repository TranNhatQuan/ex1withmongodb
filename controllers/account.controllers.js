
const user = require("../db/models/user");
const account = require("../db/models/account");
var db = require('../db/database');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");






const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkAccount = await account.findOne({
            username: username
        })
        if (checkAccount) {
            const isAuth = bcrypt.compareSync(password, checkAccount.password);

            if (isAuth) {
                // let customer

                // customer = await User.findOne({
                //     where: {
                //         idAccount: account.idAccount,
                //         isActive: 1,
                //     },
                // });
                // if (!customer) {
                //     req.flash('error', 'Sai tên tài khoản hoặc mật khẩu');
                //     return res.redirect('/account/login');
                // }



                const token = jwt.sign({ idAccount: account.idAccount }, "hehehe", {
                    expiresIn: 30 * 60 * 60 * 60,
                });
                req.session.token = token;
                res.status(200).json({
                    status: true,
                    isSuccess: false,
                    msg: 'Đăng nhập thành công!',
                });

            } else {
                res.status(500).json({
                    status: true,
                    isSuccess: false,
                    msg: 'Sai tên tài khoản hoăc mật khẩu!',
                });
            }
        }
        else {
            res.status(500).json({
                status: true,
                isSuccess: false,
                msg: 'Sai tên tài khoản hoăc mật khẩu!',
            });
        }
        //console.log(account)

    } catch (error) {
        res.status(500).json({
            status: true,
            isSuccess: false,
            msg: 'Có lỗi xảy ra!',
        });
    }

};


const logout = async (req, res, next) => {
    delete req.session.token;

    return res.redirect('/account/login'); // Chuyển hướng về trang đăng nhập
};


const createAccount = async (req, res) => {
    try {
        const { username, password, name, gender, age, email, phone } = req.body;
        const checkAccount = await account.findOne({
            username: username
        })
        if (!checkAccount) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const t = await db.startSession()
            try {
                t.startTransaction()
                console.log(t)
                let newAccount = await account.create([{
                    username: username,
                    password: hashPassword,
                }], { t, new: true });
                let newUser = await user.create([{
                    name,
                    gender,
                    age,
                    email,
                    phone,
                    account: newAccount._id,
                    startDate: new Date(),
                }], { t, new: true });
                await t.commitTransaction()
                await t.endSession()
                res.status(200).json({
                    status: true,
                    isSuccess: false,
                    username,
                    password
                });

            } catch (error) {
                console.log(t)
                await t.abortTransaction()
                await t.endSession()
                console.log(t)
                res.status(500).json({
                    error,
                    msg: "Có lỗi xảy ra!"
                });
            }
        }
        else {
            res.status(500).json({
                status: true,
                isSuccess: false,
                msg: "Trùng username!"
            });
        }
        //console.log(account)

    } catch (error) {
        req.flash('error', 'Có lỗi xảy ra');
        res.status(500).json({
            status: true,
            isSuccess: false,
            msg: "Lỗi unknown!"
        });
    }

};





module.exports = {
    // getDetailTaiKhoan,
    login, createAccount
};