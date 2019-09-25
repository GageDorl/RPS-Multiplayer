var firebaseConfig = {
    apiKey: "AIzaSyAzhv1suQhGz6DgR5ojTxJQvTuDcGdZYJI",
    authDomain: "project-name-c5a50.firebaseapp.com",
    databaseURL: "https://project-name-c5a50.firebaseio.com",
    projectId: "project-name-c5a50",
    storageBucket: "",
    messagingSenderId: "974536353875",
    appId: "1:974536353875:web:914fc55c16d21f7fe33ea6"
  };
  
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var chatStuff;
var turn=1;
var player1;
var player1img;
var player2;
var player2img;
var rock = "<img src=assets\\images\\rock.png>";
var paper = "<img src=assets\\images\\paper.png>";
var scissors = "<img src=assets\\images\\scissors.png>"
var setStuff=false;


$(document).on('click','#submit',function(){
  chatStuff += '<span style=\'color:blue\'>'+$('#name').val()+': </span>'+$('#chat').val()+'<br>';
  database.ref('/chatThings').set({
    chatStuff:chatStuff
  });
});
$(document).on('click','#clear',function(){
  database.ref('/chatThings').set({
    chatStuff:'Messages:<br>'
  });
});
$(document).on('click', '.game', function(){
  
  if(turn==1){
    if($(this).attr('id')=='rock'){
      player1img=rock;
    }
    else if($(this).attr('id')=='paper'){
      player1img=paper;
    }
    else{
      player1img=scissors;
    }
    database.ref('/RPSGame').set({
      turn: turn+1,
      player1:$(this).attr('id'),
      player2:player2,
      thing:setStuff,
      player1img:player1img
      
    })
   
  }
  else if(turn==2){
    if($(this).attr('id')=='rock'){
      player2img=rock;
    }
    else if($(this).attr('id')=='paper'){
      player2img=paper;
    }
    else{
      player2img=scissors;
    }
    setStuff=true;
    database.ref('/RPSGame').set({
      turn:1,
      player2:$(this).attr('id'),
      player1:player1,
      thing:setStuff,
      player1img:player1img,
      player2img:player2img
    })
    
    console.log('this function');
    
    
   
  }
})
function choseWinner(){
  console.log('this again')
  $('#main-game').html("<div><p>Player 1's move:</p><br><div>"+player1img+"</div><div><p>Player 2's move:</p><br><div>"+player2img+"</div>");
  setTimeout(function(){
  
    $('#main-game').html("<p id=turn>Turn: Player 1</p><button id=rock class=game><img src=assets\\images\\rock.png></button><button id=paper class=game><img src=assets\\images\\paper.png></button><button id=scissors class=game><img src=assets\\images\\scissors.png></button>")
    }, 5000)
  }

function backToGame(){
  console.log('please')
}  

database.ref('/chatThings').on('value',function(snapshot){
  chatStuff=snapshot.val().chatStuff;
  $('#text-box').html(snapshot.val().chatStuff)
  $('#text-box').scrollTop(Math.pow($('#text-box').height(),2));
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
    

database.ref('/RPSGame').on('value', function(snapshot){
  turn=snapshot.val().turn;
  player1=snapshot.val().player1;
  player2=snapshot.val().player2;
  if(snapshot.val().thing!=undefined){
  setStuff=snapshot.val().thing;
  }
  if(snapshot.val().player1img!=undefined){
    player1img=snapshot.val().player1img
  }
  if(snapshot.val().player2img!=undefined){
    player2img=snapshot.val().player2img
  }
  if(turn==1){
    $('#turn').text('Turn: player 1')
  }
  else if(turn==2){
    $('#turn').text('Turn: player 2')
  }
  if(setStuff){
    choseWinner();
    setStuff=false;
  }
}, function(errorObject){
  console.log("The read failed: "+errorObject.code);
})
