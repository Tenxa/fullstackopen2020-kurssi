import React, { useEffect } from "react";
import axios from "axios";
import GenderIcon from './GenderIcon';
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { NewEntry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import PatientEntries from './PatientEntries';
import { Button, Divider } from "semantic-ui-react";
import AddEntryModal from '../AddEntryModal';

const PatientView = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  //const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    //setError(undefined);
  };

  const fetchPatient = async () => {
    try {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(data));
    } catch (error) {
      console.log(error);
    }
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(updatePatient(data));
      closeModal();
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

      <Divider hidden />
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
      <Button onClick={() => openModal()}>Add New Entry For Patient</Button>
    </div>
  );
};

export default PatientView;