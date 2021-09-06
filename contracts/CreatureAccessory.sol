// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155Tradable.sol";

/**
 * @title CreatureAccessory
 * CreatureAccessory - a contract for Creature Accessory semi-fungible tokens.
 */

/**
For OpenSea to pull in off-chain metadata for ERC721 and ERC1155 assets, 
your contract will need to return a URI where we can find the metadata. 
To find this URI, we use the tokenURI method in ERC721 and the uri method in ERC1155. 
The tokenURI function in your ERC721 or the uri function in your ERC1155 contract should return an HTTP or IPFS URL, 
such as https://opensea-creatures-api.herokuapp.com/api/creature/3
*/
contract CreatureAccessory is ERC1155Tradable {
    constructor(address _proxyRegistryAddress)
        ERC1155Tradable(
            "OpenSea Creature Accessory",
            "OSCA",
            "https://creatures-api.opensea.io/api/accessory/{id}",
            _proxyRegistryAddress
        ) {}

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-erc1155";
    }
}
