import React, { JSX, useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';

import { Button } from './button';
import { Timer } from './timer';

interface Props {
  PomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycleCount?: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [pomodoroTime, setPomodoroTime] = React.useState(props.PomodoroTime);
  const [timerRunning, setTimerRunning] = React.useState(false);
  const [working, setWorking] = React.useState(false);

  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    } else {
      document.body.classList.remove('working');
    }
  }, [working]);
  useInterval(
    () => {
      setPomodoroTime(pomodoroTime - 1);
    },
    timerRunning ? 1000 : null
  );

  const toggleWorking = () => {
    setTimerRunning(!timerRunning);
    setWorking(!working);
  };

  return (
    <div className="pomodoro">
      <h1>You are: Working</h1>
      <p>Time remaining:</p>
      <Timer pomodoroTime={pomodoroTime} />
      <div className="buttons">
        <Button label="Work" onClick={toggleWorking} />
        <Button label="Reset" />
        <Button
          label={timerRunning ? 'Pause' : 'Start'}
          onClick={() => setTimerRunning(!timerRunning)}
        />
      </div>
    </div>
  );
}
