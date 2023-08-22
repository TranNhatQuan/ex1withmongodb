const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');
var Database = require('./db/database');
const { rootRouter } = require("./routers")
const cookieParser = require("cookie-parser");
const port = 3007;
const app = express();
const cors = require("cors");
const ejsMate = require('ejs-mate');
app.use(flash());
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Cấu hình flash message

// Định dạng tệp view EJS sẽ được lưu trữ trong thư mục "views"
app.set('views', './public/views');
app.use(cookieParser());
app.use(cors());
//cài ứng dụng sử dụng json
app.use(express.json());
//cài static file
// Trong index.js
app.use(express.static('public'));
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

//dùng router
app.use(rootRouter);
const cron = require('cron');


//lắng nghe sự kiện kết nối
app.listen(port, async () => {
  console.log(`App listening on http://localhost:${port}`);

})