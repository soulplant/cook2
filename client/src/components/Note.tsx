import * as React from "react";

/** Label indicating a recipe. */
export const Note = (props: { text: string }) => (
  <span className="source label">[{props.text}]</span>
);
