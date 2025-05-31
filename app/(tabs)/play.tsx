import { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"; // adjust path if different
import { BaseGame } from "@/models/Game.ts";
import GameView from '@/components/game/GameView.tsx';
import { styles } from '@/styles/global.ts';

enum ViewModes {
  Start,
  Play,
  End,
}

export default function TabThreeScreen() {
  const [showFinalStats, setShowFinalStats] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentView, setCurrentView] = useState(ViewModes.Start);
  const [players, setPlayers] = useState(2);
  //const [onSave, setOnSave] = useState(() => void);
  //const [elapsed, setElapsed] = useState('');


  /*
  // 🕒 Update elapsed time every second
  useEffect(() => {
    game.onElapsedChange = (_, el) => setElapsed(el)
  }, [game]);
  */

  const handleGameEnd = (game: BaseGame) => {
    game.save();
  }

  const finalStatsView =
    <View style={styles.viewStyle}>
      <ThemedText style={styles.header}>Game Review</ThemedText>
      <Button title="Save Game" onPress={handleGameEnd} />
    </View>

  const onStart = () => {
    setCurrentView(ViewModes.Play);
  }

  const onDone = (game: BaseGame) => {
    setCurrentView(ViewModes.End);
  }

  const startView = 
    <View style={styles.viewStyle}>
      <ThemedText style={styles.header}>8 Ball</ThemedText>
      <ThemedText style={styles.header}>Players: </ThemedText>
      <View style={styles.flexRow}>
        <Button title="-" onPress={() => setPlayers(players - 1)} />
        <ThemedText>{players}</ThemedText>
        <Button title="+" onPress={() => setPlayers(players + 1)} />
      </View>
      <Button title="Start Game" onPress={onStart} />
    </View>

  const getPlayerIds = () => {
    return Array.from({length: players}, (_, i) => `player ${i + 1}`);
  }

  const getGameView = () => {
    return <GameView playerIds={getPlayerIds()} onGameEnd={onDone} />
  }

  let mainView = startView;
  switch (currentView) {
    case ViewModes.Start:
      mainView = startView;
      break;
    case ViewModes.Play:
      mainView = getGameView();
      break;
    case ViewModes.End:
      mainView = finalStatsView;
      break;
    default:
      mainView = startView;
  }

  return (
    <View style={{ flex: 1 }}>
      {mainView}
    </View>
  );
}
