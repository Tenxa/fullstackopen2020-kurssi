import React from 'react';
import { Item } from 'semantic-ui-react';
import { Entry } from '../types';
import EntryIcon from './EntryIcon';

const SemanticItem: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header as='div'>{entry.date}</Item.Header>
        <Item.Description>{entry.description}</Item.Description>
      </Item.Content>
      <Item.Image><EntryIcon entry={entry}/></Item.Image>
    </Item>
  );
};

export default SemanticItem;