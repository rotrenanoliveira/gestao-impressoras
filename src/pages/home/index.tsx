import { Envelope, Printer, XCircle } from "phosphor-react";

import {
  ContentContainer,
  HomeContainer,
  InkStatus,
  PrinterContainer,
  PrinterInfo,
  PrintersContainer,
  RequestInkButton,
} from "./styles";

import pmeLogo from "../../assets/logo.png";

export function Home() {
  const hasAlert = false;

  return (
    <HomeContainer>
      <header>
        <img src={pmeLogo} alt="" />
      </header>

      <ContentContainer>
        <PrintersContainer>
          <PrinterContainer hasAlert={hasAlert}>
            <div className="icon">
              <Printer size={32} weight={"thin"} />
            </div>

            <PrinterInfo>
              <strong>konica minolta bizhub c284</strong>
              <span>setor</span>
              <InkStatus hasAlert={hasAlert}>
                <span>Status do estoque:</span>
                <strong>
                  em falta
                  <XCircle size={32} weight="thin" />
                </strong>
              </InkStatus>
            </PrinterInfo>

            {hasAlert && (
              <RequestInkButton>
                <Envelope size={32} weight="thin" />
                <strong>Solicitar tinta!</strong>
              </RequestInkButton>
            )}
          </PrinterContainer>
        </PrintersContainer>
      </ContentContainer>
    </HomeContainer>
  );
}
