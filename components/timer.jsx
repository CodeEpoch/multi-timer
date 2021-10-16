import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Timer from "react-compound-timer";
import { styles } from "../StyleSheet";

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      title: "",
      time: 1100,
      repeatCount: 0,
      repeatOn: false,
      repeatStyle: styles.colorGray,
      rightButt: "Start",
      rightButtstyle: styles.greenButt,
    };
  }

  async handleChange(event) {
    console.log(this.state.repeatOn);
    await this.setState({ title: "event.target.value" });
    console.log(this.state.repeatOn);
  }

  async toggleRepeat() {
    console.log("yeeeeee", this.state.repeatOn);

    if (this.state.repeatOn) {
      await this.setState({ repeatOn: false, repeatStyle: styles.colorGray });
    } else {
      await this.setState({ repeatOn: true, repeatStyle: styles.colorYellow });
    }
    console.log("upda", this.state.repeatOn);
    // this.handleChange(this);
    // console.log("upda", this.state.repeatOn);
  }

  updateRepeat() {
    console.log("update re", reon);
    if (repeat.on) {
      console.log("reeeeeeeee");
      setRepeat({ ...repeat, count: repeat.count + 1 });
    }
  }

  leftButtonHandler(reset, stop) {
    stop();
    reset();
    setRightButton({ text: "Start", style: styles.greenButt });
  }

  rightButtonHandler(timerState, start, pause) {
    switch (timerState) {
      case "INITED":
      case "PAUSED":
      case "STOPPED":
        start();
        setRightButton({ text: "Pause", style: styles.redButt });
        break;
      case "PLAYING":
        pause();
        setRightButton({ text: "Start", style: styles.greenButt });
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <Timer
        initialTime={this.state.time}
        lastUnit="m"
        timeToUpdate={1}
        direction="backward"
        startImmediately={false}
        formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
        checkpoints={[
          {
            time: 0,
            callback: () => updateRepeat(),
          },
        ]}
      >
        {({ start, pause, stop, reset, getTimerState }) => (
          <View style={[styles.timerBox]}>
            {/* Fav, repeat */}
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  this.toggleRepeat();
                }}
              >
                <Text style={this.state.repeatStyle}>Re </Text>
                <Text style={this.state.repeatStyle}>
                  {this.state.repeatCount}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Timer title */}
            <View style={styles.rowCenter}>
              <Text style={styles.colorYellow}>{this.state.title}</Text>
            </View>

            {/* Time */}
            <View style={styles.rowCenter}>
              <Text style={[styles.timerText, styles.colorYellow]}>
                <Timer.Minutes />
                <Text style={styles.colorGray}>:</Text>
                <Timer.Seconds />
              </Text>
            </View>

            {/* Control */}
            <View style={styles.buttons}>
              {/* left button */}
              <TouchableOpacity
                style={[styles.button, styles.buttonBordered]}
                onPress={() => {
                  leftButtonHandler(reset, stop);
                }}
              >
                <Text style={styles.colorYellow}>Reset</Text>
              </TouchableOpacity>
              {/* right button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonBordered,
                  this.state.rightButtstyle,
                ]}
                onPress={() => {
                  rightButtonHandler(getTimerState(), start, pause);
                }}
              >
                <Text style={this.state.rightButtstyle}>
                  {this.state.rightButt}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Timer>
    );
  }
}

export default CountDown;
