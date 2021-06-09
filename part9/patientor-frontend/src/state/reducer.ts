import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    // same as ADD_PATIENT
    // exercise 9.17 "you'll need to define a new action type for updating an individual patient's data."
    // But ADD_PATIENT does update patient id [action.payload.id] is an existing patient.
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};


export const updatePatient = (patient: Patient) => {
  const action: Action = {
    type: "UPDATE_PATIENT" as const,
    payload: patient
  };
  return action;
};

export const addPatient = (patient: Patient) => {
  const action: Action = {
    type: "ADD_PATIENT" as const,
    payload: patient
  };
  return action;
};

export const setPatientList = (patients: Patient[]) => {
  const action: Action = {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
  return action;
};