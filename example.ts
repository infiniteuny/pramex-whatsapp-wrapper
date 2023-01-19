import { startSock, handler, App } from './src'

const appDefault = new App('default')

appDefault.set(
    'test',
    {
        title: 'test',
        description: 'this is a test',
        hideFromHelp: false,
        disabled: false
    },
    (s, props) => {
        let text = 'reply test'
        s.sendMessage(props.remoteJid, { text })
    }
)

handler.use(appDefault)
const sock = startSock(handler.handleSock)