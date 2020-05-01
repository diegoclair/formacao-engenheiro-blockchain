//this contract was copiled and runed in remix.ehtereum.org
pragma solidity  >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract Voter {

    struct OptionPos {
        uint position;
        bool exists;
    }
    
    //this attributes will be recorded automaticaly on blockchain
    uint[] public votes;
    string[] public options;                //Example options: ["EUA","CUBA","BRAZIL"]
    mapping (address => bool) hasVoted;     //here we do not record the vote, only if this account has voted
    mapping (string => OptionPos) posOfOption;
    
    constructor(string[] memory _options) public {
        options = _options;
        votes.length = options.length;
        
        //create the list of posisiton for each option
        for (uint i = 0; i < options.length; i++) {
            OptionPos memory option = OptionPos(i, true);
            posOfOption[options[i]] = option;
        }
    }

    function voteCode(uint option) public{
        //we need to validate our received option
        require(0 <= option && option < options.length, "Invalid Option");
        require(!hasVoted[msg.sender], "Sorry, this account has already voted.");
        
        votes[option] = votes[option] + 1;
        hasVoted[msg.sender] = true;
    }
    
    function voteName(string memory option) public {
        require(!hasVoted[msg.sender], "Sorry, this account has already voted.");
        OptionPos memory optionPos = posOfOption[option];
        require(!optionPos.exists, "Option does not exist");
        
        votes[optionPos.position] = votes[optionPos.position] + 1;
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