import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  }

  //  const dailyInterviewers = getInterviewersForDay(state, state.days)
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === SAVING && <Status message={"saving"} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={confirm} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={cancel} onCancel={back} />}
      {mode === DELETING && <Status message={"deleting"} />}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onSave={save} onCancel={back} />}
      {mode === ERROR_SAVE && <Error message={"Could not save"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Could not delete"} onClose={back} />}
    </article>
  );
}

export default Appointment;