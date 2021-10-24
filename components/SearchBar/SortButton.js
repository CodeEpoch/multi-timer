import React, { useState } from "react";
import { View, Text } from "react-native";
// import Menu from "@material-ui/core/Menu";
// import { div } from "@material-ui/core";
// import SortIcon from "@material-ui/icons/Sort";
// import { IconButton } from "@material-ui/core";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

function SortButton(props) {
  const { sortList } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClose = (sortMethod) => {
    setAnchorEl(null);
    console.log(sortMethod);
    if (typeof sortMethod !== "object") sortList(sortMethod);
  };

  return (
    <Menu>
      <MenuTrigger text="Select action: " />
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
