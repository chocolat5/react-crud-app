import { useActionState } from "react";
import type { Dispatch, ReactElement } from "react";
import styled from "@emotion/styled";

import type { User } from "@/types";
import { StyledButton } from "@/components/UserTable";
import { Error } from "@/components/Error";
import type { ValidateError } from "@/utils/validate";
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
  updateUsers: (users: User[]) => void;
}

export function UserEdit({
  users,
  user,
  setEditingUser,
  updateUsers,
}: UserFormProps): ReactElement {
  async function editUser(
    _prevState: { values?: Partial<User>; errors: ValidateError[] } | null,
    formData: FormData
  ) {
    const editedUser: User = {
      ...user,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as User["role"],
    };

    // validate
    const errors = validate(editedUser);
    if (errors.length > 0) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      return { errors, values: editedUser };
    }

    // ユーザーを更新
    const newUsers = users.map((u) => (u.id === user.id ? editedUser : u));

    // データ保存
    updateUsers(newUsers);

    return { errors: [], values: user };
  }

  const [state, formAction, pending] = useActionState(editUser, {
    errors: [],
    values: user,
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
          defaultValue={state.values?.role ?? user.role}
        >
          <option value="Management">Management</option>
          <option value="Member">Member</option>
        </StyledSelect>
        <StyledButtonSave type="submit">
          {pending ? "Waiting..." : "Save"}
        </StyledButtonSave>
        <StyledButtonCancel onClick={() => setEditingUser(null)}>
          Cancel
        </StyledButtonCancel>
        {state.errors.length > 0 && <Error error={state.errors} />}
      </form>
    </StyledContainer>
  );
}
