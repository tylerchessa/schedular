import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";

function Form(props) {
 const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState("");


  function change(event) {
    setStudent(event.target.value)
  };

  function reset() {
    setStudent("")
    setInterviewer(null)
    setError("")
  };

  function cancel() {
    props.onCancel()
    reset()
  }

  function validate() {
    if (student === "") {
    setError("Student name cannot be blank")  
  return
}
if (interviewer === null) {
  setError("Please select an interviewer");
  return;
}

setError("");
props.onSave(student, interviewer)
  }


  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={change}
        onSubmit={event => event.preventDefault()}
        data-testid="student-name-input"
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
      value={interviewer}
      interviewers={props.interviewers}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => validate()}>Save</Button>
    </section>
  </section>
</main>
  )
};

export default Form;