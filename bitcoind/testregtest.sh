#!/bin/sh

PREFIX=docker exec --user bitcoin electrumx-bitcoind_bitcoind_1 bitcoin-cli -regtest -rpcuser=electrum -rpcpassword=electrum

#Create wallets
$PREFIX -regtest createwallet wallet1
$PREFIX -regtest createwallet wallet2

#Fund wallet1 and send coins to wallet2
ADDRESS_WALLET1=$PREFIX -rpcwallet=wallet1  getnewaddress
ADDRESS_WALLET2=$PREFIX -rpcwallet=wallet2  getnewaddress


$PREFIX -rpcwallet=wallet1 generatetoaddress 150 $ADDRESS_WALLET1

$PREFIX -rpcwallet=wallet1 settxfee 0.01
RAW_TX=$PREFIX -rpcwallet=wallet1 sendtoaddress $ADDRESS_WALLET2 20
