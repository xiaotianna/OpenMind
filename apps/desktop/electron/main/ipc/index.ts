import { registerWindowHandlers } from './window'

type IpcHandler = () => void

const handlers: IpcHandler[] = [registerWindowHandlers]

export function registerAllIpcHandlers(): void {
  for (const handler of handlers) {
    handler()
  }
}
