import { TezosToolkit } from "@taquito/taquito";
import { tezosRPC } from "./config.js";
export const tezos = new TezosToolkit(tezosRPC);
let cyberKidsFA2Contract = await tezos.contract.at("KT19VQfPZhmAw9FN3hs2da3CmezrdP2ubQCc");
let cyberKidsCSContract = await tezos.contract.at("KT1LztSL29UUMB8r3czZQSL5swfvzA6Q44gg");
export let storage_fa2 = await cyberKidsFA2Contract.storage();
export const get_storage_cs = async () => await cyberKidsCSContract.storage();
