import { useEffect, useState } from "react";

export default function useCountdown(initialTime) {
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        let { hh, mm, ss } = prev;

        if (hh === 0 && mm === 0 && ss === 0) {
          setRunning(true);
          return prev;
        }

        ss--;
        if (ss < 0) {
          ss = 59;
          mm--;
        }
        if (mm < 0) {
          mm = 59;
          hh--;
        }
         if (hh < 0) {
          hh= 59;
          
        }

        return { hh, mm, ss };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  return { time, running, setRunning };
}
