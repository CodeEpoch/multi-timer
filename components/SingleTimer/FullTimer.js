import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
// import { View } from "@material-ui/core";
// import View from "@material-ui/lab/View";
// import View from "@material-ui/lab/View";
// import View from "@material-ui/lab/View";
import TitleBar from "./TitleBar";
import TimeButtons from "./TimeButtons";
import * as utils from "../utils";
import { View, Text, TextInput } from "react-native";
import { layoutStyles } from "../../styles/layouts";
import { timerStyles } from "../../styles/timer";
// import "../../index.css";

export default function FullTimer(props) {
  let { expiryTimestamp, updateTimeoutSeconds, removeTimer, id, isHidden } =
    props;

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

  const clockValues = [hours, minutes, seconds];

  const [input, setInput] = useState(utils.getInputStorage(id));

  useEffect(() => {
    console.log("input", input);
    localStorage.setItem(`input ${id}`, JSON.stringify(input));
    updateTimeoutSeconds(utils.parseTime(input, true));
    let time = utils.parseTime(input);
    restart(time);
    pause();
    // eslint-disable-next-line
  }, [input]);

  if (isHidden) return <></>;

  const TimerBody = () => (
    <View>
      <View style={timerStyles.actualTimer}>
        {clockValues.map((item, index) => (
          <View key={index}>
            <Text style={timerStyles.timerText}>
              {item < 10 ? `0${item}` : item}
            </Text>
            <Text>{index === clockValues.length - 1 ? "" : ":"}</Text>
          </View>
        ))}
      </View>
      <TimeButtons
        pause={() => pause()}
        resume={() => resume()}
        restart={(time) => restart(time)}
        isRunning={() => isRunning}
        clockValues={() => clockValues}
        input={() => input}
      />
    </View>
  );

  return (
    <View style={layoutStyles.wrapper}>
      <TitleBar id={id} removeTimer={removeTimer} />
      <View>
        <TextInput
          ampm={false}
          ampmInClock={false}
          views={["hours", "minutes", "seconds"]}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          value={input}
          onChangeText={(val) => {
            setInput(new Date(val));
          }}
        />
      </View>
      <TimerBody />
    </View>
  );
}
