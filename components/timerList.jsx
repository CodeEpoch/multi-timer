import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import CountDown from "./timer";
import { styles } from "../StyleSheet";

class TimerList extends React.Component {
  state = {};

  render() {
    return (
      <ScrollView style={styles.safeContainer}>
        {/* timers */}
        <View style={styles.timerCon}>
          {this.props.timers.map((timer, index) => (
            <CountDown
              key={index}
              title={timer.title}
              time={timer.time}
              repeatCount={timer.repeatCount}
              onEditTime={this.props.editTime}
              onDeleteTime={this.props.deleteTime}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default TimerList;
