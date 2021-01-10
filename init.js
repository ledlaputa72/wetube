import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening); //해당 포트로 서버가 작동