import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
interface TimerProps {
  onStop: (seconds: number, index: number) => void;
  index: number;
}
export const Timer = ({ onStop, index }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  function toggle() {
    setIsActive(false);
  }

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <div data-testid="seconds-display">{seconds}</div>
      <div>
        {isActive && (
          <Button
            data-testid="stop-button"
            color="error"
            onClick={() => {
              onStop(seconds, index);
              toggle();
            }}
          >
            Stop
          </Button>
        )}
      </div>
    </>
  );
};
