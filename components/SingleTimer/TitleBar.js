// import { div } from "@material-ui/core";
import { getIdName } from "../utils";
import { layoutStyles } from "../../styles/layouts";
import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";

export default function TitleBar(props) {
  const { id, removeTimer } = props;

  return (
    <View style={layoutStyles.titleBar}>
      <Text>{getIdName(id)}</Text>
      <Pressable
        aria-label="delete"
        onPress={() => {
          localStorage.removeItem(`input ${id}`);
          removeTimer();
        }}
      >
        <Text style={{ backgroundColor: "red" }}>X</Text>
      </Pressable>
    </View>
  );
}
