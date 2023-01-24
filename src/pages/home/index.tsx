import pmeLogo from "../../assets/logo.png";

import { Printer } from "./components/Printer";
import { PrinterInkStock } from "./components/PrinterInkStock";

import { ContentContainer, HomeContainer, PrintersContainer } from "./styles";

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

        <PrinterInkStock />
      </ContentContainer>
    </HomeContainer>
  );
}
