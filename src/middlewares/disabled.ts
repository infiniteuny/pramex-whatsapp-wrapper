import { Middleware } from "../interface";

const disabledMiddleware: Middleware = async (sock, props, next) => {
    await sock.sendMessage(props.remoteJid, { text: `Maaf, command ${props.command} sedang tidak tersedia.` })
}

export default disabledMiddleware