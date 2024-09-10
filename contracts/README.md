`forge script script/VibeCheck.s.sol --rpc-url $LINEA_RPC_URL --private-key $PRIVATE_KEY --verify --etherscan-api-key $LINEASCAN_API --chain 59141 --broadcast`

for linea deployment and verification

toml config
```
[rpc_endpoints]
linea = "https://rpc.sepolia.linea.build"

[etherscan]
linea = { key = "${LINEASCAN_API}", url = "https://api-sepolia.lineascan.build/api", chain=59141 }
```

contract address: 0xCC2b0540A3d30c124a83eBc716056363e4cbae6D