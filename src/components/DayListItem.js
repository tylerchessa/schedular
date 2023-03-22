import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  
  function formatSpots() {

    return props.spots < 1 ? "no spots remaining" 
    : props.spots < 2 ? "1 spot remaining"
    :`${props.spots} spots remaining` 

  //   if (props.spots === 0) {
  //     return "no spots remaining"
  //   }
  //   if (props.spots === 1) {
  //     return "1 spot remaining"
  //   } else {return props.spots + " spots remaining"}
  }
  const dayClass = classNames('day-list__item', 
  { 'day-list__item--selected': props.selected, 'day-list__item--full': !props.spots }) 

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots()}</h3>
    </li>
  );
}
