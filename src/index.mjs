import { Client, Events, IntentsBitField } from "discord.js";
import { config } from "dotenv";
import { handleAnnounce, handlePing, handleReport, handleSuggest, handleWhoami } from "../commands/index.mjs";
config();

const eli = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.MessageContent,
    ]
});

eli.on(Events.ClientReady, client => {
    console.log(`${client.user.tag} clocked in and started working!`);
});

eli.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case 'ping':
            return handlePing(interaction);
        case 'whoami':
            return handleWhoami(interaction);
        case 'suggest':
            return handleSuggest(interaction);
        case 'report':
            return handleReport(interaction);
        case 'announce':
            return handleAnnounce(interaction);
        default:
            return;
    }
});

eli.login(process.env.APP_TOKEN);