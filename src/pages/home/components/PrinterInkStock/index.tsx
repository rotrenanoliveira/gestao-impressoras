import { Printer as PrinterIcon } from "phosphor-react";

import { InkCounter } from "../InkCounter";
import { Printer, PrinterContext } from "../../../../contexts/PrinterContext";

import {
  PrinterInkStockContainer,
  PrinterInfoContainer,
  PrinterTitle,
  PrinterInkStockContent,
  InkStockContainer,
  TransactionColor,
} from "./styles";

import { useContext } from "react";
import { INKS_TRANSLATE } from "../../../../utils/inks";

interface PrinterInkStockProps {
  printer: Printer;
}

export function PrinterInkStock({ printer }: PrinterInkStockProps) {
  const { inkStockHistory, hasInkStockAlert } = useContext(PrinterContext);

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
            <span>Status do estoque:</span> <strong>{hasInkStockAlert ? "EM FALTA" : "OK"}</strong>
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

        <table>
          <thead>
            <tr>
              <th>cartucho</th>
              <th>quantidade</th>
              <th>retirado por:</th>
              <th>data</th>
              <th>operação</th>
            </tr>
          </thead>

          <tbody>
            {inkStockHistory.map((stockHistory) => (
              <tr key={stockHistory.id}>
                <td>{INKS_TRANSLATE[stockHistory.color]}</td>
                <td>{stockHistory.amount}</td>
                <td>{stockHistory.deliveryTo || `-`}</td>
                <td>{new Date(stockHistory.date).toLocaleDateString("pt-BR")}</td>
                <td>
                  <TransactionColor type={stockHistory.type}>
                    {stockHistory.type === "income" ? "Entrada" : "Saída"}
                  </TransactionColor>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InkStockContainer>
    </PrinterInkStockContainer>
  );
}
