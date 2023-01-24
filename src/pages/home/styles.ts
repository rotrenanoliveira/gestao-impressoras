import styled from "styled-components";

export const HomeContainer = styled.div`
  width: calc(100vw - 4rem);
  margin: 2rem auto;

  @media (min-width: 1366px) {
    width: 1120px;
  }
`;

export const ContentContainer = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
`;

export const PrintersContainer = styled.section`
  width: 100%;
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;
