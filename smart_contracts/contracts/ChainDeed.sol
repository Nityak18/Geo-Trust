// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainDeed is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    
    struct Property {
        uint256 surveyNo;
        string location;
        uint256 valueINR;
        string aadhaarHash;
    }
    
    mapping(uint256 => Property) public properties;

    event PropertyMinted(uint256 indexed tokenId, address indexed owner, uint256 surveyNo);
    event PropertyTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor() ERC721("ChainDeed Registration", "DEED") Ownable(msg.sender) {}

    function registerProperty(
        address to, 
        string memory uri, 
        uint256 surveyNo,
        string memory location,
        uint256 valueINR,
        string memory aadhaarHash
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        properties[tokenId] = Property({
            surveyNo: surveyNo,
            location: location,
            valueINR: valueINR,
            aadhaarHash: aadhaarHash
        });

        emit PropertyMinted(tokenId, to, surveyNo);
        return tokenId;
    }

    function transferPropertyOwnership(
        address from, 
        address to, 
        uint256 tokenId, 
        uint256 newValueINR,
        string memory newAadhaarHash
    ) public {
        // Enforce transfer rights
        address owner = ownerOf(tokenId);
        require(owner == from, "From address is not owner");
        require(msg.sender == owner || getApproved(tokenId) == msg.sender || isApprovedForAll(owner, msg.sender), "Not authorized to transfer");
        
        // Transfer ERC721 token
        _transfer(from, to, tokenId);
        
        // Update property details off-chain verification equivalent
        properties[tokenId].valueINR = newValueINR;
        properties[tokenId].aadhaarHash = newAadhaarHash;
        
        emit PropertyTransferred(tokenId, from, to);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
