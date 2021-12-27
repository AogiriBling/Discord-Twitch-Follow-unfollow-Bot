const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('by Bling#1337'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
); 




const { SSL_OP_EPHEMERAL_RSA } = require('constants');

const cooldown = new Set();


const mySecret = process.env['TOKEN']


const fetch = require('node-fetch'),
  fs = require('fs'),
  Discord = require('discord.js'),
  request = require('request'),
  client = new Discord.Client(),
  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
  admins = ["686162883541073930", "906594353584152576", "888905886121230337", "827264703075713044", "895438491704516649","535169012901085194"],
  nocooldown = ["248103035555807233","888905886121230337", "906594353584152576", "895438491704516649", "827264703075713044","535169012901085194"],
  config = {
    "906379585975910440": 20000,
    "910339665553416212": 2500,
    "905967712071733269": 2000,
    "905967662235000892": 1000,
    "905967597433012335": 300,
    "906396369005187072": 200,
    "908887172487209030": 50,
    "906670412556034048": 5,
  }

var tokens = fs.readFileSync('./tokens.txt', 'utf-8');
var bodydata = "";
tokens = tokens.split("\n").filter(t => !t.startsWith("#"))

client.on('ready', async () => {
  console.log(`${client.user.tag} is ready !`)
  console.log(`Loaded ${tokens.length} tokens !`)
})

client.on('message', async (message) => {
  const prefix = ".";

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if (command === "tokens") {

    message.channel.send(new Discord.MessageEmbed()
      .addFields({
        name: `We Currently have ${tokens.length} tokens loaded`,
        value: "Ready to use in <#906898282922512454>",
        inline: true
      })
      .setColor("PURPLE")
      .setFooter(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
    )
  }

  if (command === "tspam") {

    message.channel.send(new Discord.MessageEmbed()
      .addFields({
        name: `tspam is for premium role only and it is not working rn`,
        value: "cheak <#906898282922512454>",
        inline: true
      })
      .setColor("PURPLE")
      .setFooter(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
    )
  }
  if (command === "ttroll") {

    message.channel.send(new Discord.MessageEmbed()
      .addFields({
        name: `ttroll is for premium role only and it is not working rn`,
        value: "cheak <#906898282922512454>",
        inline: true
      })
      .setColor("PURPLE")
      .setFooter(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
    )
  }































  if (command === "thelp") {
    message.channel.send(new Discord.MessageEmbed()
      .addFields({
        name: "Help",
        value: `\`${prefix}help>\``,
        inline: false
      }, {
          name: "Twitch followers",
          value: `\`${prefix}tinfo (channel)\``,
          inline: false
        }, {
          name: "Twitch follow",
          value: `\`${prefix}tfollow \``,
          inline: false
        }, {
          name: "Twitch unfollow premium only",
          value: `\`${prefix}tunfollow \``,
          inline: false
        }, {
          name: "Twitch spam premium only coming soon",
          value: `\`${prefix}tspam \``,
          inline: false
        })
      .setColor("PURPLE")
      .setFooter(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
    )
  }
  if (command === "tping") {
    message.channel.send(new Discord.MessageEmbed()
      .setDescription(`My ping is **${client.ws.ping}ms** !`)
      .setColor("")
      .setFooter(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
    )
  }
  if (command === "King" && admins.includes(message.author.id)) {

    message.channel.send(new Discord.MessageEmbed()
      .addFields({
        name: "King",
        value: 'Bling',
        inline: true
      })
      .setColor("GREEN")
      .setFooter(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
    )
  }




  if (command === "tfollow") {
    if (message.channel.id != "906898282922512454") { return; }

    if (cooldown.has(message.author.id)) {
      message.reply("you are on a cooldown");
      console.log("user are on a cooldown");
    }
    else {
      if (!admins.includes(message.author.id)) {


        if (!nocooldown.includes(message.author.id)) {

          cooldown.add(message.author.id);
          setTimeout(() => {
            console.log("Cooldown added");
            cooldown.delete(message.author.id)
          }, 180000)

        } else {
          cooldown.add(message.author.id);
          setTimeout(() => {
            console.log("Cooldown added");
            cooldown.delete(message.author.id)
          }, 30000)
        }
      }


      let twitchID = "";

      if (admins.includes(message.author.id)) {

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify a twitch username !"))

        var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find(x => x.id === key))

        if (!roleID) roleID = [null, 0]

        await getUser(args[0]).then((res) => {
          if (res._total === 0) {
            return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify **valid** a twitch username !"))
          } else {
            twitchID = res.users[0]._id
          }
        })

        let number = args[1] ? parseInt(args[1]) : roleID[1] + 25
        follow(twitchID, number).then((cool) => {
          const channel = client.channels.cache.find(c => c.name === "proofs");
          if (channel) channel.send(new Discord.MessageEmbed().setColor("GREEN").setAuthor(message.author.username, message.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 1024
          }))
            .setFooter(message.guild.name, message.guild.iconURL({
              dynamic: true
            }))
            .setDescription(`Successfully added **${number}** followers to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`)).then((msg) => {
              msg.react("<:verified:825762203419541524>")
            })
        })
        message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Adding **${number}** followers to \`${args[0]}\` !`))
      } else if (!admins.includes(message.author.id)) {


        if (message.channel.id === client.channels.cache.find(c => c.name === "chat").id) return message.delete();


        var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find(x => x.id === key))

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify a twitch username !"))

        let number = 25

        if (roleID) {
          number = number + roleID[1]
        }

        await getUser(args[0]).then((res) => {
          if (res._total === 0) {
            return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify **valid** a twitch username !"))
          } else {
            twitchID = res.users[0]._id
          }
        })

        message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Adding **${number}** followers to \`${args[0]}\` !`))

        follow(twitchID, number).then((cool) => {
          const channel = client.channels.cache.find(c => c.name === "proofs");
          if (channel) channel.send(new Discord.MessageEmbed().setColor("GREEN").setAuthor(message.author.username, message.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 1024
          }))
            .setFooter(message.guild.name, message.guild.iconURL({
              dynamic: true
            }))
            .setDescription(`Successfully added **${number}** followers to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`)).then((msg) => {
              msg.react("<:verified:825762203419541524>")
            })
        })
      }
    }
  }










  if (command === "tunfollow") {
    if (message.channel.name != "premium") { return; }
    let twitchID = "";

    if (admins.includes(message.author.id)) {

      if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify a twitch username !"))

      var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find(x => x.id === key))

      if (!roleID) roleID = [null, 0]

      await getUser(args[0]).then((res) => {
        if (res._total === 0) {
          return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify **valid** a twitch username !"))
        } else {
          twitchID = res.users[0]._id
        }
      })

      let number = args[1] ? parseInt(args[1]) : roleID[1] + 25
      unfollow(twitchID, number).then((cool) => {
        const channel = client.channels.cache.find(c => c.name === "proofs");
        if (channel) channel.send(new Discord.MessageEmbed().setColor("GREEN").setAuthor(message.author.username, message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 1024
        }))
          .setFooter(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setDescription(`Successfully removed **${number}** followers to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`)).then((msg) => {
            msg.react("<:verified:825762203419541524>")
          })
      })
      message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Removing **${number}** followers to \`${args[0]}\` !`))
    } else if (!admins.includes(message.author.id)) {


      if (message.channel.id === client.channels.cache.find(c => c.name === "chat").id) return message.delete();


      var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find(x => x.id === key))

      if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify a twitch username !"))

      let number = 25

      if (roleID) {
        number = number + roleID[1]
      }

      await getUser(args[0]).then((res) => {
        if (res._total === 0) {
          return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify **valid** a twitch username !"))
        } else {
          twitchID = res.users[0]._id
        }
      })

      message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Removing **${number}** followers to \`${args[0]}\` !`))

      unfollow(twitchID, number).then((cool) => {
        const channel = client.channels.cache.find(c => c.name === "proofs");
        if (channel) channel.send(new Discord.MessageEmbed().setColor("GREEN").setAuthor(message.author.username, message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 1024
        }))
          .setFooter(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setDescription(`Successfully removed **${number}** followers to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`)).then((msg) => {
            msg.react("<:verified:825762203419541524>")
          })
      })
    }
  }




