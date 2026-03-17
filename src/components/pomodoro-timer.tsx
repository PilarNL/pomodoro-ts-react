import React, { JSX, useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import bellStart from '../sounds/start.wav';
import bellStop from '../sounds/pause.wav';
import { useAudio } from '../hooks/use-audio';

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
  const [resting, setResting] = React.useState(false);
  const startSound = useAudio(bellStart);
  const stopSound = useAudio(bellStop);

  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    }
    if (resting) {
      document.body.classList.remove('working');
    }
  }, [working, resting]);
  useInterval(
    () => {
      setPomodoroTime(pomodoroTime - 1);
    },
    timerRunning ? 1000 : null
  );

  const configureWork = () => {
    setTimerRunning(true);
    setWorking(true);
    setResting(false);
    setPomodoroTime(props.PomodoroTime);
    startSound.play();
  };

  const configureRest = (isLongRest: boolean) => {
    setTimerRunning(true);
    setWorking(false);
    setResting(true);
    setPomodoroTime(isLongRest ? props.longRestTime : props.shortRestTime);
    stopSound.play();
  };

  return (
    <div className="pomodoro">
      <h1>You are: {working ? 'Working' : 'Resting'}</h1>
      <p>Time remaining:</p>
      <Timer pomodoroTime={pomodoroTime} />
      <div className="buttons">
        <Button label="Work" onClick={() => configureWork()} />
        <Button label="Rest" onClick={() => configureRest(false)} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          label={timerRunning ? 'Pause' : 'Start'}
          onClick={() => setTimerRunning(!timerRunning)}
        />
      </div>
    </div>
  );
}
