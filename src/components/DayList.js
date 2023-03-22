import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  // if (!props.day) {
  //   return [];
  // }
  const dayListArray = props.days ? props.days.map((day)=> {
    return <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}  
      />
  }) : [];
  return <ul>{dayListArray}</ul>
}

export default DayList;