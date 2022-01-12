import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { appId, guildId, token } from './config.js';
const commands = [
    new SlashCommandBuilder()
        .setName('kid')
        .setDescription('Replies with info of the specified CyberKid')
        .addNumberOption(option => option
        .setName('id')
        .setDescription('Cyber Kid ID')
        .setRequired(true)),
]
    .map(command => command.toJSON());
const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(appId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
