import { BigMapAbstraction, MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { bytes2Char } from "@taquito/utils";
import axios from "axios";

import { tezosRPC, ipfsGate } from './config.js'

let tezos = new TezosToolkit(tezosRPC);

let cyberKidsContract = await tezos.contract.at("KT19VQfPZhmAw9FN3hs2da3CmezrdP2ubQCc");
let storage = await cyberKidsContract.storage<{
    assets: {
        token_metadata: BigMapAbstraction;
    };
}>();


async function getKid(cyberKidId: number | string) {
    let tokenMetadata = await storage.assets.token_metadata.get<{
        token_info: MichelsonMap<string, string>;
    }>(cyberKidId);

    if (!tokenMetadata) {
        //"No kid with such id"
        return null;
    }

    let ipfsHashBytes = tokenMetadata.token_info.get("");

    let ipfsPath = bytes2Char(ipfsHashBytes).replace("ipfs://", ipfsGate);

    let metadata = await axios
        .get<{
            artifactUri: string;
            attributes: Array<{ name: string; value: string }>;
        }>(ipfsPath)
        .then((r) => r.data);

    metadata.artifactUri = metadata.artifactUri.replace("ipfs://", ipfsGate)

    return metadata;
}


export { getKid }
