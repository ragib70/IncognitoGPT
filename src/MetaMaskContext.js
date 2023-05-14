import React, { createContext, useContext, useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3Provider } from '@ethersproject/providers';

const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      const ethereumProvider = await detectEthereumProvider();
      
      if (ethereumProvider) {
        const ethersProvider = new Web3Provider(ethereumProvider);
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();
        setProvider(ethersProvider);
        setSigner(signer);
        setAddress(address);
      } else {
        console.log('Please install MetaMask!');
      }
    };

    init();
  }, []);

  return (
    <MetaMaskContext.Provider value={{ provider, signer, address }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);
