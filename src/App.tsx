import React, { JSX } from 'react';
import './App.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="App">
      <PomodoroTimer
        PomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycleCount={4}
      />
    </div>
  );
}

export default App;
