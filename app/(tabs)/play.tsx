import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"; // adjust path if different
import { BaseGame } from "@/models/Game.ts";
import GameView from '@/components/game/GameView.tsx';

export default function TabThreeScreen() {
  const [showFinalStats, setShowFinalStats] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  //const [elapsed, setElapsed] = useState('');

  const onStart = (playerIds: string[]) => {
    setShowFinalStats(false);
    setGameStarted(true);
  }
  const onDone = () => {
    setShowFinalStats(true);
  }
  const onSaveGame = async () => {
    console.log(id);
  }

  /*
  // 🕒 Update elapsed time every second
  useEffect(() => {
    game.onElapsedChange = (_, el) => setElapsed(el)
  }, [game]);
  */

  const handleGameEnd = (game: BaseGame) => {
    console.log(game.turns);
    game.save();
  }

  const finalStatsView =
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Game Review</Text>
    </View>

  const playView =
    <GameView playerIds={['player 1', 'player 2']} onGameEnd={handleGameEnd}/>

  const startView = 
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Practice Rack</Text>
      <Button title="Start Game" onPress={() => onStart(['player 1'])} />
      <Text style={styles.header}>8 Ball</Text>
      <Button title="Start Game" onPress={() => onStart(['player 1', 'player 2'])} />
    </View>

  let mainView;
  if (!gameStarted) {
    mainView = startView;
  } else if (showFinalStats) {
    mainView = finalStatsView;
  } else {
    mainView = playView;
  }


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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  }
});
