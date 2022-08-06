module.exports = {
	name: 'avatar',
	cooldown: 10,
	async execute(interaction) {
		await interaction.reply('Loading...');
		try {
			const guildMemberId = interaction.options.data[0].value;
			const user = await interaction.client.users.fetch(guildMemberId);

			if(user) {
				await interaction.editReply({ content:"https://cdn.discordapp.com/avatars/"+guildMemberId+"/"+user.avatar+".jpeg"});
			} else {
				await interaction.editReply('No such member found.');
			}
		} catch (error) {
			console.log(error.message || 'Error');
			await interaction.editReply(error.message || "Error...")
		}
		
	},
};