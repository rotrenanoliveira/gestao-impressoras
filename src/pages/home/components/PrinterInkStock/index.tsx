import { Printer as PrinterIcon } from "phosphor-react";
import { InkCounter } from "../InkCounter";

import {
  PrinterInkStockContainer,
  PrinterInfoContainer,
  PrinterTitle,
  PrinterInkStockContent,
  InkStockContainer,
  Actions,
  ActionButton,
} from "./styles";

export function PrinterInkStock() {
  return (
    <PrinterInkStockContainer>
      <PrinterInfoContainer>
        <section>
          <PrinterTitle>
            <PrinterIcon size={32} weight={"thin"} />
            <h3>konica minolta bizhub c284</h3>
            <span>Qualidade</span>
          </PrinterTitle>

          <div>
            <span>Status do estoque:</span> <strong>OK</strong>
          </div>
        </section>

        <PrinterInkStockContent>
          <InkCounter />
          <InkCounter />
          <InkCounter />
          <InkCounter />
        </PrinterInkStockContent>
      </PrinterInfoContainer>

      <InkStockContainer>
        <Actions>
          <ActionButton action="income">Entradas</ActionButton>
          <ActionButton action="outcome">Saidas</ActionButton>
        </Actions>

        <table>
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

            <tr>
              <td>azul</td>
              <td>23/01/20223</td>
              <td>1</td>
              <td>Entrada</td>
            </tr>

            <tr>
              <td>preto</td>
              <td>23/01/20223</td>
              <td>1</td>
              <td>Saída</td>
            </tr>
          </tbody>
        </table>
      </InkStockContainer>
    </PrinterInkStockContainer>
  );
}
