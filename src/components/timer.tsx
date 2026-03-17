import React, { JSX } from 'react';
import { secondsToMinutes } from '../utils/seconds-to-minutes';

interface Props {
  pomodoroTime: number;
}
export function Timer(props: Props): JSX.Element {
  return (
    <div className="timer">
      <p>{secondsToMinutes(props.pomodoroTime)}</p>
    </div>
  );
}
