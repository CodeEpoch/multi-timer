import { StyleSheet } from "react-native";
const textColor = "red";

export const timerStyles = StyleSheet.create({
  actualTimer: {
    color: textColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "32",
  },
  timerText: {
    backgroundColor: "yellow",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    color: textColor,
    padding: "3 10",
    margin: "5 0 5 0",
  },
});
