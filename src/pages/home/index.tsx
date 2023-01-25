import { useContext } from "react";

import { PrinterCard } from "../../components/PrinterCard";
import { PrinterInkStock } from "../../components/PrinterInkStock";
import { PrinterContext } from "../../contexts/PrinterContext";

import { ContentContainer, HomeContainer, PrintersContainer } from "./styles";

import pmeLogo from "../../assets/logo.png";

export function Home() {
  const { printers, hasSelectedPrinter } = useContext(PrinterContext);

  return (
    <HomeContainer>
      <header>
        <img src={pmeLogo} alt="" />
      </header>

      <ContentContainer>
        <PrintersContainer>
          {printers.map((printer) => (
            <PrinterCard key={printer.id} printer={printer} />
          ))}
        </PrintersContainer>

        {/* Quando houver uma impressora selecionada carregará as informações sobre as tintas e estoque */}
        {hasSelectedPrinter && <PrinterInkStock />}
      </ContentContainer>
    </HomeContainer>
  );
}
