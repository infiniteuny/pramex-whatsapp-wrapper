function parseTextMessage (msg) {
    return msg.conversation ||
        msg.extendedTextMessage?.text ||
        msg.imageMessage?.caption ||
        msg.videoMessage?.caption
}

function findCommand (COMMANDS, command: string) {
    return COMMANDS[command]
}

export {
    parseTextMessage,
    findCommand,
}