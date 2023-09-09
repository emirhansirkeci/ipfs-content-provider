# IPFS Content Provider

Opensea behaves oddly when the IPFS link returned as a response from the tokenURI method in the smart contract doesn't have a .json extension at the end. So, I developed this solution for such cases.

❌ https://ipfs.io/ipfs/ipfs_link/543

✔️ https://ipfs-content-provider/543.json
