import React, { useState, useEffect } from "react";
import SortButton from "./SortButton";
import { TextInput, View, Pressable } from "react-native";
import { styles } from "../../styles/StyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

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
        style={{
          height: 30,
          width: 30,
        }}
        sortList={(sortMethod) => {
          sortList(sortMethod);
        }}
      />
      {/* Search */}
      <TextInput
        value={inputFilter}
        onChangeText={setinputFilter}
        placeholder="Search…"
        style={{ flex: 0.95, paddingLeft: 8, height: 40 }}
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
