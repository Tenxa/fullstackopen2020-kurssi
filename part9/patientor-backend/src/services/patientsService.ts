import patientsData from '../data/patients';
import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find((p: Patient) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient,
    entries: []
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (id: string, entry: NewEntry): Patient => {
  if (!entry.type) throw new Error("Entry type is not defined");

  const patient = getPatientById(id);
  if (!patient) throw new Error("No patient found with this id");

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  const newPatientEntry = {
    ...patient,
    entries: patient.entries.concat(newEntry)
  };
  const patientIndex = patients.findIndex(patient => patient.id === id);
  patients[patientIndex] = newPatientEntry;

  return newPatientEntry;

};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntryToPatient
};