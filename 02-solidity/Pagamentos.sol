//Curso programação para blockchain modulo 10, ultima aula

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Payments {

    uint minApprovers;

    address payable beneficiary;
    address payable owner;

    mapping (address => bool) approvedBy;
    mapping (address => bool) isApprover;
    uint approvalsNum;

    constructor(address[] memory _approvers, uint _minApprovers, address payable _beneficiary) public payable {
        require(_minApprovers <= _approvers.length, "O número necessário de aprovadores deve ser menor que o número de aprovadores");

        minApprovers = _minApprovers;
        beneficiary = _beneficiary;
        owner = msg.sender;

        for (uint i = 0; i < _approvers.length; i++) {
            address approver = _approvers[i];
            isApprover[approver] = true;
        }
    }

    function approve() public {
        require(isApprover[msg.sender], "Não é um aprovador");
        if (!approvedBy[msg.sender]) {
            approvedBy[msg.sender] = true;
            approvalsNum++;
        }

        if (approvalsNum == minApprovers) {
            beneficiary.transfer(address(this).balance);
            selfdestruct(owner);
        }
    }

    function reject() public {
        require(isApprover[msg.sender], "Não é um aprovador");

        selfdestruct(owner);
    }
}