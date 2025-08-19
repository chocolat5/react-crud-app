import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import styled from "@emotion/styled";
import type { User } from "@/types";

import { initialUsers } from "@/data";
import { StyledButton, UserTable } from "@/components/UserTable";
import { UserEdit } from "@/components/UserEdit";
import { UserAdd } from "@/components/UserAdd";
import { getUsers, saveUsers } from "@/utils/helpers";

const StyledContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const StyledTitle = styled.h1`
  margin: 32px 0;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
`;

const StyledButtonAdd = styled(StyledButton)`
  margin: 24px 0;
  color: #fff;
  background-color: var(--primary);
`;

export default function App(): ReactElement {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    const data = getUsers();
    setUsers(data);
  }, []);

  const handleAddUser = (user: User) => {
    saveUsers([...users, user]);
    setUsers([...users, user]);
    setIsAdding(false);
  };

  const handleDeleteUser = (id: string) => {
    const newUsers = users.filter((u) => u.id !== id);
    saveUsers(newUsers);
    setUsers(newUsers);
  };

  const handleEditUser = (id: string) => {
    const [user] = users.filter((u) => u.id === id);
    setEditingUser(user);
  };

  const updateUsers = (users: User[]) => {
    saveUsers(users);
    setUsers(users);
    setEditingUser(null);
  };

  return (
    <StyledContainer>
      <StyledTitle>React CRUD App</StyledTitle>
      {editingUser && (
        <UserEdit
          users={users}
          user={editingUser}
          setUsers={setUsers}
          setEditingUser={setEditingUser}
          updateUsers={updateUsers}
        />
      )}
      {isAdding && <UserAdd onAdd={handleAddUser} setIsAdding={setIsAdding} />}
      {!editingUser && !isAdding && (
        <>
          <UserTable
            users={users}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
          />
          <StyledButtonAdd onClick={() => setIsAdding(true)}>
            Add User
          </StyledButtonAdd>
        </>
      )}
    </StyledContainer>
  );
}
