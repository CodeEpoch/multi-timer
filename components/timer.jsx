import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Timer from "react-compound-timer";
import { styles } from "../StyleSheet";

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.tiRef = React.createRef();
    this.state = {
      title: this.props.title,
      time: this.props.time,
      repeatCount: this.props.repeatCount,
      repeatOn: false,
      repeatStyle: styles.colorGray,
      rightButt: "Start",
      rightButtstyle: styles.greenButt,
    };
  }

  async toggleRepeat() {
    if (this.state.repeatOn) {
      await this.setState({ repeatOn: false, repeatStyle: styles.colorGray });
    } else {
      await this.setState({ repeatOn: true, repeatStyle: styles.colorYellow });
    }
  }

  updateRepeat(reset) {
    console.log(reset);

    console.log("repeattts");
    if (this.state.repeatOn) {
      console.log("reeeeeeeee");
      this.setState({ repeatCount: this.state.repeatCount + 1 });
    } else {
      this.setState({ rightButt: "Start", rightButtstyle: styles.greenButt });
    }
  }

  leftButtonHandler(reset) {
    reset();
  }

  rightButtonHandler(timerState, start, pause) {
    switch (timerState) {
      case "INITED":
      case "PAUSED":
      case "STOPPED":
        start();
        this.setState({ rightButt: "Pause", rightButtstyle: styles.redButt });
        break;
      case "PLAYING":
        pause();
        this.setState({ rightButt: "Start", rightButtstyle: styles.greenButt });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={[styles.timerBox]}>
        <Timer
          initialTime={this.state.time}
          direction="backward"
          startImmediately={false}
          ref={this.tiRef}
          formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
          checkpoints={[
            {
              time: 0,
              callback: () => {
                this.tiRef.current.reset();

                if (this.state.repeatOn) {
                  this.setState({ repeatCount: this.state.repeatCount + 1 });
                  this.tiRef.current.start();
                } else {
                  this.setState({
                    rightButt: "Start",
                    rightButtstyle: styles.greenButt,
                  });
                }
              },
            },
          ]}
        >
          {({ start, pause, stop, reset, getTimerState }) => (
            <React.Fragment>
              {/* Fav?, repeat */}
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
                  {/* show hour if time >= a hour */}
                  {this.props.time >= 3600 * 1000 && <Timer.Hours />}
                  {this.props.time >= 3600 * 1000 && (
                    <Text style={styles.colorGray}>:</Text>
                  )}
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
                    this.leftButtonHandler(reset, stop);
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
                    this.rightButtonHandler(getTimerState(), start, pause);
                  }}
                >
                  <Text style={this.state.rightButtstyle}>
                    {this.state.rightButt}
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Timer>
      </View>
    );
  }
}

export default CountDown;
