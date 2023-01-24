import React, { createContext, useEffect, useState } from "react";

export interface InkStock {
  color: "black" | "blue" | "red" | "yellow";
  amount: number;
}

export interface Printer {
  id: number;
  name: string;
  isColorful: true;
  stock: InkStock[];
  category: "printer";
  department: "qualidade" | "pcp" | "custos" | "rh";
}

interface PrinterContextProps {
  printers: Printer[];
  selectedPrinter: Printer | undefined;
  selectPrinter: (printerId: number) => void;
  addInk: (printerId: number, ink: InkStock) => void;
  removeInk: (printerId: number, ink: InkStock) => void;
}

export const PrinterContext = createContext({} as PrinterContextProps);

interface PrinterContextProviderProps {
  children: React.ReactNode;
}

export function PrinterContextProvider({ children }: PrinterContextProviderProps) {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | undefined>(undefined);

  async function loadPrinters() {
    const response = await fetch("http://localhost:3333/printers");
    const data = await response.json();

    setPrinters(data);
  }

  function selectPrinter(printerId: number) {
    const printer = printers.find((printer) => printer.id === printerId);

    if (!printer) {
      return console.error("PRINTER NOT FOUND");
    }

    setSelectedPrinter(printer);
  }

  async function addInk(printerId: number, ink: InkStock) {
    const updatedInkStock = selectedPrinter!.stock.map((state) => {
      if (state.color !== ink.color) {
        return state;
      }

      return {
        ...state,
        amount: state.amount + 1,
      };
    });

    const printer = {
      ...selectedPrinter!,
      stock: updatedInkStock,
    };

    const response = await fetch(`http://localhost:3333/printers/${printerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(printer),
    });

    if (response.status === 200) {
      setSelectedPrinter(printer);
      loadPrinters();
    }
  }

  async function removeInk(printerId: number, ink: InkStock) {
    const updatedInkStock = selectedPrinter!.stock.map((state) => {
      if (state.color !== ink.color) {
        return state;
      }

      if (state.amount === 0) return state;

      return {
        ...state,
        amount: state.amount - 1,
      };
    });

    const printer = {
      ...selectedPrinter!,
      stock: updatedInkStock,
    };

    const response = await fetch(`http://localhost:3333/printers/${printerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(printer),
    });

    if (response.status === 200) {
      setSelectedPrinter(printer);
      loadPrinters();
    }
  }

  useEffect(() => {
    loadPrinters();
  }, []);

  return (
    <PrinterContext.Provider value={{ printers, selectedPrinter, selectPrinter, addInk, removeInk }}>
      {children}
    </PrinterContext.Provider>
  );
}
