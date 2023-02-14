"use client";
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./reducer";
import { State } from "./type";

const INITIAL_STATE = {
  user:
    typeof window === "undefined"
      ? ""
      : JSON.parse(localStorage.getItem("user") || "{}") || null,
  isFetching: false,
  error: false,
};

export const UserContext = createContext<[State, React.Dispatch<any>]>([
  INITIAL_STATE,
  () => {},
]);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
