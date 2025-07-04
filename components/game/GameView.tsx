import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BaseGame } from '@/models/Game.ts';
import { Turn, ShotType, Shot } from '@/types/turn.ts';
import { v4 as uuid } from 'uuid';
import { defaultStats } from '@/constants/defaults/game.ts';

type GameViewProps = {
  playerIds: string[];
  onGameEnd: (game: BaseGame) => void;
}

export default function GameView(props: GameViewProps) {
  const [game, setGame] = useState<BaseGame>(new BaseGame(props.playerIds));
  const [currPId, setCurrPId] = useState(game.currPlayerId);
  const [currTurn, setCurrTurn] = useState<Turn>(game.currentTurn);
  const [currentView, setCurrentView] = useState('');

  const onNextTurn = () => {
    game.nextTurn();
    setCurrTurn(game.currentTurn);
    setCurrPId(game.currPlayerId);
  }

  const finalStatsView = 
    <View style={{ flex: 1 }}>
      <ThemedText>Final Stats</ThemedText>
      {game.playerIds.map((playerId) => (
        <View key={playerId}>
          <ThemedText>{playerId}</ThemedText>
          {Object.entries(game.playerStats[playerId]).map(([shot, stats]) => (
            <ThemedText key={shot}>{`${shot}: ${stats.totalCount}`}</ThemedText>
          ))};
        </View>
      ))}
    </View>

  const onRecordShot = (type: ShotType, shot: string) => {
    const newShot: Shot = {
      name: shot,
      count: 1,
      type: type
    };
    game.currentTurn.shots.push(newShot);
    setCurrTurn(game.currentTurn);
    if (Number(type) === ShotType.Make) {
      setCurrentView('');
    } else if (Number(type) === ShotType.Miss) {
      setCurrentView('');
      onNextTurn();
    } else if (Number(type) === ShotType.EndGame) {
      console.log(game);
      game.endGame();
      game.save();
      setCurrentView('end');
    } else {
      console.log('error');
    }
  }

  const shotRecord = {
    [ShotType.Make]: {
      name: 'make',
      children: ['make', 'bank', 'kick']
    },
    [ShotType.Miss]: {
      name: 'miss',
      children: ['miss', 'safety']
    },
    [ShotType.EndGame]: {
      name: 'end game',
      children: ['made 8 early', 'scratched on 8', 'made 8']
    }
  }

  const getShotSelectionView = (shotType: ShotType) => {
    return  (
      <View style={styles.buttons}>
        {shotRecord[shotType].children.map((child) => (
          <Button key={child} title={child} onPress={() => onRecordShot(shotType, child)} />
        ))}
        <Button title='back' onPress={() => setCurrentView('')} />
      </View>
    );
  }

  const shotView =
    <View style={styles.buttons}>
      {Object.keys(shotRecord).map((shotKey) => (
        <Button key={shotKey} title={shotRecord[shotKey].name} onPress={() => setCurrentView(shotKey)} />
      ))}
    </View>

  let mainView = shotView;
  if (currentView === '') {
    mainView = shotView;
  } else if (currentView === 'end') {
    mainView = finalStatsView;
  } else {
    mainView = getShotSelectionView(currentView);
  }
  
  const isCurrPlayer = (playerId: string) => game.currPlayerId === playerId;

  const playersBar = 
    <View style={styles.playersBarContainer}>
      {game.playerIds.map((playerId) => (
        <View key={playerId} style={[isCurrPlayer(playerId) && styles.currentPlayer]}>
          <ThemedText>{playerId}</ThemedText>
        </View>
      ))}
    </View>

  return (
    <View style={{ flex: 1 }}>
      {playersBar}
      <View style={{ flex: 1 }}>
        {mainView}
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
  currentPlayer: {
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    margin: '10px',
    justifyContent: 'center',
    gap: '10px',
  }
});
