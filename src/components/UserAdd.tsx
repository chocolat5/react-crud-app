import { useState } from "react";
import type { ReactElement, Dispatch } from "react";
import styled from "@emotion/styled";

import type { User } from "@/types";
import type { ValidateError } from "@/helper";
import { StyledButton } from "@/components/UserTable";
import { Error } from "@/components/Error";
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

const StyledButtonAdd = styled(StyledButton)`
  color: #fff;
  background-color: var(--primary);
`;

const StyledButtonCancel = styled(StyledButton)`
  color: var(--primary);
  border: 1px solid var(--primary);
  background: none;
`;

interface UserFormProps {
  onAdd: (user: User) => void;
  setIsAdding: Dispatch<React.SetStateAction<boolean>>;
  error: ValidateError[];
  setErrors: Dispatch<React.SetStateAction<ValidateError[]>>;
}

export function UserAdd({
  onAdd,
  setIsAdding,
  error,
  setErrors,
}: UserFormProps): ReactElement {
  const initialUser: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "Member",
  };
  const [inputUser, setInputUser] = useState<User>(initialUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate
    const validateErrors = validate(inputUser);
    setErrors(validateErrors);
    if (validateErrors.length > 0) return;

    const newUser: User = {
      ...inputUser,
      id: crypto.randomUUID().slice(0, 8),
    };
    onAdd(newUser);
    // reset
    setInputUser(initialUser);
    setErrors([]);
  };

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit}>
        <StyledInput
          placeholder="First Name"
          value={inputUser.firstName}
          onChange={(e) =>
            setInputUser({
              ...inputUser,
              firstName: e.target.value,
            })
          }
        />
        <StyledInput
          placeholder="Last Name"
          value={inputUser.lastName}
          onChange={(e) =>
            setInputUser({
              ...inputUser,
              lastName: e.target.value,
            })
          }
        />
        <StyledInput
          placeholder="Email"
          value={inputUser.email}
          onChange={(e) =>
            setInputUser({
              ...inputUser,
              email: e.target.value,
            })
          }
        />
        <StyledSelect
          value={inputUser.role}
          onChange={(e) =>
            setInputUser({
              ...inputUser,
              role: e.target.value as "Management" | "Member",
            })
          }
        >
          <option value="Management">Management</option>
          <option value="Member">Member</option>
        </StyledSelect>
        <StyledButtonAdd type="submit">Add</StyledButtonAdd>
        <StyledButtonCancel onClick={() => setIsAdding(false)}>
          Cancel
        </StyledButtonCancel>
        {error && <Error error={error} />}
      </form>
    </StyledContainer>
  );
}
