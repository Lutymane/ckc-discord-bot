import { type BigMapAbstraction, TezosToolkit } from "@taquito/taquito";
import { tezosRPC } from "config";

export const tezos = new TezosToolkit(tezosRPC);

let cyberKidsFA2Contract = await tezos.contract.at("KT19VQfPZhmAw9FN3hs2da3CmezrdP2ubQCc");
let cyberKidsCSContract = await tezos.contract.at("KT1LztSL29UUMB8r3czZQSL5swfvzA6Q44gg");


export let storage_fa2 = await cyberKidsFA2Contract.storage<{
    assets: {
        token_metadata: BigMapAbstraction;
    };
}>();

export const storage_cs = await cyberKidsCSContract.storage<{
    sale: {
        soldAmount: number,
        saleSupply: number,
    }
}>()