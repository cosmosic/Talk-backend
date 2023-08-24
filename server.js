const app = require("./app");

const dotenv = require("dotenv");

configDotenv.config({path: "/config.env"})


process.on("uncaughtException", (err) =>{
    console.log(err);
    process.exit(1);
});


mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedToplogy: true,

})

const DB = process.env.DBURI.replace("<password>") 

const http = require("http");

const server = http.createServer(app);

const port  = process.env.PORT || 8000;

//3000, 5000
server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", (err) =>{
    console.log(err);
    server.close(
        () =>{
            process.exit(1);
        }
    );
});