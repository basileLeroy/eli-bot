import { config } from "dotenv";
import { REST, Routes } from "discord.js";
config();

const guildId = process.env.PROD_SERVER_ID;

const commands = [
    {
        name: "ping",
        description: "Executes a ping test."
    },
    {
        name: "whoami",
        description: "I will introduce myself."
    },
    {
        name: "suggest",
        description: "Submit a suggestion to the Tech Guild",
        options: [
            {
                name: "title",
                description: "The title of your suggestion",
                type: 3, // STRING type
                required: true,
                max_length: 100
            },
            {
                name: "description",
                description: "The detailed description of your suggestion",
                type: 3, // STRING type
                required: true,
                max_length: 1000
            }
        ]
    },
    {
        name: "report",
        description: "Report a message to the moderators",
        options: [
            {
                name: "message_link",
                description: "Copy the link of the message you want to report.",
                type: 3, // STRING type
                required: true,
                max_length: 500
            },
            {
                name: "reason",
                description: "Why are you reporting this message?",
                type: 3, // STRING type
                required: true,
                max_length: 1000
            }
        ]
    },
    {
        name: "announce",
        description: "Send an announcement to a channel (moderators only)",
        options: [
            {
                name: "target_role",
                description: "The role to mention in the announcement",
                type: 8, // ROLE
                required: true
            },
            {
                name: "target_channel",
                description: "The channel to send the announcement to",
                type: 7, // CHANNEL
                required: true
            },
            {
                name: "message",
                description: "The content of the announcement",
                type: 3, // STRING
                required: true,
                max_length: 2000
            }
        ]
    },
]

const rest = new REST({version:"10"}).setToken(process.env.APP_TOKEN)

const registerCommands = async (guildId) => {
    try {
        if (!process.env.BOT_ID) console.error("no bot id found.");
        console.log('Started refreshing application (/) commands.');

        // await rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: commands });
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, guildId),
            { body: commands }
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

registerCommands(guildId);