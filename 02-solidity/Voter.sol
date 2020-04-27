//this contract was copiled and runed in remix.ehtereum.org
pragma solidity  >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract Voter {

    //this attributes will be recorded automaticaly on blockchain
    uint[] public votes;
    string[] public options;

    constructor(string[] memory _options) public {
        options = _options;
        //votes = options;
    }

    function vote(uint option) public{
        //we need to validate our received option
        require(0 <= option && option < options.length, "Invalid Option");
        votes[option] = votes[option] + 1;
    }

    //view to do a call, so we don't spent gas
    function getOptions() public view returns (string[] memory) {
        return options;
    }

    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
}