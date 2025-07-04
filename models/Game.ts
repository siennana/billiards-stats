import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/firebase.ts'; // Import your initialized app instance
import { Turn } from '@/types/turn.ts';
import { v4 as uuid } from 'uuid';

const db = getFirestore(app); // Get the Firestore service instance

export class BaseGame {
  private id: string;
  public playerIds: string[];
  public currPlayerId: string;
  private timeStart: number = 0;
  private timeEnd: number = 0;
  public turns: Turn[] = [];
  public currentTurn: Turn;
  public playerStats: Record<string, Record<string, number>>;
  private intervalId: NodeJS.Timeout | null = null;
  onElapsedChange?: (ms: number, formatted: string) => void

  constructor(playerIds: string[]) {
    this.id = uuid();
    this.playerIds = playerIds;
    this.currPlayerId = playerIds[0];
    this.currentTurn = {
      id: uuid(),
      playerId: playerIds[0],
      shots: [],
    };
    this.playerStats = this.playerIds.reduce((acc, id) => {
      acc[id] = {};
      return acc;
    }, {});
  }

  get elapsedTime(): number {
    return this.timeEnd - this.timeStart;
  }

  formattedTime(): string {
    return `${this.elapsedTime}`;
  }

  get playerMakes(): number {
    return this.turns
      .filter(turn => turn.playerId === this.currPlayerId)
      .reduce((sum, turn) => sum + turn.makes, 0);
  }

  updatePlayerStats(playerId: string) {
    const summary = {};
    this.turns
      .filter(turn => turn.playerId === playerId)
      .forEach(turn => {
        turn.shots.forEach(shot => {
          if (!summary[shot.name]) {
            summary[shot.name] = {
              totalCount: 0,
              type: shot.type,
            };
          }

          summary[shot.name].totalCount += shot.count;
        });
      });
    
    this.playerStats[playerId] = summary;
  }

  updateCurrentPlayer() {
    const currIndex = this.playerIds.indexOf(this.currPlayerId);
    const nextIndex = (currIndex + 1) % this.playerIds.length;
    this.currPlayerId = this.playerIds[nextIndex];
  }

  nextTurn() {
    this.updateCurrentPlayer();
    this.turns.push(this.currentTurn);
    this.currentTurn = {
      id: uuid(),
      playerId: this.currPlayerId,
      shots: [],
    }
  }

  endGame() {
    this.turns.push(this.currentTurn);
    this.playerIds.forEach((playerId) => this.updatePlayerStats(playerId));
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
      id: this.id,
      //timestamp: this.timeStart,
      //elapsedTime: this.elapsedTime,
      turns: this.turns,
    }
  }

  async save(): Promise<string> {
    try {
      console.log(db);
      const collectionsRef = collection(db, 'games');
      const docRef = await addDoc(
        collectionsRef,
        this.toJSON(),
      );
      console.log(docRef.id);
      return docRef.id;
    } catch(error: any) {
      console.log(error);
    }
  }

}

export class CustomGame extends BaseGame {
  constructor() {
    //TODO
  }
}

