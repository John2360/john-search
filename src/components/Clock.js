import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

function Clock(props) {
  const { timezone } = props;
  const [time, setTime] = useState(moment.tz(timezone).format("hh:mm A"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment.tz(timezone).format("hh:mm A"));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timezone]);

  return `${time}`;
}

export default Clock;
