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
// https://sweetalert2.github.io/
import Swal from "sweetalert2";
import { styles } from "./styles/StyleSheet";
// import "./index.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as utils from "./components/utils";
import { MenuProvider } from "react-native-popup-menu";
import { FontAwesome } from "@expo/vector-icons";

//===================================
import { LogBox } from "react-native";
// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);
// Ignore all log notifications:
LogBox.ignoreAllLogs();
//====================================

export default function App() {
  const tt = [
    { timeoutSeconds: "3720010", id: "wahahah 2", expiryTimestamp: "3720010" },
    { timeoutSeconds: 1830, id: "yeee 2", expiryTimestamp: 1830 },
  ];
  const [timerList, setTimerList] = useState([]);
  const [InputFilter, setInputFilter] = useState("");
  const [title, newTitle] = useState("yeee");
  const [time, newTime] = useState(60);
  const [modalVisible, setModalVisible] = useState(false);

  // get timerList on init
  useEffect(() => {
    async function getStorage() {
      try {
        let timerStorage = await AsyncStorage.getItem("timerList");
        setTimerList(JSON.parse(timerStorage));
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

  function createTimer() {
    setTimerList((timerList) => [
      ...timerList,
      {
        timeoutSeconds: 55,
        id: `${title} ${timerList.length}`,
        expiryTimestamp: 55,
      },
    ]);
  }

  function timerChange(timer, seconds, title) {
    let newList = [...timerList];
    const timerIndex = newList.findIndex((obj) => {
      return obj.id === timer.id;
    });
    newList[timerIndex].id = title;
    newList[timerIndex].timeoutSeconds = seconds;
    newList[timerIndex].expiryTimestamp = seconds;
    // console.log("timerChange", timer, "sec", seconds);
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
                removeTimer={() => removeTimer(timer)}
                timerChange={(seconds, title) =>
                  timerChange(timer, seconds, title)
                }
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

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                createTimer(title, time);
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
