var socket = io();
socket.on('connect',function(){
    console.log("Conected to the server");
    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup, that works for me.'
   });
});
socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});
socket.on('disconnect', function(){
    console.log('Disconnected from server');
});