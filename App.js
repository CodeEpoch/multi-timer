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
import TimerList from "./components/timerList";
import { styles } from "./StyleSheet";
// import ScrollPicker from "react-native-picker-scrollview";
// import ScrollPicker from "react-native-wheel-scrollview-picker";

// const listReducer = (state, action) => {
//   console.log(action);
//   switch (action.type) {
//     case "REMOVE_ITEM":
//       return state.filter((item) => item.title !== action.title);
//     default:
//       throw new Error();
//   }
// };

class App extends React.Component {
  constructor() {
    super();
    // const grey = "#777777";

    this.state = {
      href: React.createRef(),
      mref: React.createRef(),
      sref: React.createRef(),
      newTitle: null,
      newHour: undefined,
      newMin: undefined,
      newSec: undefined,
      modalVisible: false,
      timers: [
        { title: "Posture Reminder", time: 30 * 60 * 1000, repeatCount: 0 },
        { title: "Walk Reminder", time: 60 * 60 * 1000, repeatCount: 0 },
        { title: "yeee2", time: 1100, repeatCount: 3 },
        { title: "yeee3", time: 1100, repeatCount: 3 },
      ],
    };

    // const [timers, dispatchTimers] = React.useReducer(listReducer, [
    //   { title: "Posture Reminder", time: 30 * 60 * 1000, repeatCount: 0 },
    //   { title: "Walk Reminder", time: 60 * 60 * 1000, repeatCount: 0 },
    //   { title: "yeee2", time: 1100, repeatCount: 3 },
    //   { title: "yeee33", time: 1100, repeatCount: 3 },
    //   { title: "yee4e3", time: 1100, repeatCount: 3 },
    //   { title: "ye6ee3", time: 1100, repeatCount: 3 },
    //   { title: "ye5ee3", time: 1100, repeatCount: 3 },
    // ]);
  }

  addTimer = (title, hour, min, sec) => {
    const result = this.state.timers.filter((tim) => tim.title == title);
    if (result.length > 0) {
      Alert.alert("Error", "Title exist");
      return;
    }
    let newTime = hour * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000;
    title = title ? title : "aya " + this.state.timers.length;
    newTime = newTime ? newTime : 300 * 1000;
    this.setState({
      timers: [
        ...this.state.timers,
        { title: title, time: newTime, repeatCount: 0 },
      ],
    });
    // reset
    this.setState({ modalVisible: false });
    this.setState({ newHour: undefined });
    this.setState({ newMin: undefined });
    this.setState({ newSec: undefined });
    this.setState({ newTitle: "" });
  };

  deleteTime = (title) => {
    console.log("deleteTime", title);
    // dispatchTimers({ type: "REMOVE_ITEM", title });
    // setTimers(timers.filter((tim) => tim.title !== title));
    // this.setState({ timers: [{ title: "yeee3", time: 1100, repeatCount: 3 }] });

    const newTimers = [...this.state.timers];
    const result = this.state.timers.filter((tim) => tim.title == title);

    newTimers.splice(result, 1);
    this.setState({ timers: newTimers });
  };

  editTime = () => {
    console.log("updateTime");
  };

  render() {
    return (
      <React.Fragment>
        <TimerList
          timers={this.state.timers}
          editTime={this.editTime}
          deleteTime={this.deleteTime}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() =>
            this.setState({ modalVisible: !this.state.modalVisible })
          }
        >
          <View
            style={[styles.modalView, styles.centeredView]}
            keyboardShouldPersistTaps={"handled"}
          >
            <TextInput
              style={styles.titleInput}
              onChangeText={(newTitle) => this.setState({ newTitle: newTitle })}
              value={this.state.title}
              placeholder="Title"
              placeholderTextColor="#777777"
            />
            <View style={styles.rowCenter}>
              <TextInput
                ref={this.href}
                style={styles.timeInput}
                value={this.state.hour}
                onChangeText={(value) => {
                  this.setState({ newHour: value });
                  if (value > 9) mref.current.focus();
                }}
                placeholder="hh"
                placeholderTextColor="#777777"
                keyboardType={"numeric"}
                maxLength={2}
              />
              <TextInput
                ref={this.mref}
                style={styles.timeInput}
                value={this.state.min}
                onChangeText={(value) => {
                  this.setState({ newMin: value });
                  if (value > 9) sref.current.focus();
                }}
                placeholder="mm"
                placeholderTextColor="#777777"
                keyboardType={"numeric"}
                maxLength={2}
              />
              <TextInput
                ref={this.sref}
                style={styles.timeInput}
                value={this.state.sec}
                onChangeText={(value) => {
                  this.setState({ newSec: value });
                }}
                placeholder="ss"
                placeholderTextColor="#777777"
                keyboardType={"numeric"}
                maxLength={2}
              />
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                this.addTimer(
                  this.state.title,
                  this.state.hour,
                  this.state.min,
                  this.state.sec
                )
              }
            >
              <Text style={[styles.addTimerButtText, styles.buttonBordered]}>
                Add Timer
              </Text>
            </Pressable>
          </View>
        </Modal>
        <Pressable
          onPress={() => this.setState({ modalVisible: true })}
          style={styles.addTimerButt}
        >
          <Text style={styles.icon}>+</Text>
        </Pressable>
      </React.Fragment>
    );
  }
}

export default App;
