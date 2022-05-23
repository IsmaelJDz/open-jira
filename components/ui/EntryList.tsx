import React, { FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesStatus = useMemo(
    () => entries.filter(entry => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );

  const onDropEntry = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const entryId = event.dataTransfer.getData('text/plain');

    const entry = entries.find(entry => entry._id === entryId)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}>
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            transition: 'all .3s',
          }}>
          {entriesStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
