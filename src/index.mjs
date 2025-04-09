import { Client, IntentsBitField } from "discord.js";
import { config } from "dotenv";
config();

const eli = new Client({
    intents: IntentsBitField.Flags.Guilds,
    intents: IntentsBitField.Flags.GuildMembers,
    intents: IntentsBitField.Flags.GuildMessages,
    intents: IntentsBitField.Flags.GuildInvites,
    intents: IntentsBitField.Flags.MessageContent,
});

eli.on("ready", (client) => {
    console.log(`${client.user.tag} clocked in and started working!`);
})

eli.login(process.env.APP_TOKEN);