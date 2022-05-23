import { useState, ChangeEvent, useContext } from 'react';
import { AddCircleOutlined, SaveOutlined } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const validationError = touched && inputValue.length <= 0;

  const onSaveDate = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={
              validationError ? 'Este campo es obligatorio' : ''
            }
            error={validationError}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button
              variant='text'
              onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={onSaveDate}
              endIcon={<SaveOutlined />}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlined />}
          fullWidth
          variant='outlined'
          onClick={() => setIsAddingEntry(true)}>
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
