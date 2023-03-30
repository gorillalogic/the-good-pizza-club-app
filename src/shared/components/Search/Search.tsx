import { Icon, InputAdornment, TextField } from '@mui/material';
import { forwardRef, useState } from 'react';
import styles from './Search.module.scss';

let timeout: ReturnType<typeof setTimeout>;

interface Props {
  label?: string;
  onSearch?: (search: string) => void;
  minLength?: number;
  debounce?: number;
}

const Search = forwardRef<HTMLInputElement, Props>(
  ({ label, onSearch, minLength = 3, debounce = 500 }, ref) => {
    const [search, setSearch] = useState('');

    const searchChangeHandler = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;

      if (timeout) {
        clearTimeout(timeout);
      }

      if (value.length >= minLength || value.length < search.length) {
        timeout = setTimeout(() => {
          onSearch && onSearch(value);
        }, debounce);
      }

      setSearch(value);
    };

    return (
      <TextField
        inputRef={ref}
        className={styles.search}
        placeholder={label}
        onChange={searchChangeHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>location_on</Icon>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

Search.displayName = 'Search';

export default Search;
