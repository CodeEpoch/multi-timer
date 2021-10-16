import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import StopWatch from "./components/stopwatch";
import CountDown from "./components/timer";

export default function App() {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => alert("Hello, world!")}
          style={styles.addTimerButt}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <CountDown />
        <CountDown />
        <CountDown />
        <CountDown />
        <CountDown />
        <CountDown />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  addTimerButt: {
    position: "absolute",
    right: 5,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe500",
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5,
  },
});
