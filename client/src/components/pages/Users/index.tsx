import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Snackbar, SnackbarContent, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getUsers } from '../../../api/users';
import { User, UsersFilters } from '../../../types/users';
import CreateUserModal from './components/CreateUserModal';
import EditUserModal from './components/EditUserModal';
import UsersHeader from './components/UsersHeader';
import UsersTable from './components/UsersTable';
import { schema } from './components/edit-user.schema';
import { EditUserSchema } from './components/edit-user.schema';

const UsersPage: React.FC = () => {
  const [filters, setFilters] = useState<UsersFilters>({});
  const { data, isLoading: areUsersLoading } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => getUsers({ filters }),
    placeholderData: keepPreviousData,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const editMethods = useForm<EditUserSchema>({
    resolver: zodResolver(schema),
  });

  const handleCreateClick = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEditClick = async (user: User) => {
    const setValue = editMethods.setValue;

    setValue('fullName', user.fullName);
    setValue('email', user.email);
    setValue('admin', user.admin);

    setEditingId(user.id);
    setIsModalOpen(true);
  };

  if (areUsersLoading || !data) return <Typography>Loading...</Typography>;

  return (
    <Box padding={5}>
      <UsersHeader filters={filters} setFilters={setFilters} openModal={handleCreateClick} />

      <UsersTable users={data.users} handleEditClick={handleEditClick} />

      {editingId ? (
        <FormProvider {...editMethods}>
          <EditUserModal
            open={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            openErrorSnackbar={() => setIsSnackbarOpen(true)}
            editingId={editingId}
          />
        </FormProvider>
      ) : (
        <CreateUserModal
          open={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          openErrorSnackbar={() => setIsSnackbarOpen(true)}
        />
      )}

      <Snackbar
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent
          message="User with this email already exists"
          style={{ backgroundColor: '#BA1D1DFF' }}
        />
      </Snackbar>
    </Box>
  );
};

export default UsersPage;
