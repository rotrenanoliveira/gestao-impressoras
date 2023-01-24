import { Envelope, Printer as PrinterIcon } from "phosphor-react";

import { PrinterContainer, PrinterInfo, InkStatus, RequestInkButton } from "./styles";

export function Printer() {
  const hasAlert = false;

  return (
    <PrinterContainer hasAlert={hasAlert}>
      <div className="icon">
        <PrinterIcon size={32} weight={"thin"} />
      </div>

      <PrinterInfo>
        <strong>konica minolta bizhub c284</strong>
        <span>setor</span>
        <InkStatus hasAlert={hasAlert}>
          <span>Status do estoque:</span>
          <strong>{hasAlert ? `em falta` : `ok `} </strong>
        </InkStatus>
      </PrinterInfo>

      {hasAlert && (
        <RequestInkButton>
          <Envelope size={32} weight="thin" />
          <strong>Solicitar tinta!</strong>
        </RequestInkButton>
      )}
    </PrinterContainer>
  );
}
