import { useContext } from "react";

import { Printer } from "./components/Printer";
import { PrinterInkStock } from "./components/PrinterInkStock";
import { PrinterContext } from "../../contexts/PrinterContext";

import { ContentContainer, HomeContainer, PrintersContainer } from "./styles";

import pmeLogo from "../../assets/logo.png";

export function Home() {
  const { printers, selectedPrinter, selectPrinter } = useContext(PrinterContext);
  return (
    <HomeContainer>
      <header>
        <img src={pmeLogo} alt="" />
      </header>

      <ContentContainer>
        <PrintersContainer>
          {printers.map((printer) => (
            <Printer key={printer.id} printer={printer} setPrinter={selectPrinter} />
          ))}
        </PrintersContainer>

        {selectedPrinter && <PrinterInkStock printer={selectedPrinter} />}
      </ContentContainer>
    </HomeContainer>
  );
}
