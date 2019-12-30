import React from "react";
import { increment, decrement } from "../actions";
import { useDispatch, useSelector } from "react-redux";
export default function() {
  let counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      Counter :{counter}
      <br />
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
