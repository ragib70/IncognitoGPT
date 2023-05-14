import React from 'react';
import { useMetaMask } from './MetaMaskContext';

const ConnectButton = () => {
  const { provider } = useMetaMask();

  const connectWallet = async () => {
    try {
      // request access to the user's MetaMask account
      const [address] = await provider.send('eth_requestAccounts');
      console.log(`Connected with address: ${address}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={connectWallet}>
      Connect to Wallet
    </button>
  );
}

export default ConnectButton;
