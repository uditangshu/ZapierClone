import {Kafka} from "kafkajs";

const TOPIC_NAME = 'zap-events';


const kafka = new Kafka({
    clientId: 'worker',
    brokers: ['localhost:9092']
})
async function main()
{
    const consumer = kafka.consumer({groupId:"main-worker"})
    await consumer.connect()

    await consumer.subscribe({topic:TOPIC_NAME})
    await consumer.run({
        eachMessage: async ({topic,partition ,message})=>{
            console.log(
                {
                    topic: topic,
                    partition: partition,
                    offset: message.offset,
                    value: message.value?.toString()
                }
            )
            await new Promise(r=>setTimeout(r,3000));

            await consumer.commitOffsets([
                {
                    topic: TOPIC_NAME,
                    partition: partition,
                    offset: (parseInt(message.offset)+1).toString()
                }]
            )
        }
    })
}

main()
