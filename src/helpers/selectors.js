

function getAppointmentsForDay(state, days) {
const filterDays = state.days.filter(day => day.name === days)
if (filterDays.length < 1) {
  return []
}
const filteredAppointments = filterDays[0].appointments.map(appointmentKey => state.appointments[appointmentKey])
return filteredAppointments 
  
}

function getInterview(state, interview) {
  if (interview === null) {
    return null
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
}
}

function getInterviewersForDay(state, days) {
  const filterDays = state.days.filter(day => day.name === days)
  if (filterDays.length < 1) {
    return []
  }
  const filteredInteviewers = filterDays[0].interviewers.map(interviewerKey => state.interviewers[interviewerKey])
  // const filteredInteviewersWithKey = filteredInteviewers.map(interviewer => (
  //  { [interviewer[id]]: {
  //     id: interviewer.id,
  //     name: interviewer.name,
  //     avatar: interviewer.avatar
  //      }})
  // )
  // console.log(filteredInteviewersWithKey)
  return filteredInteviewers
    
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay};