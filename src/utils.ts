import {AnyMessageContent, delay, MiscMessageGenerationOptions} from "@adiwajshing/baileys";
import {Properties} from "./interface";

function parseTextMessage (msg) {
    return msg.conversation ||
        msg.extendedTextMessage?.text ||
        msg.imageMessage?.caption ||
        msg.videoMessage?.caption
}

function findCommand (COMMANDS, command: string) {
    return COMMANDS[command]
}

async function sendMessageWithTyping (sock, jid: string, content: AnyMessageContent, options?: MiscMessageGenerationOptions) {
    await sock.presenceSubscribe(jid)
    await delay(500)

    await sock.sendPresenceUpdate("composing", jid)
    await delay(2000)

    await sock.sendPresenceUpdate("paused", jid)

    await sock.sendMessage(jid, content, options)
}

async function quoteReply(sock, props: Properties, content: AnyMessageContent, options?: MiscMessageGenerationOptions) {
    await sock.sendMessage(props.remoteJid, content, { quoted: props.msg, ...options })
}

async function quoteReplyWithTyping(sock, props: Properties, content: AnyMessageContent, options?: MiscMessageGenerationOptions) {
    await sendMessageWithTyping(sock, props.remoteJid, content, { quoted: props.msg,...options })
}

export {
    parseTextMessage,
    findCommand,
    sendMessageWithTyping,
    quoteReply,
    quoteReplyWithTyping,
}