import test from "node:test";
import assert from "node:assert/strict";
import { calcularMetricas, construirAlertas } from "../src/lib/calculos.js";

test("calcula punto de equilibrio y utilidad correctamente", () => {
  const m = calcularMetricas({
    arriendo: 2000000,
    nominaFija: 3000000,
    nominaOcasional: 500000,
    luz: 400000,
    agua: 200000,
    gas: 300000,
    otros: 600000,
    foodCost: 0.35,
    ventasRealesMes: 12000000
  });

  assert.equal(Math.round(m.totalGastosFijos), 7000000);
  assert.equal(Math.round(m.ventasEquilibrio), Math.round(7000000 / 0.65));
  assert.equal(Math.round(m.utilidadReal), Math.round(12000000 * 0.65 - 7000000));
});

test("aplica escenario de estres al presupuesto de materia prima", () => {
  const base = calcularMetricas({
    arriendo: 1000000,
    nominaFija: 1000000,
    foodCost: 0.4,
    ventasRealesMes: 10000000,
    modoEstres: false,
    caidaVentas: 30
  });

  const estres = calcularMetricas({
    arriendo: 1000000,
    nominaFija: 1000000,
    foodCost: 0.4,
    ventasRealesMes: 10000000,
    modoEstres: true,
    caidaVentas: 30
  });

  assert.equal(Math.round(base.presupuestoMP), 4000000);
  assert.equal(Math.round(estres.presupuestoMP), 2800000);
});

test("genera alertas de nomina, arriendo y servicios", () => {
  const m = calcularMetricas({
    arriendo: 3000000,
    nominaFija: 5000000,
    nominaOcasional: 1000000,
    luz: 800000,
    agua: 300000,
    gas: 300000,
    foodCost: 0.35,
    ventasRealesMes: 12000000
  });

  const alertas = construirAlertas(m);

  assert.equal(alertas.length, 3);
  assert.ok(alertas[0].includes("Nomina alta"));
  assert.ok(alertas[1].includes("Arriendo costoso"));
  assert.ok(alertas[2].includes("Servicios elevados"));
});
