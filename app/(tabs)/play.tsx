import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"; // adjust path if different
import { BaseGame } from "@/models/Game.ts";

export default function TabThreeScreen() {
  const [shotsMissed, setShotsMissed] = useState(0);
  const [showFinalStats, setShowFinalStats] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState('');
  const [game, setGame] = useState<BaseGame | null>(new BaseGame());

  const incMisses = () => {
    game.shotsMissed++;
    setShotsMissed(game.shotsMissed);
  }
  const onStart = () => {
    setGame(new BaseGame());
    setShotsMissed(0);
    setElapsed('');
    setShowFinalStats(false);
    setGameStarted(true);
    setTimerActive(true);
  }
  const onDone = () => {
    setTimerActive(false);
    setShowFinalStats(true);
  }
  const handleSaveGame = () => {
  /*
    try {
      await setDoc(doc(db, "userStats", user_id), {
        count,
        timestamp: Date.now(),
      });
      Alert.alert("Success", "Data saved to Firebase!");
    } catch (error) {
      console.error("Error writing to Firebase", error);
      Alert.alert("Error", "Could not write to Firebase.");
    }
    */
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
      <Button title="Save Game"></Button>
    </View>

  const playView = 
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Elapsed Time: {elapsed}</Text>
      <Text style={styles.header}>Count: {shotsMissed}</Text>
      <Button title="Miss" onPress={incMisses} />
      <Button title="Done" onPress={onDone} />
    </View>

  const startView = 
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Challenge: Make Balls</Text>
      <Button title="Start Game" onPress={onStart}/>
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
  );}

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
