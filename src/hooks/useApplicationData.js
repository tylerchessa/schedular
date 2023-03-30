import { react, useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

  function findDay() {
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
    return day;
  };



  function updateSpots(appointments) {
    let count = 0;
    const day = findDay()
    const days = [...state.days]
    const appointmentIds = [...days[day].appointments]
    for (let eachAppointment of appointmentIds) {
      if (!appointments[eachAppointment].interview) {
        count ++
      }
    }
    console.log(days[day])
   const  newDayObj = {...days[day], spots: count}
    days[day] = newDayObj
    return days
  }
   // const dayOfWeek = state.days.find((day) =>
    //   day.name === state.day
    // );
    // let counter = 0;
    // dayOfWeek.appointments.forEach((id) => {
    //   if (appointments[id].interview === null) {
    //     counter++;
    //   }
    // });
    // const newDay = { ...dayOfWeek, spots: counter };
    // const newDayArray = [...state.days];
    // newDayArray[dayOfWeek.id - 1] = newDay;
    // return newDayArray;

  function bookInterview(id, interview) {
    console.log(interview)
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
        // let count;
        // const day = findDay()
        // const days = [...state.days]
        // const appointmentIds = [...days[day].appointments]
        // for (eachAappointment of appointmentIds) {
        //   if (appointments.eachAappointment.interview) {
        //     count ++
        //   }
        // }
        // days[day].spots = count
        // console.log(appointments)
        // console.log(days)
        const days = updateSpots(appointments);
        console.log(days);
        setState({ ...state, appointments, days });
      })
  }
  // const newState = {...state}
  // newState.days = {...state.days}
  // newState.days = [...days]
  // newState.days[day].spots -=1
  // newState.appointments = appointments
  // console.log("new", newState)
  // setState(newState)
  // const days = updateSpots(state, appointments)
  // setState({...state, appointments, days})


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
        // let count;
        // const day = findDay()
        // const days = [...state.days]
        // const appointmentIds = [...days[day].appointments]
        // for (eachAappointment of appointmentIds) {
        //   if (appointments.eachAappointment.interview) {
        //     count ++
        //   }
        // }
        // days[day].spots = count
        // const spots = appointments
        // console.log(appointments)
        // console.log(days)
        const days = updateSpots(appointments);
        setState({ ...state, appointments, days });
      })
  
    // const day = findDay()
    // const newState = {...state}
    // newState.days[day].spots +=1
    // newState.appointments = appointments
    // setState(newState)
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;