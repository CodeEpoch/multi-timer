// From https://github.com/amrlabib/react-timer-hook/tree/f345d7bf6f0e303eefaa8008d35afdeefc784c25/src
export default class Validate {
  static expiryTimestamp(expiryTimestamp) {
    const isValid = new Date(expiryTimestamp).getTime() > 0;
    if (!isValid) {
      console.warn(
        "react-timer-hook: { useTimer } Invalid expiryTimestamp settings",
        expiryTimestamp
      ); // eslint-disable-line
    }
    return isValid;
  }

  static onExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === "function";
    if (onExpire && !isValid) {
      console.warn(
        "react-timer-hook: { useTimer } Invalid onExpire settings function",
        onExpire
      ); // eslint-disable-line
    }
    return isValid;
  }
}
