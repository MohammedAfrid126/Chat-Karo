const socket = io("http://localhost:8000");

const form = document.getElementById("sendContainer");
const messageInp = document.getElementById("messageInp");
const messageCointainer = document.querySelector(".container");
const messageCointainerUser = document.querySelector(".contain");
let audio = new Audio("../music/Anya.mp3")

const append= (message, position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText =  message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageCointainer.append(messageElement);
    if (position == "left") {
        audio.play();
    }
}

const appendUser= (message, position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText =  message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageCointainerUser.append(messageElement);
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, "right");
    socket.emit("send-message", message);
    messageInp.value = "";
})

const name = prompt("Enter your Name to join the conversation");
socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    appendUser(`${name} joined the Chat`, "right")
})

socket.on("receive-message", data => {
    append(`${data.name}:${data.message}`, "left")
})

socket.on("left", name => {
    appendUser(`${name} left the chat`, "left")
})

