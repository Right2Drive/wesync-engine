import * as WebTorrent from 'webtorrent'
import * as MediaTimeSync from 'media-time-sync'
import * as uiudv4 from 'uuid/v4'

import {
  validateOpts,
  isHostOpts,
  sendMessage,
  onMessage,
} from './utils'

interface BaseOpts {
  selector: string
  socket: WebSocket
}

interface HostOpts extends BaseOpts {
  file: File | string
}

interface ClientOpts extends BaseOpts {}

type Opts = HostOpts | ClientOpts

/* Types for callbacks */
type PlayCallback = () => void
type PauseCallback = () => void
type SeekCallback = (time: number) => void
type Callback
  = PlayCallback
  | PauseCallback
  | SeekCallback

interface Listeners {
  play: PlayCallback[]
  pause: PauseCallback[]
  seek: SeekCallback[]
}

interface Engine {
  addListener: typeof addListener
  play (): Promise<void>
  pause (): Promise<void>
  seek (time: number): Promise<void>
}

type Event
  = 'play'
  | 'pause'
  | 'seek'

interface State {
  listeners: Listeners
  selector: string
}

function addListener (this: State, event: 'play', callback: PlayCallback): void
function addListener (this: State, event: 'pause', callback: PauseCallback): void
function addListener (this: State, event: 'seek', callback: SeekCallback): void
function addListener (this: State, event: Event, callback: Callback) {
  this.listeners[event] = [...this.listeners[event], callback]
}

async function play () {
  sync.play()
}

async function pause () {
  sync.pause()
}

async function seek (time: number) {
  sync.seek(time)
}

async function wesync (opts: Opts): Promise<Engine> {
  validateOpts(opts)
  const { selector, socket } = opts

  // State is maintained as such to prevent outside access
  // This is not an API we guarantee will remain consistent,
  // and if we expose it in any way people will use it, which
  // will result in issues raised when said API changes
  const state: State = {
    listeners: {
      play: [],
      pause: [],
      seek: [],
    },
    selector,
    timeSync: undefined,
  }
  if (isHostOpts(opts)) {
    const client = new WebTorrent()

    const torrent = await new Promise<WebTorrent.Torrent>(resolve => {
      if (file instanceof File) {
        client.seed(file, torrent => resolve(torrent))
      } else {
        client.add(file, (torrent: WebTorrent.Torrent) => resolve(torrent))
      }
    })

    torrent.files[0].appendTo(getContainer(selector), (err, elem) => {
      const sync = new MediaTimeSync(uiudv4(), elem)

      sync.on('message', (id, message) => {
        sendMessage(socket, { id, message })
      })

      onMessage<any>(socket, ({ id, message }) => sync.receive(id, message))
    })
  }

  return {
    addListener: addListener.bind(state),
    play: play.bind(state),
    pause: pause.bind(state),
    seek: seek.bind(state),
  }
}

export { Opts, HostOpts, ClientOpts }

export default wesync
