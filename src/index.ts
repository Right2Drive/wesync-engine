/*
 * TODO: How to handle user needing access to video? Fullscreen etc
 * TODO: Container vs Video element API
 */
interface Opts {
  selector: string
}

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
  console.log('play')
}

async function pause () {
  console.log('pause')
}

async function seek (time: number) {
  console.log(`seek ${time}`)
}

function wesync ({ selector }: Opts): Engine {
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
  }

  return {
    addListener: addListener.bind(state),
    play,
    pause,
    seek,
  }
}

export { Opts }

export default wesync
