import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Timer from "react-compound-timer";
import { styles } from "../StyleSheet";

export default function CountDown(props) {
  const [title, setTitle] = useState({ text: "title" });
  const [time, setTime] = useState(1100);
  const [reon, setReon] = useState(false);
  const [repeat, setRepeat] = useState({
    count: 0,
    on: false,
    style: styles.colorGray,
  });
  const [rightButton, setRightButton] = useState({
    text: "Start",
    style: styles.greenButt,
  });

  const toggleRepeat = () => {
    if (repeat.on) {
      let re = { count: 11, on: false, style: styles.colorGray };
      setRepeat(re);
      setReon(false);
    } else {
      setRepeat({ ...repeat, on: true, style: styles.colorYellow });
      setReon(true);
    }
    console.log("upda", repeat);
    console.log(reon);
  };

  const updateRepeat = () => {
    console.log("update re", reon);
    if (repeat.on) {
      console.log("reeeeeeeee");
      setRepeat({ ...repeat, count: repeat.count + 1 });
    }
  };

  const leftButtonHandler = (reset, stop) => {
    stop();
    reset();
    setRightButton({ text: "Start", style: styles.greenButt });
  };

  const rightButtonHandler = (timerState, start, pause) => {
    switch (timerState) {
      case "INITED":
      case "PAUSED":
      case "STOPPED":
        start();
        setRightButton({ text: "Pause", style: styles.redButt });
        break;
      case "PLAYING":
        pause();
        setRightButton({ text: "Start", style: styles.greenButt });
        break;
      default:
        break;
    }
  };

  return (
    <Timer
      initialTime={time}
      lastUnit="m"
      timeToUpdate={1}
      direction="backward"
      startImmediately={false}
      formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
      checkpoints={[
        {
          time: 0,
          callback: () => updateRepeat(),
        },
      ]}
    >
      {({ start, pause, stop, reset, getTimerState }) => (
        <View style={[styles.timerBox]}>
          {/* Fav, repeat */}
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                toggleRepeat();
              }}
            >
              <Text style={repeat.style}>Re </Text>
              <Text style={repeat.style}>{repeat.count}</Text>
            </TouchableOpacity>
          </View>

          {/* Timer title */}
          <View style={styles.rowCenter}>
            <Text style={styles.colorYellow}>{title.text}</Text>
          </View>

          {/* Time */}
          <View style={styles.rowCenter}>
            <Text style={[styles.timerText, styles.colorYellow]}>
              <Timer.Minutes />
              <Text style={styles.colorGray}>:</Text>
              <Timer.Seconds />
            </Text>
          </View>

          {/* Control */}
          <View style={styles.buttons}>
            {/* left button */}
            <TouchableOpacity
              style={[styles.button, styles.buttonBordered]}
              onPress={() => {
                leftButtonHandler(reset, stop);
              }}
            >
              <Text style={styles.colorYellow}>Reset</Text>
            </TouchableOpacity>
            {/* right button */}
            <TouchableOpacity
              style={[styles.button, styles.buttonBordered, rightButton.style]}
              onPress={() => {
                rightButtonHandler(getTimerState(), start, pause);
              }}
            >
              <Text style={rightButton.style}>{rightButton.text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Timer>
  );
}
