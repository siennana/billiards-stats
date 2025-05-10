import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"; // adjust path if different
import { BaseGame } from "@/models/Game.ts";
import GameView from '@/components/game/GameView.tsx';

export default function TabThreeScreen() {
  const [shotsMissed, setShotsMissed] = useState(0);
  const [showFinalStats, setShowFinalStats] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [elapsed, setElapsed] = useState('');
  const [game, setGame] = useState<BaseGame>(new BaseGame(['bleh']));

  const incMisses = () => {
    game.shotsMissed++;
    setShotsMissed(game.shotsMissed);
  }
  const onStart = (playerIds: string[]) => {
    //game.startTimer();
    //game.shotsMissed = 0;
    setShotsMissed(game.shotsMissed);
    setShowFinalStats(false);
    setGameStarted(true);
  }
  const onDone = () => {
    //game.stopTimer();
    setShowFinalStats(true);
  }
  const onSaveGame = async () => {
    //const id = await game.save();
    console.log(id);
  }

  // 🕒 Update elapsed time every second
  useEffect(() => {
    game.onElapsedChange = (_, el) => setElapsed(el)
  }, [game]);

  const finalStatsView =
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Game Review</Text>
      <Text>Misses: {shotsMissed}</Text>
      <Text>Total Time: {elapsed}</Text>
      <Button title="Play Again" onPress={onStart}></Button>
      <Button title="Save Game" onPress={onSaveGame}></Button>
    </View>

  const newPlayView =
    <GameView playerIds={['p0', 'p1']}/>

  const playView = 
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Elapsed Time: {elapsed}</Text>
      <Text style={styles.header}>Count: {shotsMissed}</Text>
      <Button title="Miss" onPress={incMisses} />
      <Button title="Done" onPress={onDone} />
    </View>

  const startView = 
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Practice Rack</Text>
      <Button title="Start Game" onPress={() => onStart(['p1'])} />
      <Text style={styles.header}>8 Ball</Text>
      <Button title="Start Game" onPress={() => onStart(['p1', 'p2'])} />
    </View>

  let mainView;
  if (!gameStarted) {
    mainView = startView;
  } else if (showFinalStats) {
    mainView = finalStatsView;
  } else {
    mainView = newPlayView;
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
