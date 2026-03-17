import React, { JSX } from 'react';
import { secondsToTime } from '../utils/seconds-to-time';

interface Props {
  pomodoroTime: number;
}
export function Timer(props: Props): JSX.Element {
  return (
    <div className="timer">
      <p>{secondsToTime(props.pomodoroTime)}</p>
    </div>
  );
}
