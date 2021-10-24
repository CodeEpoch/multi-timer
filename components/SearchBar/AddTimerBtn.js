// import { IconButton } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";

export default function AddTimerBtn(props) {
  const { createTimer } = props;
  return (
    <>
      <div
        onClick={() => {
          createTimer();
        }}
      >
        [+]
      </div>
    </>
  );
}
