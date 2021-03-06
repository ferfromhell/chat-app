var socket = io();
function scrollToBottom () {
    //selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        //console.log("Should scroll");
        messages.scrollTop(scrollHeight);
     }
  }

socket.on('connect',function(){
    console.log("Conected to the server");
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No error');
        }
    });
});
socket.on('disconnect', function(){
    console.log('Disconnected from server');
});
socket.on('updateUserList', function(users){
    var ol = $('<ol></ol>');
    console.log('update', users);
    users.forEach(function (user) {
        console.log('user',user);
        ol.append($('<li></li>').text(user));
      });
    $('#users').html(ol);
});
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});
socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    // var li= $('<li></li>');
    // var a = $('<a target="_blank"> My current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    $('#messages').append(html);
    scrollToBottom();
});

//Jquery
$("#message-form").on('submit',function(e){
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage',{
        from: "User",
        text: messageTextBox.val()
    },function(){
        messageTextBox.val('');
    });
});
var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});