import patientsData from '../data/patients.json';
import { PatientEntry, nonSensitivePatientEntry } from '../types';

const patients: Array<PatientEntry> = patientsData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): nonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};