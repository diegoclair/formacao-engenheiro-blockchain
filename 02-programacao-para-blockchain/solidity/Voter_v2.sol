//this contract was copiled and runed in remix.ehtereum.org
pragma solidity  >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract Voter {

    //this attributes will be recorded automaticaly on blockchain
    uint[] public votes;
    string[] public options;                //Example options: ["EUA","CUBA"]
    mapping (address => bool) hasVoted;     //here we do not record the vote, only if this account has voted

    constructor(string[] memory _options) public {
        options = _options;
        votes.length = options.length;
    }

    function vote(uint option) public{
        //we need to validate our received option
        require(0 <= option && option < options.length, "Invalid Option");
        require(!hasVoted[msg.sender], "Sorry, this account has already voted.");

        votes[option] = votes[option] + 1;
        hasVoted[msg.sender] = true;
    }

    //view to do a call, so we don't spent gas
    function getOptions() public view returns (string[] memory) {
        return options;
    }

    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
}