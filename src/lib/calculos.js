export const asNumber = (value) => Number.parseFloat(value) || 0;

export const calcularMetricas = ({
  arriendo = 0,
  nominaFija = 0,
  nominaOcasional = 0,
  luz = 0,
  agua = 0,
  gas = 0,
  otros = 0,
  foodCost = 0.35,
  ventasRealesMes = 0,
  modoEstres = false,
  caidaVentas = 30
} = {}) => {
  const nArriendo = asNumber(arriendo);
  const nNominaFija = asNumber(nominaFija);
  const nNominaOcasional = asNumber(nominaOcasional);
  const nLuz = asNumber(luz);
  const nAgua = asNumber(agua);
  const nGas = asNumber(gas);
  const nOtros = asNumber(otros);
  const nVentasReales = asNumber(ventasRealesMes);
  const nCaidaVentas = asNumber(caidaVentas);

  const totalGastosFijos = nArriendo + nNominaFija + nNominaOcasional + nLuz + nAgua + nGas + nOtros;
  const margenContribucionRelativo = 1 - asNumber(foodCost);
  const margenSeguro = margenContribucionRelativo <= 0 ? 0.1 : margenContribucionRelativo;
  const ventasEquilibrio = totalGastosFijos / margenSeguro;
  const ventasParaAnalisis = nVentasReales > 0 ? nVentasReales : ventasEquilibrio;

  const pctNomina = (nNominaFija + nNominaOcasional) / (ventasParaAnalisis || 1);
  const pctArriendo = nArriendo / (ventasParaAnalisis || 1);
  const pctServicios = (nLuz + nAgua + nGas) / (ventasParaAnalisis || 1);
  const cumplimiento = ventasEquilibrio > 0 ? (nVentasReales / ventasEquilibrio) * 100 : 0;
  const utilidadReal = nVentasReales * margenContribucionRelativo - totalGastosFijos;
  const ventasEscenario = modoEstres ? ventasParaAnalisis * (1 - nCaidaVentas / 100) : ventasParaAnalisis;
  const presupuestoMP = ventasEscenario * asNumber(foodCost);

  return {
    totalGastosFijos,
    margenContribucionRelativo,
    ventasEquilibrio,
    ventasParaAnalisis,
    pctNomina,
    pctArriendo,
    pctServicios,
    cumplimiento,
    utilidadReal,
    ventasEscenario,
    presupuestoMP
  };
};

export const construirAlertas = ({ pctNomina = 0, pctArriendo = 0, pctServicios = 0 } = {}) => {
  const alertas = [];
  if (pctNomina > 0.35) alertas.push(`Nomina alta (${(pctNomina * 100).toFixed(1)}%). Max 35%.`);
  if (pctArriendo > 0.15) alertas.push(`Arriendo costoso (${(pctArriendo * 100).toFixed(1)}%). Max 15%.`);
  if (pctServicios > 0.06) alertas.push(`Servicios elevados (${(pctServicios * 100).toFixed(1)}%). Max 6%.`);
  return alertas;
};
