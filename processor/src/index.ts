import { PrismaClient } from "@prisma/client";
import {Kafka} from "kafkajs"
const client = new PrismaClient();


const kafka = new Kafka({
    clientId: 'processor',
    brokers: ['localhost:9092']
})

async function main ()
{
    const producer = kafka.producer();

    
    while(1)
        {
            const pendingRows = await client.zapRunOutBox.findMany({
                where:{},
                take: 10
            })

           producer.send({
                topic: "zap_run",
                messages: pendingRows.map(row=>{
                    return {
                        value: row.zapRunId
                    }
                })
           })
           console.log("kafka queue done ")

           await client.zapRunOutBox.deleteMany({
                where:{
                    id:{
                        in: pendingRows.map(row=>row.id)
                }}
           })


        }
}