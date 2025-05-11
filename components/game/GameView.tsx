import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { BaseGame } from '@/models/Game.ts';
import { Turn } from '@/types/turn.ts';
import { v4 as uuid } from 'uuid';

type GameViewProps = {
  playerIds: string[];
  onGameEnd: (game: BaseGame) => void;
}

const defaultStats: Pick<Turn, 'makes', 'misses'> = {
  makes: 0,
  misses: 0,
}

export default function GameView({playerIds, onGameEnd}: GameViewProps) {
  const [game, setGame] = useState<BaseGame>(new BaseGame(playerIds));
  const [currPId, setCurrPId] = useState(game.currPlayerId);
  const [currTurn, setCurrTurn] = useState<Turn>({
    id: uuid(),
    playerId: currPId,
    makes: 0,
    misses: 0,
  });
  const [totalBallsMade, setTotalBallsMade] = useState(0);

  const updateTurn = (pId: string) => {
    setCurrTurn({
      id: uuid(),
      playerId: pId,
      ...defaultStats
    })
  }

  const onEndTurn = () => {
    game.turns = [...game.turns, currTurn]; // add turn to game
    game.updateCurrentPlayer(); // next player turn
    setCurrPId(game.currPlayerId);  // update current player in local state
    updateTurn(game.currPlayerId);  // initialize next turn and update local state
    setTotalBallsMade(game.playerMakes);
  }

  const onUpdateStats = (update: Partial<Pick<Turn, 'makes', 'misses'>>) => {
    setCurrTurn({
      ...currTurn,
      makes: currTurn.makes + (update.makes ?? 0),
      misses: currTurn.misses + (update.misses ?? 0),
    });
  }

  const endGame = () => {
    onGameEnd(game);
  }

  const mainView = 
    <View style={styles.viewStyle}>
     <Text style={styles.header}>Player: {currPId}</Text>
     <Text style={styles.header}>Total Balls Made: {totalBallsMade}</Text>
     <Text style={styles.header}>Makes: {currTurn.makes}</Text>
     <Button title="Make" onPress={() => onUpdateStats({makes: 1})} />
     <Text style={styles.header}>Misses: {currTurn.misses}</Text>
     <Button title="Miss" onPress={() => onUpdateStats({misses: 1})} />
     <Button title="End Turn" onPress={onEndTurn} />
     <Button title="End Game" onPress={endGame} />
    </View>

  return (
    <View style={styles.viewStyle}>
      {mainView}
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  }
});
