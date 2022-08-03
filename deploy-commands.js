const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');
dotenv.config();

const commands = [
	new SlashCommandBuilder()
        .setName('apex-stats')
        .setDescription('Gets the ranked stats for a player.')
        .addStringOption(option => 
            option.setName('player')
                .setDescription("The player whose stats you want to check.")
                .setRequired(true)
                )
    ]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);