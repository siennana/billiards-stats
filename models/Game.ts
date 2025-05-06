export class BaseGame {
  private gameId: number;
  public shotsMissed: number;
  private timeStart: number = 0;
  private timeEnd: number = 0;
  private intervalId: NodeJS.Timeout | null = null;
  onElapsedChange?: (ms: number, formatted: string) => void

  constructor() {
    this.gameId = 'temp_id';
    this.shotsMissed = 0;
    this.timeStart = Date.now();
    this.timeEnd = Date.now();
  }

  get elapsedTime(): number {
    return this.timeEnd - this.timeStart;
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.elapsedTime / 60000);
    const seconds = Math.floor((this.elapsedTime / 60000) / 1000);
    const milliseconds = this.elapsedTime % 1000;
    const pad = (n: number, width: number) => String(n).padStart(width, "0");
    return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
  }

  startTimer() {
    this.timeStart = Date.now();
    this.endime = this.startTime;
    if (this.intervalId) return
    this.intervalId = setInterval(() => {
      this.timeEnd = Date.now();
      this.onElapsedChange?.(this.elapsedTime, this.formattedTime)
    }, 100);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

}

export class CustomGame extends BaseGame {
  constructor() {
    //TODO
  }
}

