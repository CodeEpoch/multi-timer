// import { div } from "@material-ui/core";
// import div from "@material-ui/icons/PlayArrow";
// import div from "@material-ui/icons/Pause";
// import div from "@material-ui/icons/Replay";
import * as utils from "../utils";
import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { styles } from "../../styles/StyleSheet";

export default function TimeButtons(props) {
  const { pause, resume, restart, isRunning, input } = props;
  return (
    <View style={styles.rowJustiCenter}>
      <TouchableOpacity
        style={{ backgroundColor: "red", zIndex: 1 }}
        onPress={() => {
          if (!isRunning()) {
            resume();
          } else {
            pause();
          }
        }}
      >
        {!isRunning() ? <Text>Play</Text> : <Text>Pause</Text>}
      </TouchableOpacity>
      <Pressable
        style={{ backgroundColor: "blue" }}
        onPress={() => {
          console.log("restarttttttttt");
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
