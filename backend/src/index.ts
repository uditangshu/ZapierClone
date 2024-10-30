import express from "express"
const app = express();
const port = 3000;
import {userRouter} from "./router/user"
import { zapRouter } from "./router/zap";
import cors from "cors"


app.use(express.json())
app.use(cors())


app.use("/api/v1/user",userRouter)
app.use("/api/v1/zap",zapRouter)
app.listen(port,()=>{
    console.log(`listening on ${port}`)
})