module.exports = {
	name: 'avatar',
	description: 'Returns the avatar of a specified user.',
	type: 'message',
	cooldown: 10,
	args: true,
	async execute(message, args) {
		let guildMember = await message.guild.members.fetch({ query: args[0], limit: 1 });
		guildMember = guildMember.array()[0];
		const user = await message.client.users.fetch(guildMember.id);

		if(guildMember) {
			message.channel.send({
				files: [{
					attachment: `${user.displayAvatarURL({ format: 'png', dynamic: true })}`,
					name: 'file.jpg',
				}],
			});
		}
	},
};