if (command === "tfriend") {
    if (message.channel.id != "900152139240865822") { return; }

    if (cooldown.has(message.author.id)) {
      message.reply("you are on a cooldown");
      console.log("user are on a cooldown");
    }
    else {
      if (!admins.includes(message.author.id)) {
        cooldown.add(message.author.id);
        setTimeout(() => {
          console.log("Cooldown added");
          cooldown.delete(message.author.id)
        }, 180000)
      }


      let twitchID = "";

      if (admins.includes(message.author.id)) {

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify a twitch username !"))

        var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find(x => x.id === key))

        if (!roleID) roleID = [null, 0]

        await getUser(args[0]).then((res) => {
          if (res._total === 0) {
            return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify **valid** a twitch username !"))
          } else {
            twitchID = res.users[0]._id
          }
        })

        let number = args[1] ? parseInt(args[1]) : roleID[1] + 25
        friend(twitchID, number).then((cool) => {
          const channel = client.channels.cache.find(c => c.name === "proofs");
          if (channel) channel.send(new Discord.MessageEmbed().setColor("GREEN").setAuthor(message.author.username, message.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 1024
          }))
            .setFooter(message.guild.name, message.guild.iconURL({
              dynamic: true
            }))
            .setDescription(`Successfully added **${number}** friend requests to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`)).then((msg) => {
              msg.react("<:verified:825762203419541524>")
            })
        })
        message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Adding **${number}** friend requests to \`${args[0]}\` !`))
      } else if (!admins.includes(message.author.id)) {




        var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find(x => x.id === key))

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify a twitch username !"))

        let number = 25

        if (roleID) {
          number = number + roleID[1]
        }

        await getUser(args[0]).then((res) => {
          if (res._total === 0) {
            return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("You must specify **valid** a twitch username !"))
          } else {
            twitchID = res.users[0]._id
          }
        })

        message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Adding **${number}** friend requests to \`${args[0]}\` !`))

        friend(twitchID, number).then((cool) => {
          const channel = client.channels.cache.find(c => c.name === "proofs");
          if (channel) channel.send(new Discord.MessageEmbed().setColor("GREEN").setAuthor(message.author.username, message.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 1024
          }))
            .setFooter(message.guild.name, message.guild.iconURL({
              dynamic: true
            }))
            .setDescription(`Successfully added **${number}** friend requests to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`)).then((msg) => {
              msg.react("<:verified:825762203419541524>")
            })
        })
      }
    }
  }














})

