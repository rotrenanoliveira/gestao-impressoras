import { randomUUID } from "node:crypto";
import { Router } from "express";

import { DataSaver } from "../datasaver.js";

const routes = Router();

const datasaver = new DataSaver();

//= PRINTER ROUTES ==
routes.get("/printers", (req, res) => {
  const printers = datasaver.select("printers");

  return res.status(200).json(printers);
});

routes.get("/printers/:id", (req, res) => {
  console.log(req.params.id);

  const printers = datasaver.select("printers");

  const printer = printers.find((printer) => printer.id === req.params.id);

  if (!printer) {
    return res.sendStatus(404);
  }

  return res.status(200).json(printer);
});

routes.put("/printers/:id", (req, res) => {
  const { stock } = req.body;

  const printers = datasaver.select("printers");

  const impressora = printers.find((printer) => printer.id === req.params.id);

  if (!impressora) {
    return res.sendStatus(404);
  }

  datasaver.update("printers", req.params.id, { ...impressora, stock });

  res.sendStatus(200);
});

//= INK STOCK HISTORY ROUTES ==
routes.get("/ink-stock-history", (req, res) => {
  const { printer_id: printerId } = req.query;

  const inkStock = datasaver.select("ink-stock-history");
  const inkStockHistory = inkStock.filter((ink) => ink.printer_id === printerId);

  res.status(200).json(inkStockHistory);
});

routes.post("/ink-stock-history", (req, res) => {
  const { color, type, deliveryTo, printer_id: printerId } = req.body;

  const stockLog = {
    id: randomUUID(),
    type,
    color,
    amount: 1,
    deliveryTo,
    printer_id: printerId,
    date: new Date().toISOString(),
  };

  datasaver.insert("ink-stock-history", stockLog);

  res.sendStatus(201);
});

export const apiRoutes = routes;
