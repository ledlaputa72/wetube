import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,         
        useUnifiedTopology: true, //새버전으로 추가해야 하는 코드 
        useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ connection to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection: ${error}`);

db.once("open", handleOpen );
db.on("error", handleError);