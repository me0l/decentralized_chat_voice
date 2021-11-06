import React from "react";

export function Placeholder(props: { visible: boolean; value: string }) {
  return (
    <div
      style={{
        display: props.visible ? "block" : "none",
      }}
    >
      {props.value}
    </div>
  );
}
