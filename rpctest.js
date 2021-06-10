const ElectrumCli = require('electrum-client')
const main = async () => {
    // const ecl = new ElectrumCli(995, 'btc.smsys.me', 'tls') // tcp or tls
    // const ecl = new ElectrumCli(50001, 'electrum.coinucopia.io', 'tcp') // tcp or tls
    const ecl = new ElectrumCli(55001, 'localhost', 'tcp') // tcp or tls
    await ecl.connect(); // connect(promise)
    ecl.subscribe.on('blockchain.headers.subscribe', (v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const ver = await ecl.server_version("electrum-client", "1.4") // json-rpc(promise)
        console.log(ver)
        const response = await ecl.blockchainHeaders_subscribe();
        console.log(response);
        const response_tx = await ecl.blockchainTransaction_get('03cd750966edbb636ab41b6a5fa743c799de1b5b28a541b3176a10c7d1a3ee4c');
        console.log(response_tx)
        // const response_mempool = await ecl.blockchainScripthash_getMempool()
        console.log(response_mempool)
        }catch(e){
        console.log(e)
    }
    await ecl.close() // disconnect(promise)
}
main()