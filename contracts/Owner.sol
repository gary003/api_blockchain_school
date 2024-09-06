pragma solidity ^0.8.11;

// SPDX-License-Identifier: MIT

contract Owner {
  address owner;

  constructor() {
    owner = msg.sender;
  }

  modifier isOwner {
    require(msg.sender == owner, "You need to be the owner of the contract for that action");
    _;
  }
}