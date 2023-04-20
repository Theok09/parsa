const { Client, Intents, MessageEmbed, Permissions } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const Gamedig = require('gamedig');
const statuses = ['online', 'idle', 'dnd'];

const config = require('./config.json')
client.on("ready", () => {
    console.info(`${client.user.username}`);
  setInterval(() => {
 const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setStatus(status);
  }, 1300);
    function botstatus() {
        Gamedig.query({
            type: 'mtasa',
            host: '45.81.16.67',
            port: '22003'
        }).then((state) => {
            client.user.setActivity(`Players: ${state.players.length} / ${state.maxplayers} 🎮`, { type: "WATCHING" });
            setTimeout(function () {
                botstatus();
            },3000)
            
        }).catch((error) => {
            client.user.setActivity(`Server Offline`, { type: "WATCHING" });
            botstatus();
        })
    }
    botstatus();
    
    
})
client.on("message", message => {

    
    if (message.content.startsWith(`!player`)) {
        message.delete()
        let embd = new MessageEmbed()
                .setTitle(`Lotfan Sabr Konid...`)
                .setColor("RANDOM");
        message.channel.send({embeds: [embd]})
        Gamedig.query({
            type: 'mtasa',
            host: '45.81.16.67',
            port: '22003'
        }).then((state) => {
            let liste = '';
            let i = 0;
            while (i < state.players.length) {
            liste = `${liste}` + `${state.players[i].name}` + `\n`
            i++;
            }
            if(!state.password) {
                var password_status = "Server Password = ❌";
            }else{
                var password_status = "Server Password = ✅"
            }
            let emb = new MessageEmbed()
                .setAuthor(`VenusRP` , "https://images-ext-2.discordapp.net/external/JeoSCO2kubd1HtosXX5Q8aXFr8WiHanPuMqK0dW4ccA/%3Fsize%3D1024/https/cdn.discordapp.com/icons/899155793537028167/a_83a0399fb51312e5e914fcf574323d66.gif?width=324&height=324")
                .addField("\n❯ Server Name",`» \`${state.name}\``,true)
                .addField("\n❯ Players",`» \`${state.players.length}\` \ / \`${state.maxplayers}\``,true)
                .addField("\n❯ Ping",`» \`${state.ping}\``,true)
                .addField("\n❯ Server Password",`» \`${password_status}\``,true)
                .addField("\n❯ Player List",` \`${liste}\``,true)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(`VenusRP` , "https://images-ext-2.discordapp.net/external/JeoSCO2kubd1HtosXX5Q8aXFr8WiHanPuMqK0dW4ccA/%3Fsize%3D1024/https/cdn.discordapp.com/icons/899155793537028167/a_83a0399fb51312e5e914fcf574323d66.gif?width=324&height=324")
            message.channel.bulkDelete(1,true)
            message.channel.send({embeds: [emb]})
        }).catch((error) => {
            let emb = new MessageEmbed()
                .setAuthor(`❯ Server Is Offline` , "https://images-ext-2.discordapp.net/external/JeoSCO2kubd1HtosXX5Q8aXFr8WiHanPuMqK0dW4ccA/%3Fsize%3D1024/https/cdn.discordapp.com/icons/899155793537028167/a_83a0399fb51312e5e914fcf574323d66.gif?width=324&height=324")
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(`VenusRP` , "https://images-ext-2.discordapp.net/external/JeoSCO2kubd1HtosXX5Q8aXFr8WiHanPuMqK0dW4ccA/%3Fsize%3D1024/https/cdn.discordapp.com/icons/899155793537028167/a_83a0399fb51312e5e914fcf574323d66.gif?width=324&height=324")
            message.channel.bulkDelete(1,true)
            message.channel.send({embeds: [emb]})
        })
        
    }
})


client.login(config.token)