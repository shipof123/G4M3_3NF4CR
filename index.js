const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
comp = [];
nominated = '';
function nominate_command(msg) {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    nominated = msg.content.slice(10);
    console.log(`nominated = ${nominated}`);
    msg.reply(`right away captian, ${nominated} has been nominated`);
  } else if(msg.author == nominated) {
    nominated = msg.content.slice(10);
    console.log(`nominated = ${nominated}`);
    msg.reply(`${nominated} has been nominated`);
  }
}

function add_command(msg) {
  comp.push(msg.content.slice(5, msg.content.length) + ' ');
  console.log(`Added: ${msg.content.slice(5, msg.content.length)}`);
}

function print_command(msg) {
  msg.channel.send(comp)
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);
}
commands = {
  "!add" : add_command,
  "!print_out" : print_command,
  "!nominate" : nominate_command
};

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', (msg) => {
 console.log(`(${msg.author})<${msg.author.username}>: ${msg.content}`)
 if(msg.content[0] == '!') {
  try {
    commands[msg.content.split(' ')[0]](msg);
  } catch {
    msg.reply('Command not recognized,\n The right letter in the wrong place can make all the difference in the world');
  }
 }
});

client.login('NICE TRY, You're not gonna steal my bot token');
