import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { BaseGame } from '@/models/Game.ts';
import { Turn } from '@/types/turn.ts';
import { v4 as uuid } from 'uuid';

type GameViewProps = {
  playerIds: string[];
}

export default function GameView({playerIds}: GameViewProps) {
  const [game, setGame] = useState<BaseGame>(new BaseGame(playerIds));
  const [currPId, setCurrPId] = useState(playerIds[0] ?? '');
  const [currTurn, setCurrTurn] = useState<Turn>({
    id: uuid(),
    playerId: playerIds[0] ?? '',
    makes: 0,
    misses: 0,
  });

  const onEndTurn = () => {
    console.log(`${currPId} turn end`);
  }

  const onUpdateStats = (update: Partial<Pick<Turn, 'makes', 'misses'>>) => {
    setCurrTurn({
      ...currTurn,
      makes: currTurn.makes + (update.makes ?? 0),
      misses: currTurn.misses + (update.misses ?? 0),
    });
  }

  const mainView = 
    <View style={styles.viewStyle}>
     <Text style={styles.header}>Player: {currPId}</Text>
     <Text style={styles.header}>Makes: {currTurn.makes}</Text>
     <Button title="Make" onPress={() => onUpdateStats({makes: 1})} />
     <Text style={styles.header}>Misses: {currTurn.misses}</Text>
     <Button title="Miss" onPress={() => onUpdateStats({misses: 1})} />
     <Button title="End Turn" onPress={onEndTurn} />
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
