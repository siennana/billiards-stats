import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase'; // Import your initialized app instance
import { Turn } from '../types/turn.ts';
import { v4 as uuid } from 'uuid';

const db = getFirestore(app); // Get the Firestore service instance
// Now you can use 'db' to read/write data


export class BaseGame {
  private id: string;
  public playerIds: string[];
  public currentPlayerId: string;
  public shotsMissed: number;
  private timeStart: number = 0;
  private timeEnd: number = 0;
  public turns: Turn[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  onElapsedChange?: (ms: number, formatted: string) => void

  constructor(playerIds: string[]) {
    this.id = uuid();
    this.shotsMissed = 0;
    this.playerIds = playerIds;
    this.currentPlayerId = playerIds[0];
  }

  get elapsedTime(): number {
    return this.timeEnd - this.timeStart;
  }

  get formattedTime(): string {
    return `${this.elapsedTime}`;
  }

  startTimer() {
    this.timeStart = Date.now();
    this.timeEnd = this.timeStart;
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

  toJSON() {
    return {
      gameId: this.id,
      timestamp: this.timeStart,
      elapsedTime: this.elapsedTime,
      shotsMissed: this.shotsMissed,
    }
  }

  async save(userId = 'test_user'): Promise<string> {
    console.log(db);
    const collectionsRef = collection(db, 'games');
    const docRef = await addDoc(
      collectionsRef,
      {
        test: 'test'
      }
    );
    console.log(docRef.id);
    return docRef.id;
  }

}

export class CustomGame extends BaseGame {
  constructor() {
    //TODO
  }
}

