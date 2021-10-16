import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import StopWatch from "./components/stopwatch";
import CountDown from "./components/timer";

export default function App() {
  const newTimer = () => {};
  const [timers, setTimers] = useState([
    { title: "Posture Reminder", time: 30 * 60 * 1000, repeatCount: 0 },
    { title: "Walk Reminder", time: 60 * 60 * 1000, repeatCount: 2 },
    { title: "yeee3", time: 1100, repeatCount: 3 },
  ]);

  const addTimer = () => {
    setTimers((prev) => [
      ...prev,
      { title: "yeee4", time: 41100, repeatCount: 0 },
    ]);
  };

  return (
    <React.Fragment>
      <ScrollView style={styles.safeContainer}>
        {/* timers */}
        <View style={styles.timerCon}>
          {timers.map((timer, index) => (
            <CountDown
              key={index}
              title={timer.title}
              time={timer.time}
              repeatCount={timer.repeatCount}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => addTimer()} style={styles.addTimerButt}>
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
  },
  timerCon: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  addTimerButt: {
    position: "absolute",
    zIndex: 1,
    right: 10,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe500",
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 5,
  },
  icon: {
    fontSize: 50,
    marginTop: -6,
  },
});
