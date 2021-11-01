// import { IconButton } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { Text, View, Modal, Pressable } from "react-native";
import { styles } from "../../styles/StyleSheet";

export default function AddTimerBtn(props) {
  const { createTimer } = props;

  return (
    <View>
      <Pressable
        onPress={() => {
          createTimer();
        }}
      >
        <Text>[+]</Text>
      </Pressable>
    </View>
  );
}
