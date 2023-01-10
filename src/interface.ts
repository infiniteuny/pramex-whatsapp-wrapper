import { WASocket } from '@adiwajshing/baileys'

interface Properties {
    command: string,
    fromMe: boolean,
    isGroup: boolean,
    fromJid: string,
    remoteJid: string
    groupJid?: string | null,
    textMessage?: string | null
    message: any,
    [key: string]: any
}

interface CommandOptions {
    title?: string,
    description?: string,
    hideFromHelp?: boolean,
    disabled?: boolean
}

type Middleware = (sock: WASocket, properties: Properties, next?: Middleware) => void

export {
    Properties,
    CommandOptions,
    Middleware,
}
