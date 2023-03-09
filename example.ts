import { startSock, handler, App } from './src'
import {quoteReplyWithTyping, sendMessageWithTyping} from "./src/utils";

// Create a module
const appDefault = new App('default')

// Create a command and the handler
appDefault.set(
    'test',
    {
        title: 'test',
        description: 'this is a test',
        hideFromHelp: false,
        disabled: false
    },
    async (sock, props) => {
        // Write your code here
        let text = 'reply test'
        
        // Refer to https://github.com/adiwajshing/Baileys how to use the sock
        await quoteReplyWithTyping(sock, props, { text })
    }
)

// Set the handler to use the module created
handler.use(appDefault)

// Start sock and pass the handleSock from handler
const sock = startSock(handler.handleSock)