function getUser(username) {
  return fetch(`https://api.twitch.tv/kraken/users?login=${username}`, {
    method: "GET",
    headers: {
      'Client-ID': "ymd9sjdyrpi8kz8zfxkdf5du04m649",
      "Authorization": "OAuth wukbrnwp5f6uo4barxkzfpkacyugob",
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  }).then(async (res) => res.json())
};

async function follow(twitchID, number) {
  return new Promise(async (resolve, reject) => {
    let done = 0
    let RandomToken = Math.floor(Math.random() * 2)
    for (var i = 0; i < number; i++) {
      RandomToken++;
      let res = await sendRequest(twitchID, tokens[RandomToken]);
      done++
    }

    while (i === number) {
      return resolve(true)
    }
  })

}

async function unfollow(twitchID, number) {
  return new Promise(async (resolve, reject) => {
    let done = 0
    for (var i = 0; i < number; i++) {
      let res = await unfollowsendRequest(twitchID, tokens[i]);
      done++
    }

    while (i === number) {
      console.log(twitchID);
      return resolve(true)
    }
  })

}




async function friend(twitchID, number) {
  return new Promise(async (resolve, reject) => {
    let done = 0
    let RandomToken = Math.floor(Math.random() * 2)
    for (var i = 0; i < number; i++) {
      RandomToken++;
      let res = await sendFriendRequest(twitchID, tokens[RandomToken]);
      done++
    }

    while (i === number) {
      return resolve(true)
    }
  })

}













async function sendRequest(userid, token) {
  return new Promise(async (resolve, reject) => {
    var data = `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"` + userid + `"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe"}}}]
    `;

    const options = {
      url: 'https://gql.twitch.tv/gql',
      headers: {
        "Authorization": 'OAuth ' + token,
        "Client-Id": 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        "Content-Type": "application/json"
      },
      body: data
    };

    request.post(options, (err, res, body) => {
      console.log(token);
      if (err) {
        console.log(token);
        return console.log(`Invalid twitch token`);
      }
      console.log(JSON.parse(body));
      resolve(true)
    });
  })
}


async function unfollowsendRequest(userid, token) {
  return new Promise(async (resolve, reject) => {
    var data = `[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"disableNotifications":false,"targetID":"` + userid + `"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"d7fbdb4e9780dcdc0cc1618ec783309471cd05a59584fc3c56ea1c52bb632d41"}}}]
    `;

    const options = {
      url: 'https://gql.twitch.tv/gql',
      headers: {
        "Authorization": 'OAuth ' + token,
        "Client-Id": 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        "Content-Type": "application/json"
      },
      body: data
    };

    request.post(options, (err, res, body) => {
      console.log(token);
      if (err) {
        console.log(token);
        return console.log(`Invalid twitch token`);
      }
      console.log(JSON.parse(body));
      resolve(true)
    });
  })
}





async function sendFriendRequest(userid, token) {
  return new Promise(async (resolve, reject) => {
    var data = `[{"operationName":"FriendButton_CreateFriendRequest","variables":{"input":{"targetID":"` + userid + `"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"380d8b19fcffef2fd8654e524444055dbca557d71968044115849d569d24129a"}}}]
    `;

    const options = {
      url: 'https://gql.twitch.tv/gql',
      headers: {
        "Authorization": 'OAuth ' + token,
        "Client-Id": 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        "Content-Type": "application/json"
      },
      body: data
    };

    request.post(options, (err, res, body) => {
      console.log(token);
      if (err) {
        console.log(token);
        return console.log(`Invalid twitch token`);
      }
      console.log(JSON.parse(body));
      resolve(true)
    });
  })
}











client.on("guildMemberAdd", async (member) => {
  const channels = ["bitch fuck this", "gayfortnite balls"]

  for (let i = 0; i < channels.length; i++) {
    const channel = client.channels.cache.find(c => c.name === channels[i])
    if (channel) channel.send(`${member}, **Check out this channel !**`).then(async (msg) => {
      msg.delete({
        timeout: 5000
      })
    })
  }
})

client.login(mySecret)