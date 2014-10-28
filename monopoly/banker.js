var Player = function (name,balance){
  this.name = name;
  this.balance = balance;
}

var player1 = new Player ("German",1000);
var player2 = new Player ("Rocio", 1000);
var bank = new Player ("Bank", 10000000);

var getPlayer = function (name){
  var player = null;
  if (name=="German"){
    player = player1;
  }
  else if(name=="Rocio"){
    player = player2;
  }
  else if(name=="Bank"){
    player = bank;
  }  
  return player;
}
var transfer = function (amount,to,from){
  //cambia dinero de un player a otro
  //... ya esta bien escrito
  var fromPlayer = getPlayer(from);
  fromPlayer.balance-=amount;
  var toPlayer = getPlayer(to);
  toPlayer.balance+=amount;
  addHistory(from + " transfers " + amount + " to " + to);
}

// transfer (100,"Rocio","German");
// German le transfiere a Rocio $100

var addPlayerBalance = function(player){
  var $elem = $("<tr>");
  var $name = $("<td>").text(player.name);
  var $balance = $("<td>").text(player.balance);
  var $go = $("<td>");
  var $goButton= $("<button>").text("Go!").addClass("btn btn-default");
  $goButton.click(function(){
    console.log(player.name);
    transfer(200, player.name, "Bank");
    updateBalances();
  });
  $go.append($goButton);
  $elem.append($name);
  $elem.append($balance);
  $elem.append($go);
  $("#balances tbody").append($elem);
}

var updateBalances = function(){
  var $table = $("#balances");
  $("tbody", $table).empty();
  addPlayerBalance(player1);
  addPlayerBalance(player2);
  addPlayerBalance(bank);
}

var resetInput = function(){
  $("#amount").val(0)
}

var addHistory=function(transaction){
  $("<li>").text(transaction).prependTo($("#history"));
}

$(function(){
  resetInput();
  updateBalances();
  $("#pay").click(function(){
    var fromName = $("#from").val();
    var toName = $("#to").val();
    var amount = parseInt($("#amount").val());
    transfer(amount,toName,fromName);
    updateBalances();
    resetInput();
  });
  $("button.add").click(function(){
    $("#amount").val(parseInt($("#amount").val())+parseInt($(this).data("amount")));
  });
  $("button.substract").click(function(){
    $("#amount").val(parseInt($("#amount").val())-parseInt($(this).data("amount")));
    if(parseInt($("#amount").val())<0){ resetInput(); }
  });
  $("button.reset").click(function(){
    resetInput();
  });
});