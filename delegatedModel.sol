// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DelegatedSend{

    /*
     *  Events
    */
    event TransferCompleted(address _from, address _destAddr, uint _amount);

    /*
     *  Storage
    */

    uint256 public compPrice = 10000000000000000;
    address public miner = 0xa433DF2B35F1cCA7a42a4842847205560999e7d4;

    // Constructor.
    constructor() {// 1e16 = 0.01 matic
    }

    function changeComputationPrice(uint256 _newPrice) external{
        compPrice = _newPrice;
    }

    function changeMinerAddress(address _newMiner) external{
        miner = _newMiner;
    }

    function transferToMiner() external payable{
        
        // check if the contract has enough balance to send
        require(msg.sender.balance >= compPrice, "Not enough balance in contract to transfer");
        
        // transfer the amount
        (bool success, ) = miner.call{value: compPrice}("");
        require(success, "Failed to send Ether");
        
        // emit event
        emit TransferCompleted(msg.sender, miner, compPrice);

    }
}
