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


    database.ref('/chatThings').on('value',function(snapshot){
      chatStuff=snapshot.val().chatStuff;
      $('#text-box').html(snapshot.val().chatStuff)
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });



