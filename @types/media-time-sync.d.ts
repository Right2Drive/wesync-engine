declare module 'media-time-sync' {
  interface MediaTimeSync {
    new (id: string, element: HTMLElement): Instance
  }

  interface Instance {
    on<D> (event: 'message', cb: (id: string, message: D) => void): void
    receive<D> (id: string, message: D): void
    play (): void
    pause (): void
    seek (time: number): void
    now (): number
  }

  const Constructor: MediaTimeSync

  export default Constructor
}
