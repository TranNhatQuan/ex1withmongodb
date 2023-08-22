const mongoose = require('mongoose');

const mongodb_url = 'mongodb://127.0.0.1:27017/facebook';

class Database {
    constructor() {
        this.isConnected = false;
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(mongodb_url, { useNewUrlParser: true });
            this.isConnected = true;
            console.log("Database connection successfully!");
        } catch (err) {
            console.error("Database connection error:", err);
        }
    }

    async startSession() {
        if (!this.isConnected) {
            console.log("Chưa kết nối cơ sở dữ liệu.");
            return;
        }
        const session = await mongoose.startSession();
        console.log("Bắt đầu session!");
        return session;
    }

    async endSession(session) {

        session.endSession();
        console.log("Kết thúc session!");
    }


}

module.exports = new Database();
