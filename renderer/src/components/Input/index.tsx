import React, { FocusEvent, useState } from "react";

import ContentEditable, { Props } from "react-contenteditable";

import { Placeholder } from "./Placeholder";
import classes from "./Input.module.scss";

export function Input({ className, placeholder, toContainer, ...props }: any) {
  return (
    <div className={classes.input__container}>
      <ContentEditable
        data-placeholder={placeholder}
        className={classes.input + " " + (className ? className : "")}
        {...props}
      />
      {toContainer}
    </div>
  );
}
