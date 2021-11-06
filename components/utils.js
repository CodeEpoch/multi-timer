import { Audio } from "expo-av";

const soundFile = {
  alarm: require("../assets/media/mixkit-facility-alarm-sound.mp3"),
  clap: require("../assets/media/mixkit-small-crowd-ovation.mp3"),
};

/**
 * @param {string} id - timer id
 */
export function getIdName(id) {
  return id.substring(0, id.lastIndexOf(" "));
}

/**
 * @param {string} fileName - file name
 * @param {Number} timeout - time in milliseconds
 */
export async function playSound(fileName, timeout) {
  // Loading Sound
  const { sound } = await Audio.Sound.createAsync(soundFile[fileName]);
  // Play Sound
  await sound.playAsync();
  // unload the Sound after using it to prevent memory leaks.
  setTimeout(async function () {
    await sound.unloadAsync();
  }, timeout);
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

/**
 * @returns {Date}
 */
function getMidNight() {
  // workaround to get 00:00:00 at timer's creation
  const time = new Date();
  time.setHours(0, 0, 0, 0);
  return time;
}
