import * as WebTorrent from 'webtorrent'

/** Type of supported files */
type WeSyncFile = string | File | Buffer | NodeJS.ReadableStream

/**
 * WeSync Engine
 *
 * Responsible for managing the playback of
 */
export default class WeSyncEngine {
  private _playing: boolean
  private _client: WebTorrent.Instance

  public constructor (file: WeSyncFile) {
    this._client = new WebTorrent()
    this._playing = false
  }

  public get paused () {
    return !this._playing
  }

  public get playing () {
    return this._playing
  }

  public seek () {
    // TODO: Implement
  }

  public pause () {
    // TODO: Implement
  }

  public play () {
    // TODO: Implement
  }

  /**
   * Swap out the current video file w/ a new video file
   */
  public swap () {
    // Future Feature
  }
}
