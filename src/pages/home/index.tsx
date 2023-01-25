import { useContext } from "react";

import { PrinterCard } from "../../components/PrinterCard";
import { PrinterInkStock } from "../../components/PrinterInkStock";
import { PrinterContext } from "../../contexts/PrinterContext";

import { ContentContainer, HomeContainer, PrintersContainer } from "./styles";

import logoImg from "../../assets/logo.png";

export function Home() {
  const { printers, hasSelectedPrinter } = useContext(PrinterContext);

  return (
    <HomeContainer>
      <header>
        <img src={logoImg} alt="" />
      </header>

      <ContentContainer>
        <PrintersContainer>
          {printers.map((printer) => (
            <PrinterCard key={printer.id} printer={printer} />
          ))}
        </PrintersContainer>

        {/* Load ink stock when has printer selected */}
        {hasSelectedPrinter && <PrinterInkStock />}
      </ContentContainer>
    </HomeContainer>
  );
}
