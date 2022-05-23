import {
  ChangeEvent,
  FC,
  useMemo,
  useState,
  useContext,
} from 'react';
import { GetServerSideProps } from 'next';
import {
  Grid,
  CardHeader,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  capitalize,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { SaveOutlined, DeleteOutline } from '@mui/icons-material';

import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = [
  'pending',
  'in-progress',
  'finished',
];

interface Props {
  entry: Entry;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouch] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 10) + '...'}>
      <Grid container justifyContent='center' sx={{ marginTop: '2' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada`}
              subheader={`Creada hace: ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New entry'
                autoFocus
                multiline
                label='New entry'
                value={inputValue}
                onChange={onInputValueChange}
                helperText={isNotValid && 'Required'}
                onBlur={() => setTouch(true)}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row={true}
                  value={status}
                  onChange={onStatusChange}>
                  {validStatus.map(status => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      label={capitalize(status)}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'text.secondary',
        }}>
        <DeleteOutline />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;
