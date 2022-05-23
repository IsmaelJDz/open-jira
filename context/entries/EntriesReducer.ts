import { Entry } from '../../interfaces';
import { EntriesState } from './';

type UIActionType =
  | { type: '[Entry] - Add-Entry'; payload: Entry }
  | { type: '[Entry] - Update-Entry'; payload: Entry }
  | { type: '[Entry] - Initial-Entries'; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: UIActionType
): EntriesState => {
  switch (action.type) {
    case '[Entry] - Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case '[Entry] - Update-Entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };

    case '[Entry] - Initial-Entries':
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};
