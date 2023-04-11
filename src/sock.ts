import {Boom} from '@hapi/boom'
import makeWASocket, {
    DisconnectReason,
    makeInMemoryStore,
    useMultiFileAuthState,
} from '@adiwajshing/baileys'
import logger from "./logger";
import {UserFacingSocketConfig} from "@adiwajshing/baileys/lib/Types";

let saveInterval: NodeJS.Timeout
let state, saveState
let store
async function defaultAuthInit() {
    // the store maintains the data of the WA connection in memory
    // can be written out to a file & read from it
    store = makeInMemoryStore({logger: logger.child({level: 'debug', stream: 'store'})})
    store.readFromFile('./credential/baileys_store_multi.json')
    // save every 10s
    saveInterval = setInterval(() => {
        store.writeToFile('./credential/baileys_store_multi.json')

    }, 10_000)
    const {state: _state, saveCreds: _saveState} = await useMultiFileAuthState('./credential/auth_info_multi.json')
    state = _state
    saveState = _saveState
}

// start a connection
export const startSock = async (handler: Function, config?: UserFacingSocketConfig) => {
    if (!config && !saveInterval) {
        await defaultAuthInit()
        config = {
            logger: logger,
            printQRInTerminal: true,
            auth: state,
            // implement to handle retries
            // getMessage: async key => {
            //     return {
            //         conversation: 'hello'
            //     }
            // }
        }
    }
    const sock = makeWASocket(config)

    store.bind(sock.ev)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            logger.error('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                startSock(handler, config)
            }
        } else if(connection === 'open') {
            logger.info('opened connection')
        }

        logger.info('connection update', update)
    })

    // listen for when the auth credentials is updated
    sock.ev.on('creds.update', saveState)

    handler(sock)

    return sock
}