import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";
import { getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/react";
import { fixtures } from "__mocks__/axios";
import axios from "axios";

afterEach(cleanup)

describe("Application", () => {
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday"))
  .then(() => {
    fireEvent.click(getByText("Tuesday"))
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  })
})

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {

  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const day11 = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  )
  console.log("day 11", prettyDOM(day11))
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.

  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  )

  fireEvent.click(getByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.

  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "deleting")).toBeInTheDocument();


  // 7. Wait until the element with the "Add" button is displayed.
await waitForElement(() => getByAltText(appointment, "Add"));


  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
 

});
it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
   // We want to start by finding an existing interview.
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  // With the existing interview we want to find the edit button.
  fireEvent.click(getByAltText(appointment, "Edit"));
  // We change the name and save the interview.
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Tyler Chessa" }
  });

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "saving")).toBeInTheDocument();
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  )
  console.log("day 2", prettyDOM(day))
  await expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  // We want to start by finding an existing interview.
  // With the existing interview we want to find the edit button.
  // We change the name and save the interview.
  // We don't want the spots to change for "Monday", since this is an edit.
  // Read the errors because sometimes they say that await cannot be outside of an async function.


})

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

   // We want to start by finding an existing interview.
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];

  // With the existing interview we want to find the edit button.
  fireEvent.click(getByAltText(appointment, "Edit"));
  // We change the name and save the interview.
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Tyler Chessa" }
  });

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Error"))
  debug()
  expect(getByText(appointment, "Error")).toBeInTheDocument();
});


it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
   // We want to start by finding an existing interview.
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];

  fireEvent.click(getByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  fireEvent.click(getByText(appointment, "Confirm"));
  expect(getByText(appointment, "deleting")).toBeInTheDocument();
  console.log("hey")
  debug()
  await waitForElement(() => getByText(appointment, "Error"))

  expect(getByText(appointment, "Error")).toBeInTheDocument();
 
})

});