import amqplib from "amqplib";

(async () => {
	const queue = "analyze";
	const conn = await amqplib.connect("amqp://rabbit");
	console.log("[INFO] Connected to rabbitmq");

	const channel = await conn.createChannel();
	await channel.assertQueue(queue);

	channel.consume(queue, (msg) => {
		if (msg !== null) {
			console.log("Received:", msg.content.toString());
			channel.ack(msg);
		} else {
			console.log("Consumer cancelled by server");
		}
	});
})();
