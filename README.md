# Multi-timer (React Native)

Made this timer because i didn't like the one's from Play store (Too much ads).

Special thanks to [ginop-1](https://github.com/ginop-1) for the inspiration on custom countdown & other fancy feature (timer search).
Checkout his react web timer here -> https://github.com/ginop-1/react-timer-app

## Preview:

<img src=https://github.com/CodeEpoch/multi-timer/blob/main/assets/multi-timer.jpg alt="Multi-timer app Preview" width="244" height="528">

## To run the app:

```
git clone https://github.com/CodeEpoch/multi-timer.git
npm install
npm start
```

- If you don't have expo-cli installed, `npm start` will promote you to install it. If you don't want to install on global, run `npm install expo-cli` to install in the local directory.
- If you got "Expo Go" App from Play Store or App Store, pull out your phone & use Expo Go to scan the QR Code. Or open an Android emulator

## Debugging

#### For AsyncStorage I use Reactotron from "_reactotron-react-native_"

1. Quick install the desktop app with Reactotron.Setup.2.17.1.exe (or whatever is the latest version) on [release page](https://github.com/infinitered/reactotron/releases)
2. follow the [Reactotron quick Start for React Native](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md)
3. If using an Android device or emulator run the following command to make sure it can connect to Reactotron:, download [SDK Platform-Tools for Windows](https://developer.android.com/studio/releases/platform-tools), set the path in Environment variable, then in cmd enter: `adb reverse tcp:9090 tcp:9090 `

#### Also used [react-devtools](https://www.npmjs.com/package/react-devtools) for other debugging

- After starting the app, Run the following in the project folder cmd: `react-devtools`
