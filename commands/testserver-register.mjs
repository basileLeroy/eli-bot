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