import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import StopWatch from "./components/stopwatch";
import CountDown from "./components/timer";
import { styles } from "./StyleSheet";
// import ScrollPicker from "react-native-picker-scrollview";
// import ScrollPicker from "react-native-wheel-scrollview-picker";

export default function App() {
  const newTimer = () => {};
  const grey = "#777777";
  const href = React.createRef();
  const mref = React.createRef();
  const sref = React.createRef();
  const [title, newTitle] = useState(null);
  const [hour, newHour] = useState(undefined);
  const [min, newMin] = useState(undefined);
  const [sec, newSec] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [timers, setTimers] = useState([
    { title: "Posture Reminder", time: 30 * 60 * 1000, repeatCount: 0 },
    { title: "Walk Reminder", time: 60 * 60 * 1000, repeatCount: 2 },
    { title: "yeee3", time: 1100, repeatCount: 3 },
  ]);

  const addTimer = (title, hour, min, sec) => {
    let newTime = hour * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000;
    title = title ? title : "aya";
    newTime = newTime ? newTime : 300 * 1000;
    setTimers((prev) => [
      ...prev,
      { title: title, time: newTime, repeatCount: 0 },
    ]);
    // reset
    setModalVisible(false);
    newHour(undefined);
    newMin(undefined);
    newSec(undefined);
    newTitle("");
    console.log("add ", hour, min, sec, newTime);
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={[styles.modalView, styles.centeredView]}
          keyboardShouldPersistTaps={"handled"}
        >
          <TextInput
            style={styles.titleInput}
            onChangeText={newTitle}
            value={title}
            placeholder="Title"
            placeholderTextColor="#777777"
          />
          <View style={styles.rowCenter}>
            <TextInput
              ref={href}
              style={styles.timeInput}
              value={hour}
              onChangeText={(value) => {
                newHour(value);
                if (value > 9) mref.current.focus();
              }}
              placeholder="hh"
              placeholderTextColor="#777777"
              keyboardType={"numeric"}
              maxLength={2}
            />
            <TextInput
              ref={mref}
              style={styles.timeInput}
              value={min}
              onChangeText={(value) => {
                newMin(value);
                if (value > 9) sref.current.focus();
              }}
              placeholder="mm"
              placeholderTextColor="#777777"
              keyboardType={"numeric"}
              maxLength={2}
            />
            <TextInput
              ref={sref}
              style={styles.timeInput}
              value={sec}
              onChangeText={(value) => {
                newSec(value);
              }}
              placeholder="ss"
              placeholderTextColor="#777777"
              keyboardType={"numeric"}
              maxLength={2}
            />
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => addTimer(title, hour, min, sec)}
          >
            <Text style={[styles.addTimerButtText, styles.buttonBordered]}>
              Add Timer
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.addTimerButt}
      >
        <Text style={styles.icon}>+</Text>
      </Pressable>
    </React.Fragment>
  );
}
