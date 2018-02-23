import * as moment from "moment";
import { LocalTime } from "./types";

// Formats the given date in YYYYMMDD.
export const formatDate = (date: Date): string => {
  return moment(date).format("YYYYMMDD");
};

export const parseDate = (dateText: string): Date | null => {
  const m = dateText.match(/^([0-9:.]+).*?(am|pm)?/i);
  if (!m) {
    return null;
  }
  let numPart = m[1];
  const amPm = m[2] ? m[2] : "pm";
  if (numPart.length === 3) {
    numPart = "0" + numPart;
  }
  return moment(numPart + amPm, "hhmmA").toDate();
};

export const formatTime = (date: Date, time: LocalTime): string => {
  return moment(date)
    .set("h", time.hour)
    .set("m", time.minute)
    .set("s", time.second)
    .format("h:mm A");
};
