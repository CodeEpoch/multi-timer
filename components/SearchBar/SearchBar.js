import React, { useState, useEffect } from "react";
import SortButton from "./SortButton";
import AddTimerBtn from "./AddTimerBtn";
import { TextInput, View } from "react-native";
// https://www.npmjs.com/package/react-native-popup-menu
import { MenuProvider } from "react-native-popup-menu";

// https://www.npmjs.com/package/react-native-paper
// https://www.npmjs.com/package/react-native-text-input-mask

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
