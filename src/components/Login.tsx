import { useActionState } from "react";
import type { ReactElement } from "react";
import styled from "@emotion/styled";

import type { Auth } from "@/types";
import { StyledButton } from "@/components/UserTable";

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

const StyledButtonLogin = styled(StyledButton)`
  color: #fff;
  background-color: var(--primary);
`;

const AUTH_USER = {
  email: "test@example.com",
  password: "password123",
};

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps): ReactElement {
  async function handleLogin(
    _prevState: { values?: Partial<Auth> } | null,
    formData: FormData
  ) {
    const auth: Auth = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    if (
      auth.email === AUTH_USER.email &&
      auth.password === AUTH_USER.password
    ) {
      onLogin();
      return { values: AUTH_USER };
    } else {
      return { values: AUTH_USER };
    }
  }

  const [state, formAction, pending] = useActionState(handleLogin, {
    values: AUTH_USER,
  });

  return (
    <StyledContainer>
      <p>Use the following dummy email & password to login</p>
      <form action={formAction}>
        <StyledInput
          name="email"
          placeholder="Email"
          defaultValue={state.values?.email ?? ""}
        />
        <StyledInput
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={state.values?.password ?? ""}
        />
        <StyledButtonLogin type="submit">
          {pending ? "Waiting..." : "Login"}
        </StyledButtonLogin>
      </form>
    </StyledContainer>
  );
}
