import React, { useState, useRef, useEffect } from "react";
import "./Stopwatch.css";
import { formatTime } from "../../utils";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const increment = useRef(null);

  useEffect(() => {
    return () => clearInterval(increment.current);
  }, []);

  const handleStartPause = () => {
    if (isStopped) {
      setTime(0);
      setIsStopped(false);
    }

    if (isPaused) {
      setIsPaused(false);
      increment.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(increment.current);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    setIsStopped(true);
    clearInterval(increment.current);
    setIsPaused(true);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setIsPaused(true);
    setTime(0);
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStartPause}>
          {isPaused ? "Start" : "Pause"}
        </button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
