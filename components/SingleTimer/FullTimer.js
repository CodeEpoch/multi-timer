import React, { useState, useEffect } from "react";
// https://github.com/amrlabib/react-timer-hook
import { useTimer } from "react-timer-hook";
import TimeButtons from "./TimeButtons";
import * as utils from "../utils";
import { View, Text, Modal, TextInput, Pressable } from "react-native";
import { styles } from "../../styles/StyleSheet";
import { layoutStyles } from "../../styles/layouts";
import { timerStyles } from "../../styles/timer";

export default function FullTimer(props) {
  let { expiryTimestamp, updateTimeoutSeconds, removeTimer, id, isHidden } =
    props;
  const [input, setInput] = useState();
  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => {
        let time = utils.parseTime(input);
        restart(time);
        pause();
        utils.playAudio(id);
      },
    });

  const href = React.createRef();
  const mref = React.createRef();
  const sref = React.createRef();
  const [title, newTitle] = useState(id);
  const [hour, newHour] = useState(hours);
  const [min, newMin] = useState(minutes);
  const [sec, newSec] = useState(seconds);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const time = new Date();
    time.setHours(0, 0, expiryTimestamp, 0);
    setInput(time);
  }, []);

  useEffect(() => {
    // check for input cuz input might not be initialized at start
    if (input) {
      let time = utils.parseTime(input);
      restart(time);
      pause();
    }
    // console.log("inputtttttttttttttt", utils.parseTime(input, true));
    // console.log("seconds, minutes, hours", seconds, minutes, hours);
  }, [input]);

  if (isHidden) return <></>;

  const editTimer = (hour, min, sec) => {
    let anewSec = hour * 60 * 60 + min * 60 + sec;
    anewSec = anewSec ? anewSec : 300;

    const newtime = new Date();
    newtime.setHours(hour, min, sec, 0);
    setInput(newtime);
    updateTimeoutSeconds(anewSec);
    restart(anewSec);
    pause();
    setModalVisible(false);
  };

  return (
    <View style={layoutStyles.wrapper}>
      <View style={layoutStyles.titleBar}>
        <Text>{utils.getIdName(id)}</Text>
        <View style={styles.rowJustiCenter}>
          <Pressable
            onPress={() => {
              newHour(hours);
              newMin(minutes);
              newSec(seconds);
              setModalVisible(true);
            }}
          >
            <Text>Edit </Text>
          </Pressable>
          <Pressable
            aria-label="delete"
            onPress={() => {
              removeTimer();
            }}
          >
            <Text style={{ backgroundColor: "red" }}>X</Text>
          </Pressable>
        </View>
      </View>

      {/* TimerBody */}
      <View style={timerStyles.actualTimer}>
        {/* Clock */}
        <View style={styles.rowJustiCenter}>
          <Text style={styles.timerText}>
            {hours < 10 ? `0${hours}` : hours}
          </Text>
          <Text>:</Text>
          <Text style={styles.timerText}>
            {minutes < 10 ? `0${minutes}` : minutes}
          </Text>
          <Text>:</Text>
          <Text style={styles.timerText}>
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </View>
      </View>
      <TimeButtons
        pause={() => pause()}
        resume={() => resume()}
        restart={(time) => restart(time)}
        isRunning={() => isRunning}
        input={() => input}
      />
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
