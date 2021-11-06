import React, { ComponentProps, PropsWithChildren } from "react";

import classes from "./Sidebar.module.scss";
import { observer } from "mobx-react";

function SidebarWithoutObserve({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<any>>) {
  return (
    <div
      className={classes.sidebar + " " + (className ? className : "")}
      {...props}
    >
      {children}
    </div>
  );
}

export const Sidebar = observer(SidebarWithoutObserve);
