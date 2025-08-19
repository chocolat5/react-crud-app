import { useActionState } from "react";
import type { ReactElement, Dispatch } from "react";
import styled from "@emotion/styled";

import type { User } from "@/types";
import type { ValidateError } from "@/utils/validate";
import { StyledButton } from "@/components/UserTable";
import { Error } from "@/components/Error";
import { validate } from "@/utils/validate";

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
}

export function UserAdd({ onAdd, setIsAdding }: UserFormProps): ReactElement {
  const initialUser: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "Member",
  };

  async function addUser(
    _prevState: { values?: Partial<User>; errors: ValidateError[] } | null,
    formData: FormData
  ) {
    const newUser: User = {
      id: crypto.randomUUID().slice(0, 8),
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as User["role"],
    };

    // validate
    const errors = validate(newUser);
    if (errors.length > 0) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      return { errors, values: newUser };
    } else {
      onAdd(newUser);
      setIsAdding(false);
      return { errors: [], values: initialUser };
    }
  }

  const [state, formAction, pending] = useActionState(addUser, {
    errors: [],
    values: initialUser,
  });

  return (
    <StyledContainer>
      <form action={formAction}>
        <StyledInput
          name="firstName"
          placeholder="First Name"
          defaultValue={state.values?.firstName ?? ""}
        />
        <StyledInput
          name="lastName"
          placeholder="Last Name"
          defaultValue={state.values?.lastName ?? ""}
        />
        <StyledInput
          name="email"
          placeholder="Email"
          defaultValue={state.values?.email ?? ""}
        />
        <StyledSelect
          name="role"
          defaultValue={state.values?.role ?? initialUser.role}
        >
          <option value="Management">Management</option>
          <option value="Member">Member</option>
        </StyledSelect>
        <StyledButtonAdd type="submit" disabled={pending}>
          {pending ? "Waiting..." : "Add"}
        </StyledButtonAdd>
        <StyledButtonCancel onClick={() => setIsAdding(false)}>
          Cancel
        </StyledButtonCancel>
        {state.errors.length > 0 && <Error error={state.errors} />}
      </form>
    </StyledContainer>
  );
}
