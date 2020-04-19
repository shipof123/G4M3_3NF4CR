const fs = require("fs");
const client = new Discord.Client();
comp = [];
nominated = 'a nominated user';
function nominate_command(msg) {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    nominated = msg.content.slice(10).split(' ')[0];
    nominated = nominated.replace('!', '');
    console.log(`nominated = ${nominated}`);
    msg.reply(`right away captian, ${nominated} has been nominated`);
  } else if(msg.author == nominated) {
    nominated = msg.content.slice(10);
    console.log(`nominated = ${nominated}`);
    msg.reply(`${nominated} has been nominated`);
  } else {
    msg.reply(`Only an admin or ${nominated} can do that`);
  }
}

function remove_command(msg) {
if(`<@${msg.author.id}>` == nominated) {
    comp.pop();
    console.log(`Added: ${meat}`);
    msg.react('✔️');
  } else {
    msg.reply(`Only an admin or ${nominated} can do that`);
    msg.react('❌');
  }
}

function add_command(msg) {
  meat = msg.content.slice(5);
  if(meat.includes('!')){
    msg.reply("Forbidden character '!' found in request, for incredibly obvious security concerns, this request has not been proccessed");
  } else if(`<@${msg.author.id}>` == nominated) {
    comp.push(meat + ' ');
    console.log(`Added: ${meat}`);
    msg.react('✔️');
  } else {
    msg.reply(`Only an admin or ${nominated} can do that`);
    msg.react('❌');
  }
}

function print_command(msg) {
  msg.channel.send(comp.join('')).catch(console.error);
}
commands = {
  "!add" : add_command,
  "!print_out" : print_command,
  "!nominate" : nominate_command,
  "!remove" : remove_command
};

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', (msg) => {
 console.log(`(${msg.author})<${msg.author.username}>: ${msg.content}`)
 if(msg.author.bot) return;
 if(msg.content[0] == '!') {
  try {
    commands[msg.content.split(' ')[0]](msg);
  } catch {
    msg.reply('Command not recognized,\n The right letter in the wrong place can make all the difference in the world');
  }
 }
 fs.writeFileSync('prose.txt', comp.join(''));
});

client.login(BOT_TOKEN);
