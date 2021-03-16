module.exports = {
	name: 'avatar',
	description: 'Returns the avatar of a specified user.',
	cooldown: 10,
	execute(message) {
		if (!message.mentions.users.size) {
			message.channel.send({
				files: [{
					attachment: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
					name: 'file.jpg',
				}],
			});
		}
		else {
			const avatars = [];
			message.mentions.users.map(user => {
				avatars.push({
					attachment: `${user.displayAvatarURL({ format: 'png', dynamic: true })}`,
					name: 'file.jpg',
				});
			});

			avatars.forEach(avatar => {
				message.channel.send({
					files:[{
						attachment: avatar.attachment,
						name: 'file.jpg',
					}],
				});
			});
		}
	},
};