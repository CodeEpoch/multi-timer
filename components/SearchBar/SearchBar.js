import React, { useState, useEffect } from "react";
// import { styled, alpha } from "@material-ui/core/styles";
// import div from "@material-ui/core/div";
// import div from "@material-ui/core/div";
// import div from "@material-ui/core/div";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from "@material-ui/icons/Search";
import SortButton from "./SortButton";
import AddTimerBtn from "./AddTimerBtn";
import { TextInput, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
export default function SearchBar(props) {
  const { createTimer, changeInputFilter, sortList } = props;
  const [inputFilter, setinputFilter] = useState("");

  useEffect(() => {
    changeInputFilter(inputFilter);
    // eslint-disable-next-line
  }, [inputFilter]);

  return (
    <MenuProvider>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "blue",
        }}
      >
        <SortButton
          sortList={(sortMethod) => {
            sortList(sortMethod);
          }}
        />
        <TextInput
          value={inputFilter}
          onChangeText={setinputFilter}
          placeholder="Search…"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setinputFilter("");
            }
          }}
        />
        <AddTimerBtn createTimer={createTimer} />
      </View>
    </MenuProvider>
  );
}
