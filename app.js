const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const sql = require("sqlite");
sql.open("./score.sqlite");

client.on("ready", () => {
  console.log(`Bot initialized successfully!`); 
  client.user.setGame(`with your heart~ <3`);
});

client.on('guildMemberAdd', member => {
   member.send("PLACEHOLDER TEXT");
   member.guild.channels.find("name", "general").send(member.toString()+"\nWelcome Message");
});

var fortunes = [
"Your fortune: Reply hazy, try again",
	"Your fortune: Excellent Luck",
	"Your fortune: Good Luck",
	"Your fortune: Average Luck",
	"Your fortune: Bad Luck",
	"Your fortune: Good news will come to you by mail",
	"Your fortune: （　´_ゝ`）ﾌｰﾝ ",
	"Your fortune: ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!",
	"Your fortune: You will meet a dark handsome stranger",
	"Your fortune: Better not tell you now",
	"Your fortune: Outlook good",
	"Your fortune: Very Bad Luck",
	"Your fortune: Godly Luck",
	"Your fortune: YOU JUST LOST THE GAME"]

var ascii = [
"```\n▒▒▒▒▒▒▒▒▄▄▄▄▄▄▄▄▒▒▒▒▒▒▒▒\n▒▒▒▒▒▄█▀▀░░░░░░▀▀█▄▒▒▒▒▒\n▒▒▒▄█▀▄██▄░░░░░░░░▀█▄▒▒▒\n▒▒█▀░▀░░▄▀░░░░▄▀▀▀▀░▀█▒▒\n▒█▀░░░░███░░░░▄█▄░░░░▀█▒\n▒█░░░░░░▀░░░░░▀█▀░░░░░█▒\n▒█░░░░░░░░░░░░░░░░░░░░█▒\n▒█░░██▄░░▀▀▀▀▄▄░░░░░░░█▒\n▒▀█░█░█░░░▄▄▄▄▄░░░░░░█▀▒\n▒▒▀█▀░▀▀▀▀░▄▄▄▀░░░░▄█▀▒▒\n▒▒▒█░░░░░░▀█░░░░░▄█▀▒▒▒▒\n▒▒▒█▄░░░░░▀█▄▄▄█▀▀▒▒▒▒▒▒\n▒▒▒▒▀▀▀▀▀▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒```",
"```\n⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⠍⠙⢿⡟⢿⣿⣿⣿⣿⣿⣿⣿⣿\n⠹⣿⣿⣿⣿⣿⣿⣿⠁⠈⢀⡤⢲⣾⣗⠲⣿⣿⣿⣿⣿⣿⣟⠻\n⡀⢙⣿⣿⣿⣿⣿⣿⢀⠰⠁⢰⣾⣿⣿⡇⢀⣿⣿⣿⣿⣿⣿⡄\n⣇⢀⢀⠙⠷⣍⠛⠛⢀⢀⢀⢀⠙⠋⠉⢀⢀⢸⣿⣿⣿⣿⣿⣷\n⡙⠆⢀⣀⠤⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⣿⣿⣿⣿\n⣷⣖⠋⠁⢀⢀⢀⢀⢀⢀⣀⣀⣄⢀⢀⢀⢀⢸⠏⣿⣿⣿⢿⣿\n⣿⣷⡀⢀⢀⢀⢀⢀⡒⠉⠉⢀⢀⢀⢀⢀⢀⢈⣴⣿⣿⡿⢀⡿\n⣿⣿⣷⣄⢀⢀⢀⢀⠐⠄⢀⢀⢀⠈⢀⣀⣴⣿⣿⣿⡿⠁⢀⣡\n⠻⣿⣿⣿⣿⣆⠢⣤⣄⢀⢀⣀⠠⢴⣾⣿⣿⡿⢋⠟⢡⣿⣿⣿\n⢀⠘⠿⣿⣿⣿⣦⣹⣿⣀⣀⣀⣀⠘⠛⠋⠁⡀⣄⣴⣿⣿⣿⣿\n⢀⢀⢀⠈⠛⣽⣿⣿⣿⣿⣿⣿⠁⢀⢀⢀⣡⣾⣿⣿⣿⡟⣹⣿\n⢀⢀⢀⢀⢰⣿⣿⣿⣿⣿⣿⣿⣦⣤⣶⣿⡿⢛⢿⡇⠟⠰⣿⣿\n⢀⢀⢀⢀⣿⣿⣿⡿⢉⣭⢭⠏⣿⡿⢸⡏⣼⣿⢴⡇⢸⣿⣶⣿\n⢀⢀⢀⢰⣿⣿⣿⢃⣶⣶⡏⠸⠟⣱⣿⣧⣛⣣⢾⣿⣿⣿⣿⣿\n⢀⢀⢀⣾⣿⣿⣿⣾⣿⣿⠟⢻⡿⡉⣷⣬⡛⣵⣿⣿⣿⣿⣿⣿\n⢀⢀⣸⣿⣿⣿⣿⣿⣿⡿⢰⠘⣰⣇⣿⣿⣰⣿⣿⣿⣿⣿⣿⣿\n⢀⢀⠘⢿⣿⣿⣿⣿⣿⡷⢺⣿⠟⣩⣭⣽⣇⠲⠶⣿⣿⣿⣿⣿\n⢀⠐⢀⣾⣿⣿⣿⣿⠟⢐⡈⣿⣷⣶⠎⣹⡟⠟⣛⣸⣿⣿⣿⣿\n⠠⢀⣼⣿⣿⣿⣿⣯⣼⣿⣷⣿⣷⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿```",
"```\n░░░░█▐▄▒▒▒▌▌▒▒▌░▌▒▐▐▐▒▒▐▒▒▌▒▀▄▀▄░\n░░░█▐▒▒▀▀▌░▀▀▀░░▀▀▀░░▀▀▄▌▌▐▒▒▒▌▐░\n░░▐▒▒▀▀▄▐░▀▀▄▄░░░░░░░░░░░▐▒▌▒▒▐░▌\n░░▐▒▌▒▒▒▌░▄▄▄▄█▄░░░░░░░▄▄▄▐▐▄▄▀░░\n░░▌▐▒▒▒▐░░░░░░░░░░░░░▀█▄░░░░▌▌░░░\n▄▀▒▒▌▒▒▐░░░░░░░▄░░▄░░░░░▀▀░░▌▌░░░\n▄▄▀▒▐▒▒▐░░░░░░░▐▀▀▀▄▄▀░░░░░░▌▌░░░\n░░░░█▌▒▒▌░░░░░▐▒▒▒▒▒▌░░░░░░▐▐▒▀▀▄\n░░▄▀▒▒▒▒▐░░░░░▐▒▒▒▒▐░░░░░▄█▄▒▐▒▒▒\n▄▀▒▒▒▒▒▄██▀▄▄░░▀▄▄▀░░▄▄▀█▄░█▀▒▒▒▒```",
"```\n░░░░░░░░░▄░░░░░░░░░░░░░░▄\n░░░░░░░░▌▒█░░░░░░░░░░░▄▀▒▌\n░░░░░░░░▌▒▒█░░░░░░░░▄▀▒▒▒▐\n░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐\n░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐\n░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌\n░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌\n░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐\n░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌\n░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌\n▌▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐\n▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌\n▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐\n░▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌\n░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐\n░░▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌\n░░░░▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀\n░░░░░░▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀\n░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▀▀```",
"```\n░░░░░░░░░░░░░▄███▄▄▄░░░░░░░\n░░░░░░░░░▄▄▄██▀▀▀▀███▄░░░░░\n░░░░░░░▄▀▀░░░░░░░░░░░▀█░░░░\n░░░░▄▄▀░░░░░░░░░░░░░░░▀█░░░\n░░░█░░░░░▀▄░░▄▀░░░░░░░░█░░░\n░░░▐██▄░░▀▄▀▀▄▀░░▄██▀░▐▌░░░\n░░░█▀█░▀░░░▀▀░░░▀░█▀░░▐▌░░░\n░░░█░░▀▐░░░░░░░░▌▀░░░░░█░░░\n░░░█░░░░░░░░░░░░░░░░░░░█░░░\n░░░░█░░▀▄░░░░▄▀░░░░░░░░█░░░\n░░░░█░░░░░░░░░░░▄▄░░░░█░░░░\n░░░░░█▀██▀▀▀▀██▀░░░░░░█░░░░\n░░░░░█░░▀████▀░░░░░░░█░░░░░\n░░░░░░█░░░░░░░░░░░░▄█░░░░░░\n░░░░░░░██░░░░░█▄▄▀▀░█░░░░░░\n░░░░░░░░▀▀█▀▀▀▀░░░░░░█░░░░░\n░░░░░░░░░█░░░░░░░░░░░░█░░░░```",
"```\n░░░░░░░░░░░░░░░░░░░░\n░▄▀▄▀▀▀▀▄▀▄░░░░░░░░░\n░█░░░░░░░░▀▄░░░░░░▄░\n█░░▀░░▀░░░░░▀▄▄░░█░█\n█░▄░█▀░▄░░░░░░░▀▀░░█\n█░░▀▀▀▀░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░░░░█\n░█░░▄▄░░▄▄▄▄░░▄▄░░█░\n░█░▄▀█░▄▀░░█░▄▀█░▄▀░\n░░▀░░░▀░░░░░▀░░░▀░░░```",
"```\n________▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄______\n_______█░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░█_____\n_______█░▒▒▒▒▒▒▒▒▒▒▄▀▀▄▒▒▒░░█▄▀▀▄_\n__▄▄___█░▒▒▒▒▒▒▒▒▒▒█▓▓▓▀▄▄▄▄▀▓▓▓█_\n█▓▓█▄▄█░▒▒▒▒▒▒▒▒▒▄▀▓▓▓▓▓▓▓▓▓▓▓▓▀▄_\n_▀▄▄▓▓█░▒▒▒▒▒▒▒▒▒█▓▓▓▄█▓▓▓▄▓▄█▓▓█_\n_____▀▀█░▒▒▒▒▒▒▒▒▒█▓▒▒▓▄▓▓▄▓▓▄▓▒▒█\n______▄█░░▒▒▒▒▒▒▒▒▒▀▄▓▓▀▀▀▀▀▀▀▓▄▀_\n____▄▀▓▀█▄▄▄▄▄▄▄▄▄▄▄▄██████▀█▀▀___\n____█▄▄▀_█▄▄▀_______█▄▄▀_▀▄▄█_____```",
"```\n▒▒▒▒▒▒▒▒▒▄▄▄▄▒▄▄▄▒▒▒\n▒▒▒▒▒▒▄▀▀▓▓▓▀█░░░█▒▒\n▒▒▒▒▄▀▓▓▄██████▄░█▒▒\n▒▒▒▄█▄█▀░░▄░▄░█▀▀▄▒▒\n▒▒▄▀░██▄░░▀░▀░▀▄▓█▒▒\n▒▒▀▄░░▀░▄█▄▄░░▄█▄▀▒▒\n▒▒▒▒▀█▄▄░░▀▀▀█▀▓█▒▒▒\n▒▒▒▄▀▓▓▓▀██▀▀█▄▀▒▒▒▒\n▒▒█▓▓▄▀▀▀▄█▄▓▓▀█▒▒▒▒\n▒▒▀▄█░░░░░█▀▀▄▄▀█▒▒▒\n▒▒▒▄▀▀▄▄▄██▄▄█▀▓▓█▒▒\n▒▒█▀▓█████████▓▓▓█▒▒\n▒▒█▓▓██▀▀▀▒▒▒▀▄▄█▀▒▒\n▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒```",
"```\n░░░░░░░▄▄▀▀▀▀▀▀▄▄░░░░░░░\n░░░░░▄▀░░░░░░░░░░▀▄░░░░░\n░░░▄▀░░░░░░░░░░░░░░▀▄░░░\n░░▄░░░░░░░░░░░░░░░░░░▄░░\n░▄░░░▄▄░░░░░░░░░░▄▄░░░▄░\n░░░░▌░░█░░░░░░░░▐░░█░░░░\n░▌░░▀██▀░▄████▄░▒▀██░░▐░\n░░░░▒▒▒▒░█▄▄▄▄█░▒▒▒▒░░░░\n░▀░░▒▒░░░░░░░░░░▒▒▒░░▀░░\n░░▀▄░▒░░░░░░░░░░▒▒░▄▀░░░\n░░░░▀▄▒░░░░░░░░░▒\n▄▀░░░░\n░░░░░░░▀▀▀▀▀▀▀▀▀▀░░░░░░░```",
"```\n░░░░░░░░░░░░░░░░░░░░░░\n░░░░░▄▄░░░░░░▄▄▄▄░░░░░\n░░░▐▀▀▄█▀▀▀▀▀▒▄▒▀▌░░░░\n░░░▐▒█▀▒▒▒▒▒▒▒▒▀█░░░░░\n░░░░█▒▒▒▒▒▒▒▒▒▒▒▀▌░░░░\n░░░░▌▒██▒▒▒▒██▒▒▒▐░░░░\n░░░░▌▒▒▄▒██▒▄▄▒▒▒▐░░░░\n░░░▐▒▒▒▀▄█▀█▄▀▒▒▒▒█▄░░\n░░░▀█▄▒▒▐▐▄▌▌▒▒▄▐▄▐░░░\n░░▄▀▒▒▄▒▒▀▀▀▒▒▒▒▀▒▀▄░░\n░░█▒▀█▀▌▒▒▒▒▒▄▄▄▐▒▒▐░░\n░░░▀▄▄▌▌▒▒▒▒▐▒▒▒▀▒▒▐░░\n░░░░░░░▐▌▒▒▒▒▀▄▄▄▄▄▀░░\n░░░░░░░░▐▄▒▒▒▒▒▒▒▒▐░░░\n░░░░░░░░▌▒▒▒▒▄▄▒▒▒▐░░░```",
"```\n░░┌──┐░░░░░░░░░░┌──┐░░\n░╔╡▐▐╞╝░░┌──┐░░╔╡▐▐╞╝░\n░░└╥╥┘░░╚╡▌▌╞╗░░└╥╥┘░░\n░░░╚╚░░░░└╥╥┘░░░░╚╚░░░\n░░░░░░░░░░╝╝░░░\nDANCE\nPARTY\n░░┌──┐░░░░░░░░░░┌──┐░░\n░╔╡XX╞╝░░┌──┐░░╔╡XX╞╝░\n░░└╥╥┘░░╚╡XX╞╗░░└╥╥┘░░\n░░░╚╚░░░░└╥╥┘░░░░╚╚░░░\n░░░░░░░░░░╝╝░░░░░░░░░░```",
"```\n░░░░█░▀▄░░░░░░░░░░▄▄███▀░░\n░░░░█░░░▀▄░▄▄▄▄▄░▄▀░░░█▀░░\n░░░░░▀▄░░░▀░░░░░▀░░░▄▀░░░░\n░░░░░░░▌░▄▄░░░▄▄░▐▀▀░░░░░░\n░░░░░░▐░░█▄░░░▄█░░▌▄▄▀▀▀▀█\n░░░░░░▌▄▄▀▀░▄░▀▀▄▄▐░░░░░░█\n░░░▄▀▀▐▀▀░░░░░░░▀▀▌▄▄▄░░░█\n░░░█░░░▀▄░░░░░░░▄▀░░░░█▀▀▀\n░░░░▀▄░░▀░░▀▀▀░░▀░░░▄█░░░░```",
"```\n░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░\n░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░\n░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░\n░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░\n░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░\n█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█\n█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█\n░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░\n░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░\n░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░\n░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░\n░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░\n░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░\n░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░\n░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░```",
"```\n░░░░░░░░▄▄█▀▀▄░░░░░░░\n░░░░░░▄█████▄▄█▄░░░░░\n░░░░░▄▀██████▄▄██░░░░\n░░░░░█░█▀░░▄▄▀█░█░░░░\n░░░░░▄██░░░▀▀░▀░█░░░░\n░░▄█▀░░▀█░▀▀▀▀▄▀▀█▄░░\n░▄███░▄░░▀▀▀▀▀▄░███▄░\n░██████░░░░░░░██████░\n░▀███▀█████████▀███▀░\n░░░░▄█▄░▀▀█▀░░░█▄░░░░\n░▄▄█████▄▀░▀▄█████▄▄░\n█████████░░░█████████```",
"```\n__________████████_____██████\n_________█░░░░░░░░██_██░░░░░░█\n________█░░░░░░░░░░░█░░░░░░░░░█\n_______█░░░░░░░███░░░█░░░░░░░░░█\n_______█░░░░███░░░███░█░░░████░█\n______█░░░██░░░░░░░░███░██░░░░██\n_____█░░░░░░░░░░░░░░░░░█░░░░░░░░███\n____█░░░░░░░░░░░░░██████░░░░░████░░█\n____█░░░░░░░░░█████░░░████░░██░░██░░█\n___██░░░░░░░███░░░░░░░░░░█░░░░░░░░███\n__█░░░░░░░░░░░░░░█████████░░█████████\n_█░░░░░░░░░░█████_████___████_█████___█\n_█░░░░░░░░░░█______█_███__█_____███_█___█\n█░░░░░░░░░░░░█___████_████____██_██████\n░░░░░░░░░░░░░█████████░░░████████░░░█\n░░░░░░░░░░░░░░░░█░░░░░█░░░░░░░░░░░░█\n░░░░░░░░░░░░░░░░░░░░██░░░░█░░░░░░██\n░░░░░░░░░░░░░░░░░░██░░░░░░░███████\n░░░░░░░░░░░░░░░░██░░░░░░░░░░█░░░░░█\n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n░░░░░░░░░░░█████████░░░░░░░░░░░░░░██\n░░░░░░░░░░█▒▒▒▒▒▒▒▒███████████████▒▒█\n░░░░░░░░░█▒▒███████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█\n░░░░░░░░░█▒▒▒▒▒▒▒▒▒█████████████████\n░░░░░░░░░░████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█\n░░░░░░░░░░░░░░░░░░██████████████████\n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n██░░░░░░░░░░░░░░░░░░░░░░░░░░░██\n▓██░░░░░░░░░░░░░░░░░░░░░░░░██\n▓▓▓███░░░░░░░░░░░░░░░░░░░░█\n▓▓▓▓▓▓███░░░░░░░░░░░░░░░██\n▓▓▓▓▓▓▓▓▓███████████████▓▓█\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█```",
"```\n        @@@@@@           @@@@@@\n      @@@@@@@@@@       @@@@@@@@@@\n    @@@@@@@@@@@@@@   @@@@@@@@@@@@@@\n  @@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@\n @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@\n        @@@@@@@@@@@@@@@@@@@@@@@\n          @@@@@@@@@@@@@@@@@@@\n            @@@@@@@@@@@@@@@\n              @@@@@@@@@@@\n                @@@@@@@\n                  @@@\n                   @```",
"```\n        ...e$e.$...e$                 ...e$e.$...e\n     !$6lkasd!$6lkasd!$6l          !$6lkasd!$6lkasd!\n   ;,a1wert;,a1wert;,a1wert     ;,a1wert;,a1wert;,a1we\n .asxzcvb.asxzcvb.asxzcvb.as   .asxzcvb.asxzcvb.asxzcvb.\n1qaswedfqas1wedfqas1wedfqas1wedfqas1wedfqas1edfqas1ewdfqa\n:lkjhgfdlkj:hgfdlkj:hgfdlkj:hgfdlkj:hgfdlkj:gfdhlkj:gfdhlk\n3edcvfr4edc3vfr4edc3vfr4edc3vfr4edc3vfr4edc3fr4vedc3fr4ved\n1234ewqa2341ewqa2341ewqa2341ewqa2341ewqa2341wqa2341weqa234\no[piuytr[piouytr[piouytr[piouytr[piouytr[pioytru[pioytru[p\nz/xcvbnm/xczvbnm/xczvbnm/xczvbnm/xczvbnm/xczbnmv/xczbnmv/x\n `1qazxs`1qazxs`1wqazs`1wqazxs`1qazwxs1qa`zws1qa`zwsx1qa`\n  mznxbcvfmznxbcvfmzxbcnvfzxbmcnfzxvbmnfzcxvbmnfzcxvbmnf\n   %t^y&ujm%t^y&ujm%^y&tuj%^ym&tu%^yj&tum%^yj&tum%^yj&t\n     )oiuytre)oiuytr)oieuyr)otieur)oyieutr)oyieutr)oyi\n      z.xcvgy7z.xcvg7z.yxcg7zv.yxc7zv.ygxc7zv.ygxc7z\n        q[wertyuq[weryuq[wertyuq[wetyurq[wetyurq[w\n           a;sdfghja;sdfghja;sdfghja;sdfghja;sdf\n              qmprootiqmprootimprootqimproot\n                 mtu1qaz@mtu1qa@mtuz1qa@m\n                    !qwe$rty!qwe$rty!q\n                       -p=oiuyt-p=o\n                           asdfg\n                             l```",
"```\n        LoveLoveLov                eLoveLoveLo\n     veLoveLoveLoveLove          LoveLoveLoveLoveLo\n  veLoveLoveLoveLoveLoveL      oveLoveLoveLoveLoveLove\n LoveLoveLoveLoveLoveLoveL    oveLoveLoveLoveLoveLoveLo\nveLoveLoveLoveLoveLoveLoveL  oveLoveLoveLoveLoveLoveLove\nLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLove\nLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLove\n LoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLo\n veLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLove\n   LoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLo\n     veLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLove\n       LoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLo\n         veLoveLoveLoveLoveLoveLoveLoveLoveLove\n           LoveLoveLoveLoveLoveLoveLoveLoveLo\n             veLoveLoveLoveLoveLoveLoveLove\n               LoveLoveLoveLoveLoveLoveLo\n                  veLoveLoveLoveLoveLo\n                      veLoveLoveLo\n                           ve```"
]
	
