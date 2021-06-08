import patientsData from '../data/patients';
import { PatientEntry, NewPatientEntry, PublicPatient } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<PatientEntry> = patientsData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: []
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientById = (id: string): PatientEntry | undefined => {
  const findPatient = patientsData.find(p => p.id === id);
  findPatient ? findPatient.entries = [] : null;
  return findPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientById
};