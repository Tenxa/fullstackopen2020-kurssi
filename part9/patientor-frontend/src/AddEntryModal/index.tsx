import React from 'react';
import { Menu, Modal, Segment } from 'semantic-ui-react';
import { NewEntry } from '../types';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthCare from './AddOccupationalHealthCareForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [activeItem, setActiveItem] = React.useState<string>('');

  React.useEffect(() => {
    setActiveItem('Heath Check');
  }, []);

  const ConditionalForm = () => {
    if (activeItem === 'Heath Check') {
      return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else if (activeItem === 'Hospital') {
      return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else if (activeItem === 'Occupational Healthcare') {
      return <AddOccupationalHealthCare onSubmit={onSubmit} onCancel={onClose} />;
    }
    return null;
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry for patient</Modal.Header>
      <Menu attached='top' tabular>
        <Menu.Item
          name='Heath Check'
          active={activeItem === 'Heath Check'}
          onClick={() => setActiveItem('Heath Check')}
        />
        <Menu.Item
          name='Hospital'
          active={activeItem === 'Hospital'}
          onClick={() => setActiveItem('Hospital')}
        />
        <Menu.Item
          name='Occupational Healthcare'
          active={activeItem === 'Occupational Healthcare'}
          onClick={() => setActiveItem('Occupational Healthcare')}
        />
      </Menu>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <ConditionalForm />
      </Modal.Content>
    </Modal>
  );
};


export default AddEntryModal;