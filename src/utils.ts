import { Opts, HostOpts } from '.'

function getContainer (selector: string) {
  return document.querySelector(selector)
}

function validateOpts (opts: Opts) {
  if (typeof opts !== 'object') {
    throw new Error('opts must be an object')
  }

  const { selector } = opts
  if (typeof selector !== 'string') {
    throw new Error('\'selector\' is a required opt, and must be of type string')
  }
  if (isHostOpts(opts)) {
    const { file } = opts
    if (typeof file !== 'string' && !(file instanceof Buffer)) {
      throw new Error(`file should be a magnet link or buffer`)
    }
  }
}

function isHostOpts (opts: Opts): opts is HostOpts {
  return typeof (opts as any).file !== 'undefined'
}

function sendMessage<D> (socket: WebSocket, payload: D) {
  const message = JSON.stringify({
    __wesync_payload__: payload,
  })
  socket.send(message)
}

function onMessage<D> (socket: WebSocket, cb: (payload: D) => void) {
  socket.addEventListener('message', (event) => {
    const { data } = event
    if (typeof data !== 'string') return
    try {
      const message = JSON.parse(data)
      if (typeof message.__wesync_payload__ === 'undefined') return
      return void cb(message.__wesync_payload__)
    } catch { return }
  })
}

export {
  getContainer,
  validateOpts,
  isHostOpts,
  sendMessage,
  onMessage,
}
