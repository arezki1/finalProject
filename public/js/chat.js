$(function(){
   	//make connection
	var socket = io.connect('/')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
	var list=$("#list")
	
	
	

	
	
	
	

	var real=document.getElementById("change_username").getAttribute("data-value"); 
	
	
	

	//Emit message
	send_message.click(function(){
		
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
	   // data.username=real;
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

socket.on('userCount', function (data) {
  
  list.append("<p class='message'>" + data.userCount + "</p>")
  console.log(data.userCount);
});
	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	});
		socket.on('disconnect', (data) => {
		chatroom.append("<p><i>" + data.username + " is disconnected" + "</i></p>")
	})
});
