module.exports = {
	name: 'ping',
	description: 'Ping!',
	type: 'message',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong.');
	},
};