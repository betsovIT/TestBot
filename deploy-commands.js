const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

let commands = [
	new SlashCommandBuilder()
        .setName('apex-stats')
        .setDescription('Gets the ranked stats for a player.')
        .addStringOption(option => 
            option.setName('player')
                .setDescription("The player whose stats you want to check.")
                .setRequired(true)
                ),
    new SlashCommandBuilder()
        .setName('apex-map')
        .setDescription('Gets the current and next map in rotation.'),
    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play one of several predefined meme sounds.'),
    new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Show a server member`s avatar.")
        .addIntegerOption(option =>
            option.setName('memberID')
            .setDescription("Copy member ID from the guild.")
            .setRequired(true)
            )
    ];

//Add options to play command
let soundFiles = fs.readdirSync('assets/sounds')
                    .filter(f => f.endsWith('.mp3'))
                    .map(f => f.slice(0, f.length-4));

soundFiles = soundFiles.map(f =>({name:f, value:f}));
commands.find(c => c.name == 'play')
    .addStringOption(o => 
        o.setName('sound')
        .setDescription('Select the sound you want to play')
        .setRequired(true)
);

soundFiles.forEach(sf => 
    commands.find(c => c.name == 'play')
    .options.find(o => o.name == 'sound')
    .addChoices(sf));

commands = commands.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.TESTGUILDID), { body: commands })
.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);