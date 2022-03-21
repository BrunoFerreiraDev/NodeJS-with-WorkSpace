
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routers/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express(); // On this, i instantianting the express

app.use(morgan("dev")); // The morgan is a middleware to execute in each method or function and print the information os the requisitions
app.use(helmet()); // Helmet is a lib to add headers of security in your application
app.use(express.json()); // This line is very important for your applicatio understand the body's content, 'cause express.json() convert the content for JavaScripty
app.use(cors()); // On this line we heve the cors, the is a lib to control acesses of the strange domains of your application
app.use("/api", router); // On this is declared the routers accessible in application

app.get("/", (request, response) => {
  response.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server Running PORT: ${PORT}`);
});
