import { StyleSheet } from "react-native";
const textColor = "red";

export const timerStyles = StyleSheet.create({
  actualTimer: {
    color: textColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "22",
  },
  timerText: {
    backgroundColor: "yellow",
    borderRadius: "10",
    border: "1 solid" + textColor,
    color: textColor,
    padding: "3 10",
    margin: "5 0 5 0",
  },
});
