import { useContext } from "react";
import { Printer as PrinterIcon } from "phosphor-react";

import { InkCounter } from "../InkCounter";
import { PrinterContext } from "../../contexts/PrinterContext";

import {
  PrinterInkStockContainer,
  PrinterInfoContainer,
  PrinterTitle,
  PrinterInkStockContent,
  InkStockContainer,
  TransactionColor,
} from "./styles";

export function PrinterInkStock() {
  const { inkStockHistory, selectedPrinter: printer } = useContext(PrinterContext);

  const printerEmptyInkStock = printer.stock.filter((ink) => ink.amount === 0);
  const hasInkStockAlert = !!printerEmptyInkStock.length;

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
            <span>Stock status:</span> <strong>{hasInkStockAlert ? "NOT OK" : "OK"}</strong>
          </div>
        </section>

        <PrinterInkStockContent>
          {printer.stock.map((ink) => (
            <InkCounter key={ink.color} color={ink.color} amount={ink.amount} />
          ))}
        </PrinterInkStockContent>
      </PrinterInfoContainer>

      <InkStockContainer>
        {/* <Actions>
          <ActionButton action="input">inputs</ActionButton>
          <ActionButton action="output">outputs</ActionButton>
        </Actions> */}

        <table>
          <thead>
            <tr>
              <th>tonner</th>
              <th>amount</th>
              <th>delivery to:</th>
              <th>date</th>
              <th>transaction</th>
            </tr>
          </thead>

          <tbody>
            {inkStockHistory.map((stockHistory) => (
              <tr key={stockHistory.id}>
                <td>{stockHistory.color}</td>
                <td>{stockHistory.amount}</td>
                <td>{stockHistory.deliveryTo}</td>
                <td>{new Date(stockHistory.date).toLocaleDateString("pt-BR")}</td>
                <td>
                  <TransactionColor type={stockHistory.type}>
                    {stockHistory.type === "input" ? "input" : "output"}
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
