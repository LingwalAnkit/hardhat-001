// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "XCoin";
    string public symbol = "XCO";
    uint public totalSupply = 1000;

    address public owner;
    mapping(address => uint) public balance;

    constructor() {
        owner = msg.sender;
        balance[owner] = totalSupply; // Assign initial supply to the owner
    }

    function mint(uint amount) public {
        require(msg.sender == owner, "Only owner can mint");
        balance[owner] += amount;
        totalSupply += amount;
    }

    function mintTo(address to, uint amount) public {
        require(msg.sender == owner, "Only owner can mint tokens for others");
        balance[to] += amount;
        totalSupply += amount; 
    }

    function transfer(address to, uint amount) external {
        require(balance[msg.sender] >= amount, "Insufficient balance");
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }

    function transferFromSelf(address from, address to, uint amount) public {
        require(msg.sender == from, "You can only transfer from your own account");
        require(balance[from] >= amount, "Not enough balance to transfer");
        balance[from] -= amount;
        balance[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balance[account];
    }
}
