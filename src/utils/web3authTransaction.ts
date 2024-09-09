import { IProvider } from '@web3auth/base';
import { ethers } from 'ethers';

export const handleTest = async (web3auth: any, isInitialized: boolean) => {
  if (!isInitialized) {
    console.error('Web3Auth is not initialized');
    return;
  }

  try {
    if (!web3auth.connected) {
      await web3auth.connect();
    }

    console.log('Connected');
    const provider = new ethers.providers.Web3Provider(web3auth.provider as IProvider);
    const signer = provider.getSigner();
    const destination = "0xAEDb4Aa3aa52953864b3e0813087E332F1Dcee3B";
    const amount = ethers.utils.parseEther("0.001");

    const address = await signer.getAddress();
    console.log('Address:', address);
    console.log('Sending transaction...');
    const network = await provider.getNetwork();

    console.log(network.name);
    console.log(network.chainId);
    console.log(network.ensAddress);

    const tx = await signer.sendTransaction({
      to: destination,
      value: amount,
    });

    console.log('Transaction sent! Hash:', tx.hash);

    console.log('Waiting for transaction to be mined...');
    const receipt = await tx.wait();
    console.log('Transaction mined! Block:', receipt.blockNumber);
  } catch (error) {
    console.error('Error in handleTest:', error);
  }
};
