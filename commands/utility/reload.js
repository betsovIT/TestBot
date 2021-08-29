const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	type: 'message',
	execute(message, args) {
		if (!args) return message.channel.send(`You didn't pass any commands to reload, ${message.author}!`);
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName);

		if(!command) return message.channel.send(`There is no command with name \`${commandName}\`, ${message.author}`);

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		}
		catch(error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}

		message.channel.send(`Command \`${command.name}\` was reloaded!`);
	},
};