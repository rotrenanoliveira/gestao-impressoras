import { ContentContainer, HomeContainer, PrintersContainer } from "./styles";

import pmeLogo from "../../assets/logo.png";
import { Printer } from "./components/Printer";

export function Home() {
  return (
    <HomeContainer>
      <header>
        <img src={pmeLogo} alt="" />
      </header>

      <ContentContainer>
        <PrintersContainer>
          <Printer />
          <Printer />
          <Printer />
          <Printer />
        </PrintersContainer>
      </ContentContainer>
    </HomeContainer>
  );
}
