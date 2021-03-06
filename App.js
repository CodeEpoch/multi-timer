//// Checking for AsyncStorage
// if (__DEV__) {
//   import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
// }
// import Reactotron from "reactotron-react-native";
import {
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import FullTimer from "./components/SingleTimer/FullTimer";
import SearchBar from "./components/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import { styles } from "./styles/StyleSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuProvider } from "react-native-popup-menu";
import { DEFAULT_TIMER } from "./default";

//===================================
import { LogBox } from "react-native";
// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);
// Ignore all log notifications:
LogBox.ignoreAllLogs();
//====================================

export default function App() {
  const [timerList, setTimerList] = useState([]);
  const [InputFilter, setInputFilter] = useState("");
  const href = React.createRef();
  const mref = React.createRef();
  const sref = React.createRef();
  const [title, newTitle] = useState();
  const [hour, newHour] = useState(0);
  const [min, newMin] = useState(0);
  const [sec, newSec] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // get timerList on init
  useEffect(() => {
    async function getStorage() {
      try {
        let timerStorage = await AsyncStorage.getItem("timerList");
        timerStorage ? setTimerList(JSON.parse(timerStorage)) : null;
      } catch (e) {
        return [];
      }
    }
    getStorage();
  }, []);

  // update timers in AsyncStorage
  useEffect(() => {
    async function setTimers(timerList) {
      await AsyncStorage.setItem("timerList", JSON.stringify(timerList));
    }
    timerList.length !== 0 ? setTimers(timerList) : null;
  }, [timerList]);

  function createTimer(title, hour, min, sec) {
    const newSec = hour * 60 * 60 + min * 60 + sec;
    title = title ? title : "aya";
    setTimerList((timerList) => [
      ...timerList,
      {
        timeoutSeconds: newSec,
        id: `${title} ${timerList.length}`,
        expiryTimestamp: newSec,
        repeatCount: 0,
      },
    ]);
  }

  function timerChange(timer, seconds, title) {
    let newList = [...timerList];
    const timerIndex = newList.findIndex((obj) => {
      return obj.id === timer.id;
    });
    newList[timerIndex].id = `${title} ${timerList.length}`;
    newList[timerIndex].timeoutSeconds = seconds;
    newList[timerIndex].expiryTimestamp = seconds;
    newList[timerIndex].repeatCount = 0;
    setTimerList(newList);
  }

  function timerRepeatChange(timer, count) {
    let newList = [...timerList];
    const timerIndex = newList.findIndex((obj) => {
      return obj.id === timer.id;
    });
    newList[timerIndex].repeatCount = count;
    setTimerList(newList);
  }

  function sortTimerList(sortMethod) {
    let sorted = "";
    switch (sortMethod) {
      case "A-Z":
        sorted = [...timerList].sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "Z-A":
        sorted = [...timerList].sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "time-up":
        sorted = [...timerList].sort(
          (a, b) => a.timeoutSeconds - b.timeoutSeconds
        );
        break;
      case "time-down":
        sorted = [...timerList].sort(
          (a, b) => b.timeoutSeconds - a.timeoutSeconds
        );
        break;
      default:
        return null;
    }
    setTimerList(sorted);
  }

  function removeTimer(timer) {
    setTimerList((timerList) => timerList.filter((t) => t.id !== timer.id));
  }

  // HTML section
  return (
    <View style={styles.safeContainer}>
      <ScrollView>
        <MenuProvider>
          <SearchBar
            createTimer={() => setModalVisible(true)}
            changeInputFilter={(event) => setInputFilter(event)}
            sortList={(sortMethod) => sortTimerList(sortMethod)}
          />

          {/* {console.log("timerList=====", timerList)} */}
          <View style={styles.timerCon}>
            {timerList.map((timer) => (
              <FullTimer
                key={timer.id}
                id={timer.id}
                isHidden={
                  !timer.id
                    .substring(0, timer.id.lastIndexOf(" "))
                    .toLocaleLowerCase() // id without index
                    .includes(InputFilter.toLocaleLowerCase())
                }
                expiryTimestamp={timer.expiryTimestamp}
                repeatCount={timer.repeatCount}
                removeTimer={() => removeTimer(timer)}
                timerChange={(seconds, title) =>
                  timerChange(timer, seconds, title)
                }
                timerRepeatChange={(count) => timerRepeatChange(timer, count)}
              />
            ))}
          </View>
        </MenuProvider>

        {/* Create timer Modal */}
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
              onPress={() => {
                createTimer(title, hour, min, sec);
                setModalVisible(false);
              }}
            >
              <Text style={[styles.addTimerButtText, styles.buttonBordered]}>
                Create Timer
              </Text>
            </Pressable>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
