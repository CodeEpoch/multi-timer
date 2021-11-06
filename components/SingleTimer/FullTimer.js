import React, { useState, useEffect } from "react";
// https://github.com/amrlabib/react-timer-hook
import useTimer from "./timer-hook/Timer";
import * as utils from "../utils";
import { View, Text, Modal, TextInput, Pressable } from "react-native";
import { styles } from "../../styles/StyleSheet";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function FullTimer(props) {
  let {
    expiryTimestamp,
    repeatCount,
    timerChange,
    timerRepeatChange,
    removeTimer,
    id,
    isHidden,
  } = props;
  const [input, setInput] = useState();
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => {
        let time = utils.parseTime(input);
        if (repeat.on) {
          timerRepeatChange(repeat.count + 1);
          setRepeat({ ...repeat, count: repeat.count + 1 });
          utils.playSound("clap", 3000);
          restart(time, true);
        } else {
          utils.playSound("alarm", 3000);
          restart(time, false);
        }
      },
    });

  const href = React.createRef();
  const mref = React.createRef();
  const sref = React.createRef();
  const [title, newTitle] = useState(utils.getIdName(id));
  const [hour, newHour] = useState(hours);
  const [min, newMin] = useState(minutes);
  const [sec, newSec] = useState(seconds);
  const [modalVisible, setModalVisible] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);
  const [repeat, setRepeat] = useState({
    count: repeatCount,
    on: false,
    style: styles.colorGray,
  });

  // initialize time
  useEffect(() => {
    const time = new Date();
    time.setHours(0, 0, expiryTimestamp, 0);
    setInput(time);
  }, []);

  // update time on input(time) change
  useEffect(() => {
    // check for input cuz input might not be initialized at start
    if (input) {
      let time = utils.parseTime(input);
      restart(time, false);
    }
  }, [input]);

  if (isHidden) return <></>;

  const editTimer = (hour, min, sec) => {
    let anewSec = hour * 60 * 60 + min * 60 + sec;
    const newtime = new Date();
    newtime.setHours(hour, min, sec, 0);
    setInput(newtime);
    timerChange(anewSec, title);
    restart(anewSec);
    pause();
    setModalVisible(false);
  };

  const toggleRepeat = () => {
    if (repeat.on) {
      setRepeat({ ...repeat, on: false, style: styles.colorGray });
    } else {
      setRepeat({ ...repeat, on: true, style: styles.colorYellow });
    }
  };

  const toggleTargetTime = () => {
    if (targetVisible) {
      let time = new Date();
      let durationSeconds = hours * 60 ** 2 + minutes * 60 + seconds;
      time.setSeconds(time.getSeconds() + durationSeconds);
      return (
        <View style={[styles.rowJustiCenter, styles.targetTimer]}>
          <Text style={[styles.colorGray, styles.targetTimerText]}>
            {time.toLocaleTimeString("en-US")}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={[styles.timerBox]}>
      {/* Title BAR */}
      <View style={styles.rowJustiCenter}>
        <View
          style={{ flexDirection: "row", flex: 0.75, alignItems: "center" }}
        >
          {/* REPEAT */}
          <Pressable
            style={styles.rowJustiCenter}
            onPress={() => {
              toggleRepeat();
            }}
          >
            <Ionicons name="repeat" size={20} style={repeat.style} />
            <Text style={repeat.style}>
              {repeat.count > 0 ? ` ${repeat.count}` : null}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
            flex: 0.25,
          }}
        >
          {/* EDIT */}
          <Pressable
            onPress={() => {
              newHour(hours);
              newMin(minutes);
              newSec(seconds);
              setModalVisible(true);
            }}
          >
            <Feather
              name="edit"
              size={17}
              style={[styles.colorYellow, { paddingRight: 5 }]}
            />
          </Pressable>
          {/* DELETE */}
          <Pressable
            onPress={() => {
              removeTimer();
            }}
          >
            <MaterialIcons
              name="delete-outline"
              size={20}
              style={{ color: "red", paddingRight: 5 }}
            />
          </Pressable>
        </View>
      </View>

      {/* TITLE */}
      <View style={[styles.rowJustiCenter, { paddingTop: 5 }]}>
        <Text style={styles.colorYellow} numberOfLines={1}>
          {utils.getIdName(id)}
        </Text>
      </View>

      {/* Clock */}
      <View style={[styles.rowJustiCenter, { alignItems: "center" }]}>
        {hours > 0 ? (
          <Text style={[styles.timerText, styles.colorYellow]}>
            {hours < 10 ? `0${hours}` : hours}
          </Text>
        ) : null}
        {hours > 0 ? <Text style={styles.colorGray}>:</Text> : null}
        <Text style={[styles.timerText, styles.colorYellow]}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </Text>
        <Text style={styles.colorGray}>:</Text>
        <Text style={[styles.timerText, styles.colorYellow]}>
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </View>

      {/* show Target Time */}
      {toggleTargetTime()}

      {/* Button Control */}
      <View style={styles.rowJustiCenter}>
        <Pressable
          style={[styles.button, styles.buttonBordered]}
          onPress={() => {
            let time = utils.parseTime(input);
            restart(time);
            pause();
          }}
        >
          <Text style={styles.colorYellow}>Restart</Text>
        </Pressable>
        <Pressable
          style={
            isRunning
              ? [styles.button, styles.buttonBordered, styles.redButt]
              : [styles.button, styles.buttonBordered, styles.greenButt]
          }
          onPress={() => {
            if (!isRunning) {
              resume();
              setTargetVisible(true);
            } else {
              pause();
              setTargetVisible(false);
            }
          }}
        >
          {isRunning ? (
            <Text style={styles.redButt}>Pause</Text>
          ) : (
            <Text style={styles.greenButt}>Start</Text>
          )}
        </Pressable>
      </View>

      {/* Edit Timer modal */}
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
          <View style={styles.rowJustiCenter}>
            <TextInput
              ref={href}
              style={styles.timeInput}
              value={hour.toString()}
              onChangeText={(value) => {
                newHour(Number(value));
                if (value > 9) mref.current.focus();
              }}
              placeholder="hh"
              placeholderTextColor="#777777"
              maxLength={2}
              keyboardType="numeric"
            />
            <TextInput
              ref={mref}
              style={styles.timeInput}
              value={min.toString()}
              onChangeText={(value) => {
                newMin(Number(value));
                if (value > 9) sref.current.focus();
              }}
              placeholder="mm"
              placeholderTextColor="#777777"
              maxLength={2}
              keyboardType="numeric"
            />
            <TextInput
              ref={sref}
              style={styles.timeInput}
              value={sec.toString()}
              onChangeText={(value) => {
                newSec(Number(value));
              }}
              placeholder="ss"
              placeholderTextColor="#777777"
              maxLength={2}
              keyboardType="numeric"
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => editTimer(hour, min, sec)}
          >
            <Text style={[styles.addTimerButtText, styles.buttonBordered]}>
              Edit Timer
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
