import {react, useState} from "react";
import { useEffect } from "react";
import axios from "axios";


function useApplicationData() {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}    
})
const setDay = day => setState({ ...state, day });

useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then((all) => {
   setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
  })
}, [])

function findDay(){
  let day;
  switch (state.day) {
    case "Monday": 
    day = 0;
    break;
    case "Tuesday": 
    day = 1;
    break;
    case "Wednesday": 
    day = 2;
    break;
    case "Thursday": 
    day = 3;
    break;
    case "Friday": 
    day = 4;
    break;
  }
  return day
};

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.put(`/api/appointments/${id}`, appointment)
  .then(() => {
    const day = findDay()
    const newState = {...state}
    newState.days[day].spots -=1
    newState.appointments = appointments
    console.log("new", newState)
    setState(newState)
  })   
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.delete(`/api/appointments/${id}`)
  .then(() => {
    const day = findDay()
    const newState = {...state}
    newState.days[day].spots +=1
    newState.appointments = appointments
    setState(newState)
  })
}
return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
};

export default useApplicationData ;