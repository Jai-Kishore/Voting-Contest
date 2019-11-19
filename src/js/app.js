App = {
  web3Provider: null,
  contracts: {},
  account: 0x0 ,
  init: async function() {
    
    return await App.initWeb3();
  },

  initWeb3: async function() {
   
   if(typeof web3 !== 'undefined'){
    //If web3 instance already provide by Metamask.
    App.web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider); 
   }
   else{
    //Specify default instance if no web3 instance provided.
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(App.web3Provider);
   }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Contest.json", function(contest){
      //Instantiate a new truffle contract from the artifact
      App.contracts.Contest = TruffleContract(contest);
      //Connect provider to interact with provider
      App.contracts.Contest.setProvider(App.web3Provider);
   

    return App.render();
     });
  },

  render: function(){

    var contestInstance;
    var loader  = $("#loader");
    var content = $("#content");
    
    loader.show();
    content.hide();

    //Load the account data
    web3.eth.getCoinbase(function(err, account){
      if(err == null){
        App.account = account;
        $("#accountAddress").html("Your account : " + account);
      }
    });

    //Load contract data
    App.contracts.Contest.deployed().then(function(instance) {
      contestInstance = instance;
      return contestInstance.contestantsCount();
    }).then(function(contestantsCount){
        var contestantsResults = $("#contestantResults");
        contestantsResults.empty();

        for (var i = 1; i <= contestantsCount; i++){
          contestInstance.contestants(i).then(function(contestant) {
            var id = contestant[0];
            var name = contestant[1];
            var voteCount = contestant[2];

            //Render the Contestant Result
            var contestantTemplate = "<tr><th>"+id"</th><td>"+name"</td><td>"+voteCount"</td></tr>"
            contestantsResults.append(contestantTemplate);
          });
        }
          loader.hide();
          content.show();
      }).catch(function(error){
        console.warn(error);

    });

  }

};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
