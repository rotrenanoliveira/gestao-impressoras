import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 8px;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.white};
  /* background-color: ${(props) => props.theme["blue-100"]}; */

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 1rem;
      border: 0;
      border-radius: 8px;
      color: ${(props) => props.theme["gray-800"]};
      background: ${(props) => props.theme["blue-200"]};

      &::placeholder {
        color: ${(props) => props.theme["blue-700"]};
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      color: ${(props) => props.theme.white};
      background-color: ${(props) => props.theme["green-500"]};
      font-size: 1.25rem;
      font-weight: 600;
      padding: 0 1.25rem;
      border-radius: 8px;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        transition: background-color 0.2s;
        background-color: ${(props) => props.theme["green-700"]};
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  border: 0;
  line-height: 0;
  background: transparent;
  cursor: pointer;

  color: ${(props) => props.theme["gray-800"]};
`;
