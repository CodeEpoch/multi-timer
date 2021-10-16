import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  timerBox: {
    borderColor: "#ffe500",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: "47%",
    height: 150,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 30,
    letterSpacing: 2,
  },
  timerTextMilli: {
    fontSize: 20,
    letterSpacing: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 0.5,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBordered: {
    borderColor: "#ffe500",
    borderWidth: 1,
    borderRadius: 5,
  },
  laps: {
    flex: 1,
    backgroundColor: "#2c314f",
    margin: 20,
    borderRadius: 25,
  },
  lap: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  lapText: {
    flex: 1,
    color: "white",
    fontSize: 18,
  },
  lapTime: {
    textAlign: "right",
    alignSelf: "stretch",
  },
  colorYellow: {
    color: "#ffe500",
  },
  colorGray: {
    color: "#777777",
  },
  greenButt: {
    color: "green",
    borderColor: "green",
  },
  redButt: {
    color: "red",
    borderColor: "red",
  },
});
