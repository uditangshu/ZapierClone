import express from "express"

import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

const PORT = 3000;
const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId",async (req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const data = req.body;

    await client.$transaction( async tx => {
        const run = await client.zapExecs.create(
            {
                data:{
                    zapId: zapId,
                    metadata: data
                }
            }
        )
        await client.zapRunOutBox.create({
            data:{
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "webhook recieved"
    })
   
})


app.listen(PORT)

