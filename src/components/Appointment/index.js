import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


function Appointment(props) {

  // const interview = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

//  const dailyInterviewers = getInterviewersForDay(state, state.days)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} />)}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back()} />}
    </article>
  );
}

export default Appointment;