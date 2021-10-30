import { StyleSheet, Text, View, Modal } from "react-native";
import FullTimer from "./components/SingleTimer/FullTimer";
import SearchBar from "./components/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
// https://sweetalert2.github.io/
import Swal from "sweetalert2";

// import "./index.css";

export default function App() {
  const [timerList, setTimerList] = useState(getStorage());
  const [InputFilter, setInputFilter] = useState("");

  function getStorage() {
    let timerStorage = localStorage.getItem("timerList");
    if (!timerStorage || timerStorage === []) return [];
    return JSON.parse(timerStorage.toString());
  }

  async function createTimer() {
    await Swal.fire({
      title: "Enter timer's name",
      input: "text",
      inputValidator: (value) => {
        if (!value) return "You need to write something!";
      },
    }).then((result) => {
      if (!result.value) return;
      setTimerList((timerList) => [
        ...timerList,
        {
          timeoutSeconds: 0,
          id: `${result.value} ${timerList.length}`,
          expiryTimestamp: 1,
        },
      ]);
    });
  }

  function timeChange(timer, seconds) {
    let newList = [...timerList];
    const timerIndex = newList.findIndex((obj) => {
      return obj.id === timer.id;
    });
    newList[timerIndex].timeoutSeconds = seconds;
    newList[timerIndex].expiryTimestamp = seconds;
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

  useEffect(() => {
    console.log("timerList", timerList);
    localStorage.setItem("timerList", JSON.stringify(timerList));
  }, [timerList]);

  // HTML section
  return (
    <React.Fragment>
      <SearchBar
        createTimer={() => createTimer()}
        changeInputFilter={(event) => setInputFilter(event)}
        sortList={(sortMethod) => sortTimerList(sortMethod)}
      />
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
          updateTimeoutSeconds={(seconds) => timeChange(timer, seconds)}
        />
      ))}
    </React.Fragment>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
