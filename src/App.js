import React from 'react';
import ChatRoom from './ChatRoom';
import { MetaMaskProvider } from './MetaMaskContext';
import './App.css';

function App() {
  return (
    <MetaMaskProvider>
    <div className="App">
      <ChatRoom />
    </div>
    </MetaMaskProvider>
  );
}

export default App; // Ensure you're exporting App component here
