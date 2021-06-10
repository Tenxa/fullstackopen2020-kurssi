import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Entry } from '../types';

const EntryIcon: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <Icon name='user md' size='big' />;
    case "Hospital":
      return <Icon name='hospital' size='big' />;
    case "OccupationalHealthcare":
      return <Icon name='stethoscope' size='big' />;
    default:
      return <Icon name='first aid' size='big' />;
  }
};

export default EntryIcon;