import type { User } from "@/types";
import type { ReactElement } from "react";
import styled from "@emotion/styled";

const StyledTable = styled.table`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border-bottom: 2px solid var(--white);
`;

const StyledTableHead = styled.th`
  padding: 12px;
  border-bottom: 2px solid var(--white);
  font-size: 1.5rem;
  text-align: left;
`;

const StyledTableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid var(--white);
  text-align: left;
`;

export const StyledButton = styled.button`
  display: inline-block;
  border-radius: 4px;
  width: 72px;
  margin: 0 4px;
  padding: 8px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyledButtonEdit = styled(StyledButton)`
  color: #fff;
  background-color: var(--primary);
`;

const StyledButtonDelete = styled(StyledButton)`
  color: var(--primary);
  border: 1px solid var(--primary);
  background: none;
`;

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function UserTable({
  users,
  onDelete,
  onEdit,
}: UserTableProps): ReactElement {
  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTableHead>ID</StyledTableHead>
          <StyledTableHead>First Name</StyledTableHead>
          <StyledTableHead>Last Name</StyledTableHead>
          <StyledTableHead>Email</StyledTableHead>
          <StyledTableHead>Role</StyledTableHead>
          <StyledTableHead></StyledTableHead>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <StyledTableCell colSpan={6}>No users</StyledTableCell>
          </tr>
        ) : (
          <>
            {users.map((user: User) => (
              <tr key={user.id}>
                <StyledTableCell>{user.id}</StyledTableCell>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.role}</StyledTableCell>
                <StyledTableCell>
                  <StyledButtonEdit onClick={() => onEdit(user.id)}>
                    Edit
                  </StyledButtonEdit>
                  <StyledButtonDelete onClick={() => onDelete(user.id)}>
                    Delete
                  </StyledButtonDelete>
                </StyledTableCell>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </StyledTable>
  );
}
