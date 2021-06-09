import React, { useEffect } from "react";
import axios from "axios";
import GenderIcon from './GenderIcon';
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import PatientEntries from './PatientEntries';

const PatientView = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const fetchPatient = async () => {
    try {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!patients[id] || !patients[id].ssn) {
      void fetchPatient();
    }
  }, [dispatch]);


  if (!patients[id]) {
    return null;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h3>{patients[id].name}</h3>
        <GenderIcon gender={patients[id].gender} />
      </div>
      <div>
        <p>ssn: {patients[id].ssn}</p>
        <p>occupation: {patients[id].occupation}</p>
      </div>
      <PatientEntries entries={patients[id].entries} />
    </div>

  );
};

export default PatientView;