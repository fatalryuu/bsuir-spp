import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { User } from '../../../../types/users';
import ConfirmModal from '../../../common/ConfirmModal';
import { socket } from '../../../../App';
import { WS_MESSAGES } from '../../../../types/ws';

interface UsersTableProps {
  users: User[];
  handleEditClick: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, handleEditClick }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 300 }}>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography p={3} fontSize={30} width="100%" textAlign="center">
                    No users in the database
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img
                        src={user.avatarUrl}
                        alt="avatar"
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                      {user.fullName}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.admin ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(user.id)} color="error">
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditClick(user)}
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal
        open={isConfirmModalOpen}
        text="Are you sure you want to delete this user?"
        handleClose={() => setIsConfirmModalOpen(false)}
        handleSubmit={() => socket.emit(WS_MESSAGES.DELETE_USER, selectedId!)}
      />
    </>
  );
};

export default UsersTable;
