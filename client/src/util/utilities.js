import {useLocation} from "react-router-dom";
import React from "react";

export function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function DDMMYYYY(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  date = dd + '/' + mm + '/' + yyyy
  return date;
}

export function getAvgTimeToRead(text) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time
}

export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}