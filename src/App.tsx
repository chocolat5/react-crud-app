import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import styled from "@emotion/styled";
import type { User } from "@/types";

import { initialUsers } from "@/data";
import { StyledButton, UserTable } from "@/components/UserTable";
import { UserEdit } from "@/components/UserEdit";
import { UserAdd } from "@/components/UserAdd";
import type { ValidateError } from "@/helper";

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
  const [error, setErrors] = useState<ValidateError[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("user_data");
    if (raw) setUsers(JSON.parse(raw));
  }, []);

  const handleAddUser = (user: User) => {
    localStorage.setItem("user_data", JSON.stringify([...users, user]));
    setUsers([...users, user]);
    setIsAdding(false);
  };

  const handleDeleteUser = (id: string) => {
    const newUsers = users.filter((u) => u.id !== id);
    localStorage.setItem("user_data", JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  const handleEditUser = (id: string) => {
    const [user] = users.filter((u) => u.id === id);
    setEditingUser(user);
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
          error={error}
          setErrors={setErrors}
        />
      )}
      {isAdding && (
        <UserAdd
          onAdd={handleAddUser}
          setIsAdding={setIsAdding}
          error={error}
          setErrors={setErrors}
        />
      )}
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
