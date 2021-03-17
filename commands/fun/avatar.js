module.exports = {
	name: 'avatar',
	description: 'Returns the avatar of a specified user.',
	cooldown: 10,
	args: true,
	execute(message, args) {
		const guildMember = message.guild.members.fetch({ query: args[0], limit: 1 });

		if(guildMember) {
			message.channel.send({
				files: [{
					attachment: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
					name: 'file.jpg',
				}],
			});
		}
	},
};