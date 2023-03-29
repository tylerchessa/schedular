import { react, useState } from "react";

function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
function transition(mode, boolean = false) {
  setHistory(prev => boolean ? [...prev.slice(0, -1), mode] : [...prev, mode])
}
function back() {
 setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev))
}
return { mode: history[history.length-1], transition, back };

//   const [mode, setMode] = useState(initial)
//   const [history, setHistory] = useState([initial])
//   function transition(newMode, boolean = false) {
//     if (boolean) {
//       const newHistory = [...history]
//     newHistory.pop() 
//     setHistory([...newHistory, newMode])
//   } else {setHistory([...history, newMode])}
//     setMode(newMode)
//   }
//   function back() {
//     if (history.length > 1) {
//       const newHistory = [...history]
//       newHistory.pop()
//       const back1 = newHistory.length - 1 
//     setMode(newHistory[back1])
//     setHistory(newHistory)
//   }
// }
//   return { mode, transition, back };
}



export default useVisualMode;