import React from "react"

function getAppointmentsForDay(state, days) {
const filterDays = state.days.filter(day => day.name === days)
if (filterDays.length < 1) {
  return []
}
const filteredAppointments = filterDays[0].appointments.map(appointmentKey => state.appointments[appointmentKey])

return filteredAppointments 
  
}

export { getAppointmentsForDay };