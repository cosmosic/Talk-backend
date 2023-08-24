const express = require("express"); //web framework fro node js

const morgan = require("morgan"); // hhtp request logger middleware for node.js

const rateLimit = require("express-rate-limit"); // limit the operation on same ip address

const helmet = require("helmet"); //secure express app 

const mongosanitize = require("express-mongo-sanitize"); //

const bodyParser = require("body-parser"); 

const xss = require("xss");

const cors = require("cors");

const app = express();

//middleware is handler

app.use(cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json({limit: "10kb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(helmet());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}


const limiter = rateLimit({
    max: 3000,
    windowMs: 60* 60* 1000, //In an hour
    message: "Too many requests from this IP, Please try again in an hour",
})

app.use("/talk", limiter);

app.use(express.urlencoded({
    extended: true
}));

app.use(mongosanitize());

// app.use(xss());




module.exports = app;
