import React from 'react';
import { Entry } from '../types';

interface IPatientEntiesProps {
  entries: Entry[];
}

const PatientEntries = ({ entries }: IPatientEntiesProps) => {
  if (!entries || entries === undefined) {
    return null;
  }

  return (
    <div>
      <h4>entries</h4>
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <div>
              {entry.date} {entry.description}
            </div>
            <ul>
              {entry.diagnosisCodes?.map((dCode, i) => (
                <li key={i}>
                  {dCode}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

/**/
export default PatientEntries;