import { config } from "dotenv";
import { REST, Routes } from "discord.js";
config();

const guildId = process.env.TEST_SERVER_ID;

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
    }
]

const rest = new REST({version:"10"}).setToken(process.env.APP_TOKEN)

const registerCommands = async (guildId) => {
    try {
        if (!process.env.BOT_ID) console.error("no bot id found.");
        console.log('Started refreshing application TEST (/) commands.');

        // await rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: commands });
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, guildId),
            { body: commands }
        );
        console.log('Successfully reloaded application TEST (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

registerCommands(guildId);