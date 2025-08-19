import type { ReactElement } from "react";
import styled from "@emotion/styled";

import type { ValidateError } from "@/utils/validate";

const StyledErrorContainer = styled.div`
  margin: 24px 0;
`;

const StyledErrorText = styled.p`
  color: #e75a3d;
  font-weight: 700;
`;

interface ErrorProps {
  error: ValidateError[];
}

export function Error({ error }: ErrorProps): ReactElement {
  return (
    <StyledErrorContainer>
      {error.map((err) => (
        <StyledErrorText key={err.field}>⚠️ {err.message}</StyledErrorText>
      ))}
    </StyledErrorContainer>
  );
}
