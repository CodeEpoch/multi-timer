import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "black",
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
  rowJustiCenter: {
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
  targetTimer: {
    marginTop: -10,
    marginBottom: -6,
    height: 16,
  },
  targetTimerText: {
    fontSize: 12,
  },
  button: {
    flex: 0.5,
    height: 40,
    marginVertical: 5,
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

  // COLORS ========================================
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

  // Modal stuff ========================================
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 160,
    borderColor: "#ffe500",
    backgroundColor: "black",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  addTimerButtText: {
    marginTop: 25,
    padding: 5,
    color: "#ffe500",
    textAlign: "center",
  },
  timeInput: {
    textAlign: "center",
    width: "25%",
    height: 60,
    color: "#777777",
    paddingLeft: 2,
    marginTop: 5,
    borderColor: "#ffe500",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 30,
  },
  titleInput: {
    textAlign: "center",
    fontSize: 30,
    width: "100%",
    height: 40,
    color: "#ffe500",
    borderColor: "#ffe500",
    borderBottomWidth: 1,
    marginBottom: 5,
  },

  // app tuff ==============================================
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
  },
  timerCon: {
    flex: 11,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },

  icon: {
    fontSize: 50,
    marginTop: -6,
  },
});
