import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BaseGame } from '@/models/Game.ts';
import { Turn, ShotType } from '@/types/turn.ts';
import { v4 as uuid } from 'uuid';
import { defaultStats } from '@/constants/defaults/game.ts';

type GameViewProps = {
  playerIds: string[];
  onGameEnd: (game: BaseGame) => void;
}

const _defaultStats: Pick<Turn, 'makes', 'misses'> = {
  makes: 0,
  misses: 0,
}

export default function GameView(props: GameViewProps) {
  const [game, setGame] = useState<BaseGame>(new BaseGame(props.playerIds));
  const [currPId, setCurrPId] = useState(game.currPlayerId);
  const [currTurn, setCurrTurn] = useState<Turn>({
    id: uuid(),
    playerId: currPId,
    makes: 0,
    misses: 0,
  });

  console.log(game);

  const updateTurn = (pId: string) => {
    setCurrTurn({
      id: uuid(),
      playerId: pId,
      ..._defaultStats
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

  const shotRecord = {
    [ShotType.Make]: ['make'],
    [ShotType.Miss]: ['miss'],
    [ShotType.EndGame]: ['end game']
  }

  const shotView =
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {Object.keys(shotRecord).map((shotKey) => (
        <View key={shotKey} style={styles.button}>
          <Button title={shotRecord[shotKey]} />
        </View>
      ))}
    </View>

  console.log(game.playerIds);
  const playersBar = 
    <View style={styles.playersBarContainer}>
      {game.playerIds.map((playerId) => (
        <View key={playerId}>
          <ThemedText>{playerId}</ThemedText>
        </View>
      ))}
    </View>

  return (
    <View style={{ flex: 1 }}>
      {playersBar}
      <View style={{ flex: 1 }}>
        {shotView}
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  playersBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  container: {
    flex: 1,
  },
  button: {
    margin: 5,
  }
});
