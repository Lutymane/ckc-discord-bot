import { get_storage_cs } from './contract.js';
async function getSaleData() {
    let storage = await get_storage_cs();
    return {
        soldAmount: storage.sale.soldAmount,
        saleSupply: storage.sale.saleSupply,
    };
}
export { getSaleData };
