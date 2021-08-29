const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	LoadCommands(dicordClient, dirPath) {
		dicordClient.commands = new Discord.Collection();
		const commandFolders = fs.readdirSync(dirPath);

		for (const folder of commandFolders) {
			const commandFiles = fs.readdirSync(`${dirPath}/${folder}`).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const command = require(`../${dirPath}/${folder}/${file}`);

				dicordClient.commands.set(command.name, command);
			}
		}
	},
};