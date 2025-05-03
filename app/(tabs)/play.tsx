import { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function TabThreeScreen() {
  const [count, setCount] = useState(0);
  const [showFinalStats, setShowFinalStats] = useState(false);

  const incMisses = () => {
    setCount(count + 1);
  }
  const onDone = () => {
    setShowFinalStats(true);
  }
  const onResetGame = () => {
    setCount(0);
    setShowFinalStats(false);
  }

  const finalStatsView =
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Game Review</Text>
      <Text>Misses: {count}</Text>
      <Button title="Play Again" onPress={onResetGame}></Button>
      <Button title="Save Game"></Button>
    </View>

  const playView = 
    <View style={styles.viewStyle}>
      <Text style={styles.header}>Count: {count}</Text>
      <Button title="Miss" onPress={incMisses} />
      <Button title="Done" onPress={onDone} />
    </View>

  const mainView = showFinalStats ? finalStatsView : playView;

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
