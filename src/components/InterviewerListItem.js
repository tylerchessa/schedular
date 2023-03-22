import React, { useState } from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

function InterviewerListItem(props) {
const interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': props.selected === true})

function interviewerName() {
  return (props.selected ? props.name : "");
}

return (
  <li className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
);
}

export default InterviewerListItem;