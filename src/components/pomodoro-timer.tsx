import React, { JSX, useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import bellStart from '../sounds/start.wav';
import bellStop from '../sounds/pause.wav';
import { useAudio } from '../hooks/use-audio';
import { secondsToTime } from '../utils/seconds-to-time';

interface Props {
  PomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycleCount: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [pomodoroTime, setPomodoroTime] = useState(props.PomodoroTime);
  const [timerRunning, setTimerRunning] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cycles, setCycles] = useState(
    new Array(props.cycleCount - 1).fill(true)
  );
  const startSound = useAudio(bellStart);
  const stopSound = useAudio(bellStop);

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkTime, setFullWorkTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setPomodoroTime(pomodoroTime - 1);
      if (working) {
        setFullWorkTime(fullWorkTime + 1);
      }
    },
    timerRunning ? 1000 : null
  );

  const configureWork = useCallback(() => {
    setTimerRunning(true);
    setWorking(true);
    setResting(false);
    setPomodoroTime(props.PomodoroTime);
    startSound.play();
  }, [
    setTimerRunning,
    setWorking,
    setResting,
    setPomodoroTime,
    props.PomodoroTime,
    startSound,
  ]);

  const configureRest = useCallback(
    (isLongRest: boolean) => {
      setTimerRunning(true);
      setWorking(false);
      setResting(true);
      setPomodoroTime(isLongRest ? props.longRestTime : props.shortRestTime);
      stopSound.play();
    },
    [
      setTimerRunning,
      setWorking,
      setResting,
      setPomodoroTime,
      props.longRestTime,
      props.shortRestTime,
      stopSound,
    ]
  );

  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    }
    if (resting) {
      document.body.classList.remove('working');
    }

    if (pomodoroTime > 0) {
      return;
    }

    if (working && cycles.length > 0) {
      configureRest(false);
      cycles.pop();
    } else if (working && cycles.length <= 0) {
      configureRest(true);
      setCycles(new Array(props.cycleCount - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }
    if (working) {
      setNumberOfPomodoros(numberOfPomodoros + 1);
    }
    if (resting) {
      configureWork();
    }
  }, [
    working,
    resting,
    pomodoroTime,
    cycles,
    completedCycles,
    fullWorkTime,
    numberOfPomodoros,
    props.PomodoroTime,
    props.shortRestTime,
    props.longRestTime,
    props.cycleCount,
    configureRest,
    configureWork,
  ]);

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
      <div className="details">
        <p>Completed cycles: {completedCycles}</p>
        <p>Full work time: {secondsToTime(fullWorkTime)}</p>
        <p>Number of pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
