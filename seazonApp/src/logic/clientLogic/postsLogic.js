import { Timestamp } from "firebase/firestore/lite";

// Caclulate how much time has passed since the recipe was posted
export const GetTimeSincePost = (props) => {
  const originalTimestamp = (new Date(props.timestamp * 1000));
  const currentTimestamp = Timestamp.now().toMillis();
  // Difference in hours
  const hourDifference = (currentTimestamp - originalTimestamp) / 3600000

  switch (true) {
    case hourDifference < 1:
      // Return e.g., 9m
      return `${Math.floor(hourDifference * 60)}m`
    case hourDifference >= 1 && hourDifference <= 24:
      // Return e.g., 9h
      return `${Math.floor(hourDifference)}h`
    case hourDifference > 24:
      return `${Math.floor(hourDifference / 24)}d`
  }
};