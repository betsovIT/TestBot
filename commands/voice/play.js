module.exports = {
	name: 'play',
	description: 'Play a meme sound.',
	isVoice: true,
	cooldown: 20,
	async execute(message, args) {
		if (message.member.voice.channel) {
			const isInRole = message.member.roles.cache.some(role => role.name == 'Memer');

			if (isInRole) {
				const connection = await message.member.voice.channel.join();
				const trackExp = RegExp(/[A-Za-z0-9]+/g);
				const dispatcher = connection.play(`./assets/sounds/${args[0].match(trackExp)[0]}.mp3`, { volume: 0.4 });
				dispatcher.on('finish', () => {
					connection.disconnect();
				});
			}
			else {
				message.reply('You don\'t have sufficent priviliges');
			}
		}
		else {
			message.reply('You need to join a voice channe;');
		}
	},
};