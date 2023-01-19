import { CommandOptions, Middleware } from "./interface"

interface TempCommand {
    command: string,
    properties: CommandOptions,
    middlewares: Middleware[],
}

export class App {
    private commands: TempCommand[] = []
    module: string

    constructor (module: string) {
        this.module = module
    }

    set (command: string, properties: CommandOptions, ...middlewares: Middleware[]) {
        this.commands.push({
            command,
            properties,
            middlewares
        })
    }

    getCommands () {
        return this.commands
    }
}