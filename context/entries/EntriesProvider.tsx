import { FC, useReducer, useEffect } from 'react';
import { entriesApi } from '../../api';

import { Entry } from '../../interfaces';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './EntriesReducer';

export interface EntriesState {
  entries: Entry[];
}
interface EntriesProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
const UI_INITIAL_STATE: EntriesState = {
  entries: [],
};
export const EntriesProvider: FC<EntriesProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    entriesReducer,
    UI_INITIAL_STATE
  );

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', {
      description,
    });

    dispatch({
      type: '[Entry] - Add-Entry',
      payload: data,
    });
  };

  const updateEntry = async (entry: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(
        `/entries/${entry._id}`,
        {
          description: entry.description,
          status: entry.status,
        }
      );

      dispatch({
        type: '[Entry] - Update-Entry',
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');

    dispatch({
      type: '[Entry] - Initial-Entries',
      payload: data,
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
