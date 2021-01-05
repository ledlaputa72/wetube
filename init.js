import app from "./app";

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening); //해당 포트로 서버가 작동