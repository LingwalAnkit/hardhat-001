// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "XCoin";
    string public symbol = "XCO";
    uint256 public totalSupply = 1000;

    address public owner;
    mapping(address => uint256) public balance;

    constructor() {
        owner = msg.sender;
        balance[owner] = totalSupply; // Assign initial supply to the owner
    }

    function mint(uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint");
        balance[owner] += amount;
        totalSupply += amount;
    }

    function mintTo(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint tokens for others");
        balance[to] += amount;
        totalSupply += amount; 
    }

    function transfer(address to, uint256 amount) external {
        console.log("**sender balance is %s tokens", balance[msg.sender]);
        console.log("**sender is sending %s amount of tokens to %s address", amount, to);
        require(balance[msg.sender] >= amount, "Insufficient balance");
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }

    function transferFromSelf(address from, address to, uint256 amount) public {
        require(msg.sender == from, "You can only transfer from your own account");
        require(balance[from] >= amount, "Not enough balance to transfer");
        balance[from] -= amount;
        balance[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balance[account];
    }
}
