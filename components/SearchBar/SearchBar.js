import React, { useState, useEffect } from "react";
import SortButton from "./SortButton";
import { TextInput, View, Pressable } from "react-native";
// https://www.npmjs.com/package/react-native-popup-menu
import { styles } from "../../styles/StyleSheet";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar(props) {
  const { createTimer, changeInputFilter, sortList } = props;
  const [inputFilter, setinputFilter] = useState("");

  useEffect(() => {
    changeInputFilter(inputFilter);
  }, [inputFilter]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ffe500",
        alignItems: "center",
      }}
    >
      <SortButton
        sortList={(sortMethod) => {
          sortList(sortMethod);
        }}
      />
      {/* Search */}
      <TextInput
        value={inputFilter}
        onChangeText={setinputFilter}
        placeholder="Search…"
        style={{ flex: 0.8, paddingLeft: 8 }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setinputFilter("");
          }
        }}
      />
      {/* Add Timer Button */}
      <View>
        <Pressable onPress={() => createTimer()}>
          <Ionicons name="add-circle-outline" size={28} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
