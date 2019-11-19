pragma solidity 0.5.8;

contract Contest{

	struct Contestant{
		uint id;
		string name;
		uint voteCount;
	}

	//use mapping to get or fetch the contestant details
	mapping(uint => Contestant) public contestants;
	
	//add a public state variable to keep track of contestant count
	uint public contestantsCount;

	constructor() public{

		addContestant("Tom");
		addContestant("Jerry");
	}

	//add function to add Contestant

	function addContestant(string memory _name) private{
		contestantsCount ++;
		contestants[contestantsCount] = Contestant(contestantsCount, _name, 0); 
	}

}