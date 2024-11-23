const chat = document.getElementById('chat');
const messagesForm = document.getElementById('messagesForm');
const inputMessages = document.getElementById('inputMessages');

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = (event) => {
    console.log('Соединение успешно');
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const messageElement = document.createElement('div');

    if (message.type === 'system') {
        messageElement.classList.add('systemMessages');
    }

    messageElement.textContent = message.content;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight;
}

messagesForm.onsubmit = (event) => {
    event.preventDefault();
    if (inputMessages.value) {
        const message = {
            type: 'user',
            content: inputMessages.value
        };
        socket.send(JSON.stringify(message));
        inputMessages.value = '';
    };
}