import React from 'react';
import { Item } from 'semantic-ui-react';
import { Entry } from '../types';
import SemanticItem from '../components/SemanticItem';

const divList = {
  borderBottom: "solid 2px slategrey",
  borderTop: "solid 2px slategrey",
  margin: "0px 10em 0px 0em"
};

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
      <div style={divList}>
        <Item.Group divided style={{padding: "1em 1em 1em 1em"}}>
          {entries.map((entry) => (
            <SemanticItem key={entry.id} entry={entry} />
          ))}
        </Item.Group>
      </div>
    </div>
  );
};

/**/
export default PatientEntries;