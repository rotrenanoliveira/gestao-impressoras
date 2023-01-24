import styled, { css } from "styled-components";

const ACTIONS_TYPE = {
  income: "green-500",
  outcome: "red-500",
  register: "blue-700",
} as const;

interface ActionsProps {
  action: keyof typeof ACTIONS_TYPE;
}

export const PrinterInkStockContainer = styled.section`
  width: 100%;
  margin-top: 2rem;
`;

export const PrinterInfoContainer = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["blue-400"]};

  section {
    display: flex;
    align-items: start;
    justify-content: space-between;
  }
`;

export const PrinterTitle = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  text-transform: uppercase;

  svg {
    color: ${(props) => props.theme["blue-700"]};
  }
`;

export const PrinterInkStockContent = styled.div`
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

export const InkStockContainer = styled.div`
  margin-top: 2rem;

  table {
    width: 100%;
    margin-top: 1rem;
    border-spacing: 0;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme["blue-400"]};

    th {
      font-weight: 600;
      text-transform: uppercase;
      color: ${(props) => props.theme["blue-700"]};

      padding: 1rem;
      background-color: ${(props) => props.theme["blue-200"]};

      &:first-child {
        border-top-left-radius: 8px;
      }

      &:last-child {
        border-top-right-radius: 8px;
      }
    }

    tbody {
      border: 1px solid red;

      tr {
        border: 1px solid red;
      }
    }

    td {
      padding: 1rem;
      text-align: center;
      text-transform: capitalize;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const ActionButton = styled.button<ActionsProps>`
  font-weight: 400;
  font-size: 0.875rem;

  cursor: pointer;

  border: 0;
  padding: 0.5rem 2rem;
  border-radius: 9999px;
  background-color: transparent;
  color: ${(props) => props.theme[ACTIONS_TYPE[props.action]]};
  border: 1px solid ${(props) => props.theme[ACTIONS_TYPE[props.action]]};

  transition: all 0.3s;

  &:hover {
    opacity: 0.85;
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme[ACTIONS_TYPE[props.action]]};
  }

  ${(props) =>
    props.action === "register" &&
    css`
      color: ${props.theme.white};
      background: ${props.theme["blue-700"]};
    `}
`;
