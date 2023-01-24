import { Printer as PrinterIcon } from "phosphor-react";

import { InkCounter } from "../InkCounter";
import { Printer } from "../../../../contexts/PrinterContext";

import {
  PrinterInkStockContainer,
  PrinterInfoContainer,
  PrinterTitle,
  PrinterInkStockContent,
  InkStockContainer,
} from "./styles";

interface PrinterInkStockProps {
  printer: Printer;
}

export function PrinterInkStock({ printer }: PrinterInkStockProps) {
  const emptyInks = printer.stock.filter((ink) => ink.amount === 0);

  const hasAlert = !!emptyInks.length;

  return (
    <PrinterInkStockContainer>
      <PrinterInfoContainer>
        <section>
          <PrinterTitle>
            <PrinterIcon size={32} weight={"thin"} />
            <h3>{printer.name}</h3>
            <span>{printer.department}</span>
          </PrinterTitle>

          <div>
            <span>Status do estoque:</span> <strong>{hasAlert ? "EM FALTA" : "OK"}</strong>
          </div>
        </section>

        <PrinterInkStockContent>
          {printer.stock.map((ink) => (
            <InkCounter key={ink.color} printerId={printer.id} color={ink.color} amount={ink.amount} />
          ))}
        </PrinterInkStockContent>
      </PrinterInfoContainer>

      <InkStockContainer>
        {/* <Actions>
          <ActionButton action="income">Entradas</ActionButton>
          <ActionButton action="outcome">Saidas</ActionButton>
        </Actions> */}

        {/* <table>
          <thead>
            <tr>
              <th>cartucho</th>
              <th>data</th>
              <th>quantidade</th>
              <th>operação</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>preto</td>
              <td>23/01/20223</td>
              <td>1</td>
              <td>Entrada</td>
            </tr>
          </tbody>
        </table> */}
      </InkStockContainer>
    </PrinterInkStockContainer>
  );
}
