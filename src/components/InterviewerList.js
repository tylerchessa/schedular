import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"


function InterviewerList(props) {
  const interviewerArray = props.interviewers ? 
  props.interviewers.map((interviewer) => {
    return <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={() => {props.onChange(interviewer.id)}}
    />
  }) : [];

  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerArray}</ul>
</section>
  )
}

export default InterviewerList;