import { useState } from "react";
import type { Dispatch, ReactElement } from "react";
import styled from "@emotion/styled";

import type { User } from "@/types";
import { StyledButton } from "@/components/UserTable";
import { Error } from "@/components/Error";
import type { ValidateError } from "@/helper";
import { validate } from "@/helper";

const StyledContainer = styled.div`
  width: 480px;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  margin: 24px 0;
  padding: 12px;
  font-size: 1.5rem;
`;

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  margin: 24px 0;
  padding: 12px;
  font-size: 1.5rem;
`;

const StyledButtonSave = styled(StyledButton)`
  color: #fff;
  background-color: var(--primary);
`;

const StyledButtonCancel = styled(StyledButton)`
  color: var(--primary);
  border: 1px solid var(--primary);
  background: none;
`;

interface UserFormProps {
  users: User[];
  user: User;
  setUsers: Dispatch<React.SetStateAction<User[]>>;
  setEditingUser: Dispatch<React.SetStateAction<User | null | undefined>>;
  error: ValidateError[];
  setErrors: Dispatch<React.SetStateAction<ValidateError[]>>;
}

export function UserEdit({
  users,
  user,
  setUsers,
  setEditingUser,
  error,
  setErrors,
}: UserFormProps): ReactElement {
  const [currentUser, setCurrentUser] = useState<User>(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate
    const validateErrors = validate(currentUser);
    setErrors(validateErrors);
    if (validateErrors.length > 0) return;

    const newUsers = users.map((u) =>
      u.id === currentUser.id ? currentUser : u
    );
    localStorage.setItem("user_data", JSON.stringify(newUsers));
    setUsers(newUsers);
    setEditingUser(null);
    setErrors([]);
  };

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit}>
        <StyledInput
          placeholder="First Name"
          value={currentUser.firstName}
          onChange={(e) =>
            setCurrentUser({
              ...currentUser,
              firstName: e.target.value,
            })
          }
          required
        />
        <StyledInput
          placeholder="Last Name"
          value={currentUser.lastName}
          onChange={(e) =>
            setCurrentUser({
              ...currentUser,
              lastName: e.target.value,
            })
          }
          required
        />
        <StyledInput
          placeholder="Email"
          value={currentUser.email}
          onChange={(e) =>
            setCurrentUser({
              ...currentUser,
              email: e.target.value,
            })
          }
          required
        />
        <StyledSelect
          value={currentUser.role}
          onChange={(e) =>
            setCurrentUser({
              ...currentUser,
              role: e.target.value as "Management" | "Member",
            })
          }
        >
          <option value="Management">Management</option>
          <option value="Member">Member</option>
        </StyledSelect>
        <StyledButtonSave type="submit">Save</StyledButtonSave>
        <StyledButtonCancel onClick={() => setEditingUser(null)}>
          Cancel
        </StyledButtonCancel>
        {error && <Error error={error} />}
      </form>
    </StyledContainer>
  );
}
