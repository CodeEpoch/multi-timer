// import * as audioURL from "../media/Leapfrog.ogg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export function getIdName(id) {
  return id.substring(0, id.lastIndexOf(" "));
}

export function playAudio(id) {
  // let audio = new Audio(audioURL);
  // audio.loop = true;
  // audio.play();
  Alert.alert("Alert Title", "My Alert Msg", [
    {
      text: "OK",
      onPress: () => {
        // audio.loop = false;
        // audio.pause();
      },
    },
  ]);
}

/**
 * @param {Date} input - current value of TimePicker Component
 * @param {boolean} onlySeconds - if true, parseTime return time in seconds
 * @returns {Date|number}
 */
export function parseTime(input, onlySeconds) {
  // console.log("parseTime===========", input);
  if (!input || input === null) return getMidNight();
  let time = new Date();
  let durationSeconds =
    input.getHours() * 60 ** 2 + input.getMinutes() * 60 + input.getSeconds();
  if (onlySeconds) return durationSeconds;
  // if the timer is set to 00:00:00
  if (!durationSeconds) return null;
  time.setSeconds(time.getSeconds() + durationSeconds);
  return time;
}

function getMidNight() {
  // workaround to get 00:00:00 at timer's creation
  const time = new Date();
  time.setHours(0, 0, 0, 0);
  return time;
}
