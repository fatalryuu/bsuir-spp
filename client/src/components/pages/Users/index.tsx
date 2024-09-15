import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Snackbar, SnackbarContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { socket } from '../../../App';
import { User, UsersFilters } from '../../../types/users';
import { WS_MESSAGES } from '../../../types/ws';
import CreateUserModal from './components/CreateUserModal';
import EditUserModal from './components/EditUserModal';
import UsersHeader from './components/UsersHeader';
import UsersTable from './components/UsersTable';
import { EditUserSchema, schema } from './components/edit-user.schema';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../types/router';
import { deleteCookie } from '../../../helpers/cookies';
import { useAuth } from '../../../hooks/useAuth';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<UsersFilters>({});
  const [users, setUsers] = useState<User[]>([]);
  const [areUsersLoading, setAreUsersLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const editMethods = useForm<EditUserSchema>({
    resolver: zodResolver(schema),
  });

  useAuth();

  useEffect(() => {
    socket.on(WS_MESSAGES.CONNECT_ERROR, () => {
      deleteCookie('access_token');
      navigate(APP_ROUTES.LOGIN);
    });

    socket.on(WS_MESSAGES.TOKEN_ERROR, () => {
      deleteCookie('access_token');
      navigate(APP_ROUTES.LOGIN);
    });

    socket.on(WS_MESSAGES.DELETE_USER_SUCCESS, () => {
      setAreUsersLoading(true);
      socket.emit(WS_MESSAGES.GET_USERS, filters.admin);
    });

    socket.on(WS_MESSAGES.EDIT_USER_SUCCESS, () => {
      setAreUsersLoading(true);
      setIsModalOpen(false);
      socket.emit(WS_MESSAGES.GET_USERS, filters.admin);
    });

    socket.on(WS_MESSAGES.EDIT_USER_ERROR, () => {
      setIsSnackbarOpen(true);
    });

    return () => {
      socket.off(WS_MESSAGES.CONNECT_ERROR);
      socket.off(WS_MESSAGES.TOKEN_ERROR);
      socket.off(WS_MESSAGES.DELETE_USER_SUCCESS);
      socket.off(WS_MESSAGES.EDIT_USER_SUCCESS);
      socket.off(WS_MESSAGES.EDIT_USER_ERROR);
    };
  }, []);

  useEffect(() => {
    socket.emit(WS_MESSAGES.GET_USERS, filters.admin);

    socket.on(WS_MESSAGES.GET_USERS, async (users) => {
      setUsers(users);
      setAreUsersLoading(false);
    });

    return () => {
      socket.off(WS_MESSAGES.GET_USERS);
    };
  }, [filters]);

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

  if (areUsersLoading) return <Typography>Loading...</Typography>;

  return (
    <Box padding={5}>
      <UsersHeader filters={filters} setFilters={setFilters} openModal={handleCreateClick} />

      <UsersTable users={users} handleEditClick={handleEditClick} />

      {editingId ? (
        <FormProvider {...editMethods}>
          <EditUserModal
            open={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            editingId={editingId}
          />
        </FormProvider>
      ) : (
        <CreateUserModal
          open={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          openErrorSnackbar={() => setIsSnackbarOpen(true)}
          filters={filters}
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
