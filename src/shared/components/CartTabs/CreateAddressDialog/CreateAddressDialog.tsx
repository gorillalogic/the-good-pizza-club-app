import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Address } from '../../../../models/Address';
import { getGeocode, getGeolocation } from '../../../utils/geolocation';
import Map from '../../Map/Map';
import Search from '../../Search/Search';
import styles from './CreateAddressDialog.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<Address>) => void;
}

interface FormValues {
  name: string;
  description: string;
  coords: {
    lat: number;
    lng: number;
  };
}

const CreateAddressDialog: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const [loadingCoords, setLoadingCoords] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<FormValues>();
  const coords = form.watch('coords');

  const closeHandler = () => {
    onClose();

    setTimeout(() => {
      form.reset();
    }, 500);
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    form.handleSubmit((values: FormValues) => {
      onConfirm({
        name: values.name,
        description: values.description,
        lat: values.coords.lat,
        lng: values.coords.lng,
      });
    })();
  };

  const currentLocationHandler = () => {
    setLoadingCoords(true);
    getGeolocation()
      .then((position) =>
        getGeocode({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )
      .then((results) => {
        const [address] = results;
        const { location } = address.geometry;

        form.setValue('coords', { lat: location.lat(), lng: location.lng() });
        form.setValue('description', address.formatted_address);
      })
      .finally(() => {
        setLoadingCoords(false);
      });
  };

  let content: React.ReactNode;

  useEffect(() => {
    if (!open) return;

    const { Autocomplete } = google.maps.places;
    let autocomplete: google.maps.places.Autocomplete;

    const timeout = setTimeout(() => {
      if (searchInputRef.current) {
        autocomplete = new Autocomplete(searchInputRef?.current);
        autocomplete.addListener('place_changed', () => {
          const { formatted_address, geometry } = autocomplete.getPlace();

          if (geometry && geometry.location && formatted_address) {
            form.setValue('coords', {
              lat: geometry.location.lat(),
              lng: geometry.location.lng(),
            });
            form.setValue('description', formatted_address);
          }
        });
      }
    });

    return () => {
      const element = document.getElementsByClassName('pac-container')[0];

      timeout && clearTimeout(timeout);
      autocomplete && autocomplete.unbindAll();
      element && element.remove();
    };
  }, [open, coords]);

  if (coords) {
    const options = {
      lat: coords.lat,
      lng: coords.lng,
      zoom: 16,
    };
    const markers = [{ lat: coords.lat, lng: coords.lng }];

    content = (
      <>
        <Map options={options} markers={markers} />
        <span>{form.getValues('description')}</span>
        <TextField
          {...form.register('name', { required: true })}
          className={styles.input}
          placeholder="Add a name for this address"
        />
        <button className={styles.clear} onClick={() => form.reset()}>
          This isn&apos;t the one?
        </button>
      </>
    );
  } else {
    content = (
      <>
        <p>
          Please turn on your location services to auto-locate your current
          addresss.
        </p>
        <span>Or search for it here:</span>
        <Search ref={searchInputRef} label="Search for specific address" />
      </>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} className={styles.dialog}>
      <form onSubmit={submitHandler}>
        <DialogTitle className={styles.title}>Where to, tho?</DialogTitle>
        <DialogContent className={styles.content}>
          <>
            {loadingCoords && <CircularProgress color="primary" />}
            {!loadingCoords && !coords && (
              <Button
                variant="outlined"
                color="error"
                onClick={currentLocationHandler}
              >
                Use my current location
              </Button>
            )}
            {content}
          </>
        </DialogContent>
        <DialogActions className={styles.actions}>
          <Button variant="outlined" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={!coords || !form.formState.isValid}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateAddressDialog;
