var Con = artifacts.require("./Contest.sol");

contract("Con", function(accounts){
	
	//to check if getting initializes correctly
	it("initializes with two contestants", function() {
	 return Con.deployed().then(function(instance) {
		return instance.contestantsCount();
	}).then(function(count) {
		assert.equal(count, 2);
	});
  });
});
