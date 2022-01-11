import { Client, Intents, MessageEmbed } from "discord.js"
import { token } from "./config.js";
import { getKid } from "./getKid.js";

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Ready!');
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'kid') {
        await interaction.deferReply()

        let id = interaction.options.get('id', true).value as number;

        let metadata = await getKid(id)

        let embed = new MessageEmbed()
            .setTitle(`Cyber Kid #${id}`)
            .setURL(`https://objkt.com/asset/cyberkidzclub/${id}`)
            .setImage(metadata.artifactUri)
            .addFields(metadata.attributes.map((a) => ({ ...a, inline: true })))

        await interaction.editReply({ embeds: [embed] });
    }
})

// Login to Discord with your client's token
client.login(token)