const socket=io('./api/index.js');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');
let Name=prompt('Enter your name to join');
if(Name==null) Name='Anonymous';
var audio=new Audio('ting.mp3');

const Append=(name,message,position)=>{
    const msgElement=document.createElement('div');
    if(position=='middle') msgElement.innerText=name+' '+message;
    else msgElement.innerHTML='<strong>'+name+': </strong>'+message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageContainer.append(msgElement);
    if(position!='right') audio.play();
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=messageInput.value;
    Append('You',msg,'right');
    socket.emit('send',msg);
    messageInput.value='';
})
socket.emit('new-user-joined',Name);
socket.on('user-joined',name=>{
    Append(name,'joined the chat','middle');
});
socket.on('receive',data=>{
    Append(data.name,data.message,'left');
});
socket.on('leave',name=>{
    Append(name,'left the chat','middle');
});