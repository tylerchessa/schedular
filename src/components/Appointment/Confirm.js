import React from "react";
import Button from "components/Button";

function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onConfirm}>Confirm</Button>
        <Button danger onClick={props.onCancel}>Cancel</Button>
      </section>
    </main>
  );
}

export default Confirm;