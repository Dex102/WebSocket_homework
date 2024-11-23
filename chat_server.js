const WebSocket = require('ws');

const webSocket = new WebSocket.Server({port:8080});

webSocket.on('connection', (ws) => {
    console.log('Новое соединение установлено');
    ws.send(JSON.stringify({
        type: 'system',
        content: 'Добро пожаловать в чат!'
    }));

    ws.on('message', (message) => {
        let parseMessage;

        try {
            parseMessage = JSON.parse(message);
        }
        catch {
            console.log('Произошла ошибка при обработке сообщений: ' + message);
            return;
        }

        webSocket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parseMessage));
            }
        })
    })
});

console.log('Сервер запущен на 8080 порту');