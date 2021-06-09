import React from 'react';
import { Gender } from '../types';
import { Icon } from "semantic-ui-react";

interface IGenderProps {
  gender: Gender;
}

const GenderIcon = ({ gender }: IGenderProps) => {
  if (gender === 'other') {
    return (
      <div>
        <Icon name='genderless' size='big' />
      </div>
    );
  }
  if (gender === 'male') {
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

export default GenderIcon;