client.on("message", async message => {
  if(message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.channel.type !== "text") return;
    console.log(message.author.toString()+": "+message.content);
	
	
  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.5 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`you've leveled up to level **${curLevel}**!`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  if (message.content.startsWith(config.prefix + "level")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Your current level is 0");
      message.reply(`your current level is ${row.level}`);
    });
  } else

  if (message.content.startsWith(config.prefix + "points")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet!");
      message.reply(`you currently have ${row.points} points!`);
    });
  }
	
	
	
  if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send("```\n"+sayMessage+"```");
  }
  
  if(command === "kick") {
	if(!message.channel.permissionsFor(message.author).has("KICK_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "ban") {
	if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
        await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "clear") {
	if(!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES"))
	  return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  
  if(command === "fortune"){
	  message.channel.send(message.author.toString() +"\n"+fortunes[Math.floor(Math.random() * fortunes.length)]);
  }
  
  if(command === "ascii"){
	  message.channel.send(ascii[Math.floor(Math.random() * ascii.length)]);
  }
  
  if(command === "info"){
	 message.channel.send("LoveBot 1.0 \nDesigned by Leon \nFor all feedback and suggestions, DM a staff member <3");
  }

  if(command === "help"){
	  message.channel.send(message.author.toString() + "```\nCommands: \n/help \n/ban \n/kick \n/say \n/ping \n/points \n/level \n/fortune \n/ascii \n/clear \n/info \n```");
  }

  else return;
});

client.login(config.token);

const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('index');
});

app.listen(port, () => {
    console.log('Bot running on http://localhost:' + port);
});

setInterval(() => {
 http.get('https://intense-tundra-47026.herokuapp.com/');
}, 900000);
