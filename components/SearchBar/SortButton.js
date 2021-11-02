import React from "react";
import { View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { FontAwesome } from "@expo/vector-icons";

function SortButton(props) {
  const { sortList } = props;

  const handleClose = (sortMethod) => {
    if (typeof sortMethod !== "object") sortList(sortMethod);
  };

  return (
    <Menu>
      <MenuTrigger>
        <FontAwesome
          name="sort"
          size={24}
          style={{
            paddingLeft: 10,
            color: "black",
            // height: 30,
            width: 30,
          }}
        />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => handleClose("A-Z")}>
          <Text> A-Z</Text>
        </MenuOption>
        <MenuOption onSelect={() => handleClose("Z-A")}>
          <Text>Z-A </Text>
        </MenuOption>
        <MenuOption onSelect={() => handleClose("time-up")}>
          <Text> Time (ascending)</Text>
        </MenuOption>
        <MenuOption onSelect={() => handleClose("time-down")}>
          <Text> Time (descendig)</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

export default SortButton;
