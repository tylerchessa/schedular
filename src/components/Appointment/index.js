import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



function Appointment(props) {

const interview = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />

  return (
    <article className="appointment">
      <Header>{props.time}</Header>
      {interview}
    </article>
  )
}

export default Appointment;