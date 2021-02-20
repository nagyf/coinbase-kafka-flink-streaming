const WebSocket = require('ws');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'producer',
    brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

async function setup() {
    try {
        await producer.connect();
        const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');

        await new Promise(resolve => ws.once('open', resolve));

        const products = process.env.PRODUCTS.split(',');

        ws.send(JSON.stringify({
            "type": "subscribe",
            "product_ids": [
               ...products
            ],
            "channels": [
                "level2",
                "heartbeat",
                {
                    "name": "ticker",
                    "product_ids": [
                        ...products
                    ]
                }
            ]
        }));

        ws.on('message', async msg => {
            await producer.send({
                topic: 'coinbase',
                messages: [
                    {
                        value: msg
                    }
                ]
            });
        });

    } catch(err){
        console.error(err);
    }
}

setup();
