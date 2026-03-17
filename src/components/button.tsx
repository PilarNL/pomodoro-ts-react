import React, { JSX } from 'react';

interface Props {
  onClick?: () => void;
  label: string;
  className?: string;
}
export function Button(props: Props): JSX.Element {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
