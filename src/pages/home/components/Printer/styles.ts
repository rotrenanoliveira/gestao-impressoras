import styled from "styled-components";

interface InkStatusProps {
  hasAlert: boolean;
}

export const PrinterContainer = styled.div<InkStatusProps>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${(props) => (props.hasAlert ? props.theme["red-100"] : props.theme["blue-100"])};
`;

export const PrinterInfo = styled.div`
  strong,
  span {
    text-transform: uppercase;
    display: block;
  }
`;

export const InkStatus = styled.div<InkStatusProps>`
  margin-top: 1rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 0.875rem;
    text-transform: none;
  }

  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    color: ${(props) => (props.hasAlert ? props.theme["red-500"] : props.theme["green-300"])};
  }
`;

export const RequestInkButton = styled.button`
  border: 0;
  border-radius: 8px;
  background: transparent;

  flex: 1;
  margin-left: 2rem;
  height: 100%;

  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  transition: all 0.2s;

  cursor: pointer;

  &:hover {
    background-color: #f2dee0;
  }

  strong {
    font-size: 0.875rem;
  }
`;
