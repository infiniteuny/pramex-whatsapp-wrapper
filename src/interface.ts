import { WASocket } from '@adiwajshing/baileys'

export interface Properties {
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

export interface CommandOptions {
    title?: string,
    description?: string,
    hideFromHelp?: boolean,
    disabled?: boolean
}

export type Middleware = (sock: WASocket, properties: Properties, next?: Middleware) => void

