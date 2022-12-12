var amqp = require('amqplib/callback_api');
var queue = 'hello';

exports.connectQueue = async(req) => {   
  let msg = JSON.stringify(req.body);
  let connection = await amqp.connect('amqp://user:user@localhost');
  console.log("conn:",connection);
  let channel = await connection.createChannel();
  channel.assertQueue(queue, {
    durable: false
  });
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log(" [x] Sent %s", msg);

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(queue, function(result_msg) {
  console.log(" [x] Received %s", result_msg.content);
  let bring_obj_back = JSON.parse(String.fromCharCode.apply(String, result_msg.content));
  console.log("bring_obj_back:",bring_obj_back);
  }, {
    noAck: true
  });

  /*setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 1000);*/
}