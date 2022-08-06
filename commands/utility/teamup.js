const { Collection } = require('discord.js')

module.exports = {
    name: "teamup",
    cooldown: 10,
    async execute(interaction){
        interaction.reply({content: 'Calculating...'})
        const playerCount = interaction.options.data.length;
        let numbers = [];
        for (let i = 0; i < playerCount; i++) {
            numbers.push( (Math.random() * (100 - 0) + 0));
        }

        let teams = new Collection();


        if (playerCount <= 4) {
            
        } else {

        }
    } 
}