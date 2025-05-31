export interface Turn {
  id: string;
  //timeStart: number;
  playerId: string;
  //makes: number;
  //misses: boolean;
  shots: Shot[];
}

export enum ShotType {
  Make,
  Miss,
  EndGame,
}

export type Shot = {
  name: string,
  count: number,
  type: ShotType,
  cb?: () => void,
};
