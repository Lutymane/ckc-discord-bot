export const tezosRPC = "https://mainnet.api.tez.ie/"
export const ipfsGate = 'https://cloudflare-ipfs.com/ipfs/'//"https://ipfs.io/ipfs/"


export const guildId =
    //'591722149060935690'
    '889512433763373126'
export const appId = '930567550784372837'


import fs from 'fs/promises'
export const token =
    //await fs.readFile('./token').then(d => d.toString());
    process.argv[2]