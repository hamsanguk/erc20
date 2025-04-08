// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {// explo/Token Info: MyToken,(MTK)
        _mint(msg.sender, 1000000 * 10 ** decimals());// value: 10^24 1000ether
    }
}
