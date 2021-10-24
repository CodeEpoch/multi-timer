// import { div } from "@material-ui/core";
// import div from "@material-ui/icons/PlayArrow";
// import div from "@material-ui/icons/Pause";
// import div from "@material-ui/icons/Replay";
import * as utils from "../utils";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function TimeButtons(props) {
  const { pause, resume, restart, isRunning, clockValues, input } = props;
  return (
    <View className="buttons">
      <Pressable
        // style={{ color: "white" }}
        onPress={() => {
          if (!isRunning()) {
            if (!clockValues().every((e) => Boolean(e))) {
              let time = utils.parseTime(input());
              if (!time) return;
              restart(time);
            } else {
              resume();
            }
          } else {
            pause();
          }
        }}
      >
        {!isRunning() ? <Text>Play</Text> : <Text>Pause</Text>}
      </Pressable>
      <Pressable
        // style={{ color: "white" }}
        onPress={() => {
          let time = utils.parseTime(input());
          restart(time);
          pause();
        }}
      >
        <Text>Replay</Text>
      </Pressable>
    </View>
  );
}
