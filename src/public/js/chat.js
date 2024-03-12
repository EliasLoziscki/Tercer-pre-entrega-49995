const socket = io();

let email;

Swal.fire({
    title: "Identifícate",
    input: "email",
    text: "Ingresa tu correo electrónico.",
    inputValidator: (value) => {
        return !value && "Es obligatorio un correo electrónico.";
    },
    allowOutsideClick: false,
}).then((result)=>{
    email = result.value;
    socket.emit("new-user", email);
    console.log("email: ", email);
    const usernameDisplay = document.getElementById('user-email-display');
    usernameDisplay.textContent = "Bienvenido " + email;
})

const chatInput = document.getElementById("chat-input");

chatInput.addEventListener("keyup", (ev) => {
    if(ev.key === "Enter"){
        const inputMessage = chatInput.value;
        if(inputMessage.trim().length > 0){
            socket.emit("chat-message", {email, message: inputMessage});
            chatInput.value = "";
            console.log("inputMessage: ", inputMessage);
        }
    }
})

const messagesPanel = document.getElementById("messages-panel");

let messages = [];

socket.on("messages", (data) => {
    messages = data.slice(-100).reverse().map(m => {
        const timestamp = new Date(m.timestamp);
        const timestampString = isNaN(timestamp.getTime()) ? "Invalid Date" : timestamp.toLocaleString();
        return `<b>${m.email}:</b>${m.message} <i>${timestampString}</i></br>`;
    });
    messagesPanel.innerHTML = messages.join(''); // Actualiza el panel de mensajes con todos los mensajes
});

socket.on("new-message", (m) => {
    const timestamp = new Date(m.timestamp);
    const timestampString = isNaN(timestamp.getTime()) ? "Invalid Date" : timestamp.toLocaleString();
    messages = [`<b>${m.email}:</b>${m.message} <i>${timestampString}</i></br>`, ...messages];
    messagesPanel.innerHTML = messages.join(''); // Actualiza el panel de mensajes con el nuevo mensaje
});

socket.on("new-user",(email)=>{
    Swal.fire({
        title: `${email} se ha unido al chat`,
        toast: true,
        position:"top-end"
    })
})