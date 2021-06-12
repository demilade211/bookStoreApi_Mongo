import express from "express";
import router from "./routes/index.js"

 const app = express();

 const port = process.env.PORT || 5000;

 app.use(express.json());
 app.use(express.urlencoded({extended: false}));//to handle url encoded data

app.use("/",router);

app.listen(port, () => {
    console.log(`Server connected at  http://localhost:${port}`);
});
  