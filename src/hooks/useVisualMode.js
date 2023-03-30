import { react, useState } from "react";

function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  function transition(mode, boolean = false) {
    setHistory(prev => boolean ? [...prev.slice(0, -1), mode] : [...prev, mode]);
  }
  function back() {
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }
  return { mode: history[history.length - 1], transition, back };

}



export default useVisualMode;