'use client'
import { CHAIN_NAMESPACES, IProvider, UserAuthInfo, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x66eee",
    rpcTarget: process.env.NEXT_PUBLIC_ARB_SEPOLIA_RPC_URL || '',
    displayName: "Arbitrum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.arbiscan.io/",
    ticker: "AETH",
    tickerName: "AETH",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
};

// ETH sepolia congi
// const chainConfig = {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: "0xaa36a7",
//     rpcTarget: process.env.NEXT_PUBLIC_ETH_SEPOLIA_RPC_URL || '',
//     displayName: "Ethereum Sepolia Testnet",
//     blockExplorerUrl: "https://sepolia.etherscan.io",
//     ticker: "ETH",
//     tickerName: "Ethereum",
//     logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
// };


const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
});

export const web3auth = new Web3Auth({
    clientId: clientId ?? "",
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    privateKeyProvider,
});

export async function initializeWeb3Auth() {
    try {
        await web3auth.initModal();
        if (web3auth.connected) {
            // localStorage.setItem('jwtToken', web3auth.authenticateUser());
            console.log('User authenticated');
        }
    } catch (error) {
        console.error("Error initializing Web3Auth:", error);
    }
}
