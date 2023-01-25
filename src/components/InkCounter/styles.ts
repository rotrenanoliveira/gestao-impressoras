import styled from "styled-components";

const INK_COLORS = {
  black: "black",
  yellow: "yellow-500",
  red: "red-500",
  blue: "blue-700",
} as const;

interface LeftBarProps {
  inkColor: keyof typeof INK_COLORS;
}

export const InkCounterContainer = styled.div`
  gap: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const LeftBar = styled.div<LeftBarProps>`
  width: 8px;
  height: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.theme[INK_COLORS[props.inkColor]]};
`;

export const CounterContainer = styled.div`
  strong {
    display: block;
    text-transform: uppercase;
    font-size: 0.875rem;
    opacity: 0.85;
  }

  span {
    display: block;
    font-size: 1.5rem;
    text-align: right;
  }
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CounterButton = styled.button`
  border: 0;
  line-height: 0;
  cursor: pointer;
  margin-right: 0.5rem;
  border-radius: 9999px;
  background: transparent;

  transition: all 0.3s;
`;

export const AddInk = styled(CounterButton)`
  color: ${(props) => props.theme["green-500"]};

  &:hover {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme["green-500"]};
  }
`;

export const RemoveInk = styled(CounterButton)`
  color: ${(props) => props.theme["red-500"]};

  &:hover {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme["red-500"]};
  }
`;
