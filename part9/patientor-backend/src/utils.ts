import { NewPatient, Gender, NewEntry, HealthCheckRating, Discharge, SickLeave } from './types';


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown, field: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`incorrect or missing ${field}`);
  }
  return string;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date:' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealtcheck = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHeathcheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealtcheck(rating)) {
    throw new Error('Incorrect or missign HealtCheckRating');
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
  if (codes === undefined) return undefined;

  if (!Array.isArray(codes)) {
    throw new Error('Diagnosis codes have to be undefined or an array');
  }

  if (!(codes as string[]).every(c => isString(c))) {
    throw new Error('Codes must be strings');
  }

  return codes as string[];
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!(typeof discharge === 'object' && discharge !== null)) throw new Error('Wrong or missing discharge');

  const keys = Object.keys(discharge);
  if (!(keys.includes('date') && keys.includes('criteria'))) throw new Error('Discharge needs to have date and criteria as fields');

  const { date, criteria } = discharge as Discharge;

  return {
    date: parseDate(date),
    criteria: parseString(criteria, 'criteria')
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (sickLeave === undefined) return undefined;
  if (!(typeof sickLeave === 'object' && sickLeave !== null)) throw new Error('Wrong or null sick leave');

  const keys = Object.keys(sickLeave);
  if (!(keys.includes('startDate') && keys.includes('endDate'))) throw new Error('SickLeave needs to have start and end dates');

  const { startDate, endDate } = sickLeave as SickLeave;

  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate)
  };
};

const parseEntryType = (type: unknown) => {
  switch (type) {
    case 'HealthCheck':
      return 'HealthCheck' as const;
    case 'OccupationalHealthcare':
      return 'OccupationalHealthcare' as const;
    case 'Hospital':
      return 'Hospital' as const;
    default:
      throw new Error('Wrong or unspecified type');
  }
};



type FieldsPatient = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: FieldsPatient): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation')
  };

  return newPatient;
};


type FieldsEntry = { type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, discharge?: unknown, employerName?: unknown, sickLeave?: unknown, healthCheckRating?: unknown };

export const parseEntry = ({ type, description, date, specialist, diagnosisCodes, discharge, employerName, sickLeave, healthCheckRating }: FieldsEntry): NewEntry => {
  const newEntryBase = {
    date: parseDate(date),
    specialist: parseString(specialist, 'specialist'),
    type: parseEntryType(type),
    description: parseString(description, 'description'),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };

  switch (newEntryBase.type) {
    case 'HealthCheck':
      return {
        ...newEntryBase,
        type: 'HealthCheck',
        healthCheckRating: parseHeathcheckRating(healthCheckRating)
      };

    case 'Hospital':
      return {
        ...newEntryBase,
        type: 'Hospital',
        discharge: parseDischarge(discharge)
      };

    case 'OccupationalHealthcare':
      return {
        ...newEntryBase,
        type: 'OccupationalHealthcare',
        employerName: parseString(employerName, 'employer name'),
        sickLeave: parseSickLeave(sickLeave)
      };

    default:
      throw new Error('type has to be HealthCheck | Hospital | OccupationalHealthcare');
  }
};

//export default toNewPatient;