import { Client, Intents, MessageEmbed } from "discord.js"

import { getSaleData } from "./getSaleData.js";
import { token } from "./config.js";
import { getKid } from "./getKid.js";
import { storage_cs } from "./contract.js";

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Ready!');
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case 'kid': {
            await interaction.deferReply()

            let id = interaction.options.get('id', true).value as number;

            let metadata = await getKid(id)

            if (metadata) {
                let embed = new MessageEmbed()
                    .setTitle(`Cyber Kid #${id}`)
                    .setColor(0x00fefe)
                    .setURL(`https://objkt.com/asset/cyberkidzclub/${id}`)
                    .setImage(metadata.artifactUri)
                    .addFields(metadata.attributes.map((a) => ({ ...a, inline: true })))

                await interaction.editReply({ embeds: [embed] });
            }
            else {
                await interaction.editReply('No kid with such ID found');
            }
        }
            break;
        case 'progress': {
            await interaction.deferReply()

            let { soldAmount, saleSupply } = await getSaleData();

            let embed = new MessageEmbed()
                .setTitle('Sales progress')
                .setDescription(
                    `Minted ${soldAmount} of ${saleSupply}` + '\n' +
                    (saleSupply == soldAmount ?
                        'SOLD OUT! YEEE!!!' :
                        `${saleSupply - soldAmount} left!`)
                )

            await interaction.editReply({ embeds: [embed] })
        }
            break;

        case 'random': {
            await interaction.deferReply()

            let id = 0
            let metadata = null;

            while (!metadata) {
                id = 1 + Math.floor(Math.random() * (storage_cs.sale.saleSupply + 1))
                metadata = await getKid(id)
            }

            let embed = new MessageEmbed()
                .setTitle(`Cyber Kid #${id}`)
                .setColor(Math.random() * 0xffffff)
                .setURL(`https://objkt.com/asset/cyberkidzclub/${id}`)
                .setImage(metadata.artifactUri)
                .addFields(metadata.attributes.map((a) => ({ ...a, inline: true })))

            await interaction.editReply({ embeds: [embed] });
        }
            break;
    }
})

// Login to Discord with your client's token
client.login(token)