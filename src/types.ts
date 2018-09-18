interface Opts {
  selector: string
}

type Event
  = 'play'
  | 'pause'
  | 'seek'

type PlayCallback = () => void
type PauseCallback = () => void
type SeekCallback = (time: number) => void
type Callback
  = PlayCallback
  | PauseCallback
  | SeekCallback

type AddPlayListener = (event: 'play', callback: PlayCallback) => string
type AddPauseListener = (event: 'pause', callback: PauseCallback) => string
type AddSeekListener = (event: 'seek', callback: SeekCallback) => string
type AddListener
  = AddPlayListener
  | AddPauseListener
  | AddSeekListener

interface Engine {
  addListener: AddListener
}

export {
  Opts,
  Event,
  PlayCallback,
  PauseCallback,
  SeekCallback,
  Callback,
  AddPlayListener,
  AddPauseListener,
  AddSeekListener,
  AddListener,
  Engine,
}
