import * as React from "react";

/** Header in a list. */
export const Header = (props: { text: string; top: boolean }) => (
  <li className={`header ${props.top ? "top" : ""}`}>
    <b>= {props.text} =</b>
  </li>
);
