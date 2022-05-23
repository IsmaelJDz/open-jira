import { FC, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './UIReducer';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

interface UIProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };

  const closeSideMenu = () =>
    dispatch({ type: 'UI - Close Sidebar' });

  const setIsAddingEntry = (isAdding: boolean) =>
    dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });

  const startDragging = () =>
    dispatch({ type: 'UI - Start Dragging' });

  const endDragging = () => dispatch({ type: 'UI - End Dragging' });

  return (
    //<UIContext.Provider value={{ sideMenuOpen: state.sideMenuOpen }}>
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}>
      {children}
    </UIContext.Provider>
  );
};
