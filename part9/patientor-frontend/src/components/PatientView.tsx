import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientView = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = { ...patients[id] };

  const fetchPatient = async () => {
    try {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!patient.ssn) {
      void fetchPatient();
    }
  }, [dispatch]);


  const GenderIcon = () => {
    if (patient.gender === 'other') {
      return (
        <div>
          <Icon name='genderless' size='big' />
        </div>
      );
    }
    if (patient.gender === 'male') {
      return (
        <div>
          <Icon name='mars' size='big' />
        </div>
      );
    }
    return (
      <div>
        <Icon name='venus' size='big' />
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h3>{patient.name}</h3>
        <GenderIcon />
      </div>
      <div>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    </div>

  );
};

export default PatientView;