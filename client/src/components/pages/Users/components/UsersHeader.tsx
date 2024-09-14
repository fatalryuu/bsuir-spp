import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { UsersFilters } from '../../../../types/users';

interface UsersHeaderProps {
  filters: UsersFilters;
  setFilters: React.Dispatch<React.SetStateAction<UsersFilters>>;
  openModal: () => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ filters, setFilters, openModal }) => {
  const handleFiltersChange = (e: SelectChangeEvent) => {
    if (e.target.value === '') {
      setFilters({ admin: undefined });
      return;
    }

    if (e.target.value === 'true') {
      setFilters({ admin: true });
      return;
    }

    setFilters({ admin: false });
  };

  const selectValue = useMemo(() => {
    if (filters.admin === undefined) {
      return '';
    }

    if (filters.admin) {
      return 'true';
    }

    return 'false';
  }, [filters]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Users List
      </Typography>

      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Filters</InputLabel>
        <Select value={selectValue} onChange={handleFiltersChange} label="Filters">
          <MenuItem value="">None</MenuItem>
          <MenuItem value="true">Admins</MenuItem>
          <MenuItem value="false">Not admins</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '16px' }}
        onClick={openModal}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <AddIcon />
          Create User
        </Box>
      </Button>
    </Box>
  );
};

export default UsersHeader;
