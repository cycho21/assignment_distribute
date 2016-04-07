var kafka_home = "/opt/kafka_2.11-0.9.0.1/";
require('shelljs/global');

module.exports.startTheZookeeper = function() {
        exec(kafka_home + 'bin/zookeeper-server-start.sh ' + kafka_home + 'config/zookeeper.properties',
        {async:true});
}

module.exports.startServer = function() {
	exec(kafka_home + 'bin/kafka-server-start.sh ' + kafka_home + 'config/server.properties',
	{async:true});
}

module.exports.createTopic = function(topic) {
	exec(kafka_home + 'bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 '
		+ '--partitions 1 --topic ' + topic, {async:true});
}

module.exports.listTopic = function() {
	exec(kafka_home + 'bin/kafka-topics.sh --list --zookeeper localhost:2181', {async:true});
}

module.exports.sendMessage = function(topic, message) {
	console.log("send Message...");
	exec(kafka_home + 'bin/kafka-console-producer.sh --broker-list localhost:9092 --topic ' + topic	+ ' ' + message, {async:true});
}

module.exports.readMessage = function(topic) {
	console.log("read Message...");
	exec(kafka_home + 'bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic ' +topic+' --from-beginning', {async:true});
}

