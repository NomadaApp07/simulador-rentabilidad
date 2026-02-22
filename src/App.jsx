import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Clock3,
  Database,
  Droplets,
  FileDown,
  Flame,
  Home,
  Key,
  Moon,
  Plus,
  PlusCircle,
  Save,
  ShoppingBag,
  Smartphone,
  Sun,
  Target,
  Trash2,
  RotateCcw,
  Unlock,
  User,
  UserCheck,
  UserPlus,
  Zap
} from "lucide-react";
import { supabase } from "./supabaseClient";
import { asNumber, calcularMetricas, construirAlertas } from "./lib/calculos";

const APP_STATE_KEY = "nomada_simulador_state_v1";
const EMAIL_KEY = "nomada_saved_email";
const THEME_KEY = "nomada_theme";

const onlyNumbers = (v) => v.replace(/\D/g, "");

const CampoCostoDetallado = ({ label, valor, setValor, totalFijos, icono: Icono }) => {
  const numValor = asNumber(valor);
  const porcentaje = totalFijos > 0 ? ((numValor / totalFijos) * 100).toFixed(1) : "0.0";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-all hover:border-cyan-400/40">
      <div className="mb-2 flex items-center justify-between text-left">
        <div className="flex items-center gap-2 text-zinc-400">
          {Icono && <Icono size={13} />}
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
        </div>
        <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[9px] font-black text-amber-300">
          {porcentaje}%
        </span>
      </div>
      <div className="flex items-center border-b border-white/10 pb-1">
        <span className="mr-2 text-sm font-black text-cyan-400">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={valor}
          onChange={(e) => setValor(onlyNumbers(e.target.value))}
          placeholder="0"
          className="w-full bg-transparent text-sm font-black text-white outline-none"
        />
      </div>
    </div>
  );
};

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem(EMAIL_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: password.trim()
    });

    if (signInError) {
      setError("Credenciales invalidas o usuario no confirmado.");
      setPassword("");
      setLoading(false);
      return;
    }

    if (rememberMe) localStorage.setItem(EMAIL_KEY, email.trim().toLowerCase());
    else localStorage.removeItem(EMAIL_KEY);

    setLoading(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 text-white">
      <div className="fixed inset-0 pointer-events-none opacity-25" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png'), radial-gradient(circle at 20% 10%, rgba(6,182,212,0.18), transparent 40%), radial-gradient(circle at 85% 90%, rgba(250,204,21,0.14), transparent 45%)" }} />
      <div className="relative z-10 mx-auto mt-8 max-w-[980px] overflow-hidden rounded-[40px] border border-white/10 bg-black/45 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:grid lg:grid-cols-2">
        <section className="hidden border-r border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Nomada Ecosystem</p>
            <h2 className="mt-4 text-5xl font-black italic leading-[0.95]">Nomada<span className="text-amber-300">Elite</span></h2>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-zinc-400">Simulador de rentabilidad operativa conectado a tu stack de ingenieria gastronomica.</p>
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-400/90">Mientras ellos adivinan nosotros ejecutamos.</p>
        </section>

        <section className="p-8 sm:p-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400">Elite Access</span>
          </div>

          <h1 className="mb-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Ingreso Seguro</h1>
          <p className="mb-8 text-xs uppercase tracking-[0.25em] text-zinc-500">Simulador de Rentabilidad</p>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative text-left">
              <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="email" required placeholder="Correo de acceso" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 font-bold text-white outline-none transition-all focus:border-amber-300/70 focus:bg-amber-300/[0.04]" />
            </div>

            <div className="relative text-left">
              <Key size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="password" required placeholder="Token de seguridad" value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 font-bold text-white outline-none transition-all focus:border-amber-300/70 focus:bg-amber-300/[0.04]" />
            </div>

            <label className="flex items-center gap-2 px-1">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 accent-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Recordar correo</span>
            </label>

            {error && <p className="pt-1 text-center text-[10px] font-black uppercase tracking-[0.25em] text-red-400">{error}</p>}

            <button disabled={loading} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-[11px] font-black uppercase tracking-[0.25em] text-black shadow-[0_12px_30px_rgba(251,191,36,0.3)] transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Validando..." : "Entrar al Simulador"}
              <ArrowRight size={16} />
            </button>
          </form>

          <a href="https://wa.me/573504562065?text=Hola,%20quiero%20adquirir%20Nomada%20Pro%20para%20mi%20negocio." target="_blank" rel="noreferrer" className="group mt-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-amber-300/20 p-3 text-amber-300 transition-transform group-hover:scale-110"><Smartphone size={24} /></div>
              <div className="text-left">
                <p className="mb-1 text-[10px] font-black uppercase leading-none text-amber-300">No tienes cuenta?</p>
                <p className="text-sm font-bold italic">Adquirir Nomada Pro</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-zinc-500" />
          </a>
        </section>
      </div>
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");

  const [arriendo, setArriendo] = useState("");
  const [nominaFija, setNominaFija] = useState("");
  const [nominaOcasional, setNominaOcasional] = useState("");
  const [luz, setLuz] = useState("");
  const [agua, setAgua] = useState("");
  const [gas, setGas] = useState("");
  const [otros, setOtros] = useState("");
  const [costoProduccionPlato, setCostoProduccionPlato] = useState("10000");
  const [foodCost, setFoodCost] = useState(0.35);
  const [ventasRealesMes, setVentasRealesMes] = useState("");
  const [modoEstres, setModoEstres] = useState(false);
  const [caidaVentas, setCaidaVentas] = useState(30);

  const [simulacionesCloud, setSimulacionesCloud] = useState([]);
  const [simulacionSeleccionadaId, setSimulacionSeleccionadaId] = useState("");
  const [nombreSimulacion, setNombreSimulacion] = useState("");
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudSaving, setCloudSaving] = useState(false);
  const [cloudMessage, setCloudMessage] = useState("");
  const [cloudDataColumn, setCloudDataColumn] = useState("payload");
  const [versionesCloud, setVersionesCloud] = useState([]);
  const [versionesLoading, setVersionesLoading] = useState(false);
  const [versionesMessage, setVersionesMessage] = useState("");
  const [versionDataColumn, setVersionDataColumn] = useState("payload");

  const formatoCOP = useMemo(() => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }), []);

  const payloadActual = { arriendo, nominaFija, nominaOcasional, luz, agua, gas, otros, costoProduccionPlato, foodCost, ventasRealesMes, modoEstres, caidaVentas };

  const metricas = calcularMetricas(payloadActual);
  const alertas = construirAlertas(metricas);
  const { totalGastosFijos, ventasEquilibrio, cumplimiento, utilidadReal, presupuestoMP } = metricas;
  const ventasRealesNum = asNumber(ventasRealesMes);

  const hydrateState = (payload) => {
    if (!payload || typeof payload !== "object") return;
    setArriendo(payload.arriendo ?? "");
    setNominaFija(payload.nominaFija ?? "");
    setNominaOcasional(payload.nominaOcasional ?? "");
    setLuz(payload.luz ?? "");
    setAgua(payload.agua ?? "");
    setGas(payload.gas ?? "");
    setOtros(payload.otros ?? "");
    setCostoProduccionPlato(payload.costoProduccionPlato ?? "10000");
    setFoodCost(payload.foodCost ?? 0.35);
    setVentasRealesMes(payload.ventasRealesMes ?? "");
    setModoEstres(Boolean(payload.modoEstres));
    setCaidaVentas(payload.caidaVentas ?? 30);
  };

  const normalizeSimRow = (row) => {
    const candidatePayload = row?.payload ?? row?.data ?? null;
    const payload = candidatePayload && typeof candidatePayload === "object" ? candidatePayload : null;
    return { id: row?.id, nombre: row?.nombre || "ESCENARIO SIN NOMBRE", payload, updatedAt: row?.updated_at || row?.created_at || null };
  };

  const detectPayloadColumn = (rows) => {
    const first = Array.isArray(rows) ? rows[0] : null;
    if (!first) return cloudDataColumn;
    if (Object.prototype.hasOwnProperty.call(first, "payload")) return "payload";
    if (Object.prototype.hasOwnProperty.call(first, "data")) return "data";
    return cloudDataColumn;
  };

  const isMissingColumnError = (error, col) => {
    if (!error?.message) return false;
    const msg = error.message.toLowerCase();
    return msg.includes(`column "${col}"`) || msg.includes(`column ${col}`);
  };

  const normalizeVersionRow = (row) => {
    const candidatePayload = row?.payload ?? row?.data ?? null;
    const payload = candidatePayload && typeof candidatePayload === "object" ? candidatePayload : null;
    return {
      id: row?.id,
      simulacionId: row?.simulacion_id,
      payload,
      createdAt: row?.created_at || null
    };
  };

  const detectVersionPayloadColumn = (rows) => {
    const first = Array.isArray(rows) ? rows[0] : null;
    if (!first) return versionDataColumn;
    if (Object.prototype.hasOwnProperty.call(first, "payload")) return "payload";
    if (Object.prototype.hasOwnProperty.call(first, "data")) return "data";
    return versionDataColumn;
  };

  const loadVersionesCloud = async (simulacionId) => {
    if (!simulacionId) {
      setVersionesCloud([]);
      setVersionesMessage("");
      return;
    }

    setVersionesLoading(true);
    setVersionesMessage("");

    const { data, error } = await supabase
      .from("simulacion_versiones")
      .select("*")
      .eq("simulacion_id", simulacionId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      setVersionesLoading(false);
      setVersionesCloud([]);
      setVersionesMessage("No se pudo cargar historial de versiones.");
      console.error("Error al listar versiones", error);
      return;
    }

    const column = detectVersionPayloadColumn(data);
    setVersionDataColumn(column);

    const normalized = (data || []).map(normalizeVersionRow).filter((row) => row.id);
    setVersionesCloud(normalized);
    setVersionesLoading(false);
  };

  const createVersionSnapshot = async (simulacionId, payload) => {
    if (!simulacionId) return;

    const persistWithColumn = async (columnName) => {
      const row = { simulacion_id: simulacionId, [columnName]: payload };
      if (userId) row.user_id = userId;
      return supabase.from("simulacion_versiones").insert(row).select("id").single();
    };

    let column = versionDataColumn;
    let result = await persistWithColumn(column);
    if (result.error && (isMissingColumnError(result.error, column) || result.error.code === "PGRST204")) {
      const alt = column === "payload" ? "data" : "payload";
      const retry = await persistWithColumn(alt);
      if (!retry.error) {
        column = alt;
        result = retry;
      }
    }

    if (result.error) {
      console.error("Error al crear version", result.error);
      setVersionesMessage("No se pudo crear snapshot de version.");
      return;
    }

    setVersionDataColumn(column);
  };

  const restoreVersion = (versionId) => {
    const version = versionesCloud.find((v) => String(v.id) === String(versionId));
    if (!version?.payload) {
      setVersionesMessage("La version seleccionada no contiene datos.");
      return;
    }
    hydrateState(version.payload);
    setVersionesMessage("Version restaurada.");
  };

  const loadSimulacionesCloud = async () => {
    setCloudLoading(true);
    setCloudMessage("");
    const { data, error } = await supabase.from("simulaciones").select("*");
    if (error) {
      setCloudLoading(false);
      setCloudMessage("No se pudo cargar simulaciones desde Supabase.");
      console.error("Error al listar simulaciones", error);
      return;
    }

    const col = detectPayloadColumn(data);
    setCloudDataColumn(col);

    const normalized = (data || [])
      .map(normalizeSimRow)
      .filter((row) => row.id)
      .sort((a, b) => {
        const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return bTime - aTime;
      });

    setSimulacionesCloud(normalized);
    setCloudLoading(false);
  };

  const saveSimulacionCloud = async () => {
    if (cloudSaving) return;

    const nombre = (nombreSimulacion || "").trim();
    if (!nombre) {
      setCloudMessage("Define un nombre para el escenario antes de guardar.");
      return;
    }

    setCloudSaving(true);
    setCloudMessage("");

    const persistWithColumn = async (columnName) => {
      const row = { nombre, [columnName]: payloadActual };
      if (userId) row.user_id = userId;
      if (simulacionSeleccionadaId) return supabase.from("simulaciones").update(row).eq("id", simulacionSeleccionadaId).select("id").single();
      return supabase.from("simulaciones").insert(row).select("id").single();
    };

    let column = cloudDataColumn;
    let result = await persistWithColumn(column);
    if (result.error && (isMissingColumnError(result.error, column) || result.error.code === "PGRST204")) {
      const alt = column === "payload" ? "data" : "payload";
      const retry = await persistWithColumn(alt);
      if (!retry.error) {
        column = alt;
        result = retry;
      }
    }

    if (result.error) {
      setCloudSaving(false);
      setCloudMessage("No se pudo guardar la simulacion.");
      console.error("Error al guardar simulacion", result.error);
      return;
    }

    setCloudDataColumn(column);
    const savedId = result.data?.id ? String(result.data.id) : simulacionSeleccionadaId;
    setSimulacionSeleccionadaId(savedId);
    await createVersionSnapshot(savedId, payloadActual);
    await loadSimulacionesCloud();
    await loadVersionesCloud(savedId);
    setCloudSaving(false);
    setCloudMessage("Simulacion guardada en la nube.");
  };

  const loadSelectedSimulacion = () => {
    if (!simulacionSeleccionadaId) {
      setCloudMessage("Selecciona una simulacion para cargar.");
      return;
    }
    const selected = simulacionesCloud.find((row) => String(row.id) === String(simulacionSeleccionadaId));
    if (!selected?.payload) {
      setCloudMessage("La simulacion seleccionada no contiene datos.");
      return;
    }
    setNombreSimulacion(selected.nombre);
    hydrateState(selected.payload);
    loadVersionesCloud(selected.id);
    setCloudMessage(`Simulacion cargada: ${selected.nombre}`);
  };

  const deleteSelectedSimulacion = async () => {
    if (!simulacionSeleccionadaId) {
      setCloudMessage("Selecciona una simulacion para eliminar.");
      return;
    }
    const selected = simulacionesCloud.find((row) => String(row.id) === String(simulacionSeleccionadaId));
    const confirmed = window.confirm(`Vas a eliminar ${selected?.nombre || "este escenario"}. Esta accion no se puede deshacer. Continuar?`);
    if (!confirmed) {
      setCloudMessage("Eliminacion cancelada.");
      return;
    }

    const { error } = await supabase.from("simulaciones").delete().eq("id", simulacionSeleccionadaId);
    if (error) {
      setCloudMessage("No se pudo eliminar la simulacion.");
      console.error("Error al eliminar simulacion", error);
      return;
    }

    setSimulacionSeleccionadaId("");
    setVersionesCloud([]);
    setVersionesMessage("");
    await loadSimulacionesCloud();
    setCloudMessage("Simulacion eliminada.");
  };

  const nuevaSimulacion = () => {
    setSimulacionSeleccionadaId("");
    setNombreSimulacion("");
    setVersionesCloud([]);
    setVersionesMessage("");
    hydrateState({ arriendo: "", nominaFija: "", nominaOcasional: "", luz: "", agua: "", gas: "", otros: "", costoProduccionPlato: "10000", foodCost: 0.35, ventasRealesMes: "", modoEstres: false, caidaVentas: 30 });
    setCloudMessage("Nueva simulacion en blanco.");
  };

  const exportarPDF = () => window.print();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setIsAuthenticated(Boolean(session));
      setUserId(session?.user?.id || "");
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setIsAuthenticated(Boolean(session));
      setUserId(session?.user?.id || "");
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const raw = localStorage.getItem(APP_STATE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      hydrateState(saved);
    } catch (error) {
      console.error("No se pudo hidratar estado local", error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated) return;
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(payloadActual));
  }, [isAuthenticated, arriendo, nominaFija, nominaOcasional, luz, agua, gas, otros, costoProduccionPlato, foodCost, ventasRealesMes, modoEstres, caidaVentas]);

  useEffect(() => {
    if (!isAuthenticated) {
      setSimulacionesCloud([]);
      setSimulacionSeleccionadaId("");
      setNombreSimulacion("");
      setVersionesCloud([]);
      setVersionesMessage("");
      return;
    }
    loadSimulacionesCloud();
  }, [isAuthenticated]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("No se pudo cerrar sesion", error);
    setIsAuthenticated(false);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505]"><p className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">Validando sesion...</p></div>;
  }
  if (!isAuthenticated) return <LoginView onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className={`min-h-screen p-4 pb-12 lg:p-8 ${theme === "light" ? "bg-[#eef2f7] text-slate-900" : "bg-[#050505] text-white"}`}>
      <style>{`@media print { .no-print { display:none !important; } body { background:white !important; color:black !important; } .print-card { border:1px solid #000 !important; background:#fff !important; color:#000 !important; box-shadow:none !important; } .pdf-header { display:block !important; border:2px solid #000; padding:12px; border-radius:10px; margin-bottom:12px; } } .pdf-header { display:none; }`}</style>

      <div className="fixed inset-0 pointer-events-none opacity-20 no-print" style={{ backgroundImage: theme === "light" ? "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png'), radial-gradient(circle at 30% 20%, rgba(6,182,212,0.16), transparent 40%), radial-gradient(circle at 80% 85%, rgba(250,204,21,0.14), transparent 45%)" : "url('https://www.transparenttextures.com/patterns/carbon-fibre.png'), radial-gradient(circle at 20% 15%, rgba(6,182,212,0.2), transparent 42%), radial-gradient(circle at 85% 88%, rgba(217,70,239,0.12), transparent 45%)" }} />

      <div className="relative z-10 mx-auto max-w-[980px] space-y-5">
        <div className="pdf-header">
          <p style={{ fontWeight: 900, letterSpacing: "0.18em", fontSize: "10px", textTransform: "uppercase" }}>Nomada Elite - Reporte Ejecutivo</p>
          <p style={{ marginTop: "4px", fontSize: "9px", fontWeight: 800 }}>Escenario: {nombreSimulacion || "SIN NOMBRE"} | Fecha: {new Date().toLocaleDateString()}</p>
        </div>

        <header className="mb-2 flex items-center justify-between rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl no-print">
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tight">Nomada<span className="text-cyan-400">Elite</span></h1>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">Simulador Rentabilidad</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportarPDF} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition-all hover:bg-cyan-500/20"><FileDown size={16} /></button>
            <button onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition-all hover:bg-white/10">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button onClick={handleSignOut} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition-all hover:bg-red-500/20"><Unlock size={16} /></button>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl no-print">
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Nombre del escenario</p>
              <input value={nombreSimulacion} onChange={(e) => setNombreSimulacion(e.target.value)} placeholder="Ej: Escenario Base Sede Centro" className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-bold outline-none focus:border-cyan-400/60" />
            </div>
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Escenarios guardados</p>
              <select value={simulacionSeleccionadaId} onChange={(e) => setSimulacionSeleccionadaId(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] p-3 text-sm font-bold uppercase outline-none">
                <option value="">Seleccionar...</option>
                {simulacionesCloud.map((sim) => <option key={sim.id} value={sim.id}>{sim.nombre}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={saveSimulacionCloud} disabled={cloudSaving} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-cyan-400 disabled:opacity-60"><Save size={14} /> {cloudSaving ? "Guardando..." : "Guardar"}</button>
            <button onClick={loadSelectedSimulacion} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><Database size={14} /> Cargar</button>
            <button onClick={deleteSelectedSimulacion} className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-300"><Trash2 size={14} /> Eliminar</button>
            <button onClick={nuevaSimulacion} className="inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black"><Plus size={14} /> Nueva</button>
            <button onClick={loadSimulacionesCloud} disabled={cloudLoading} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-60"><Activity size={14} /> {cloudLoading ? "Actualizando..." : "Actualizar"}</button>
          </div>

          {cloudMessage && <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">{cloudMessage}</p>}

          {simulacionSeleccionadaId && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Historial de versiones</p>
                <button
                  onClick={() => loadVersionesCloud(simulacionSeleccionadaId)}
                  disabled={versionesLoading}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] disabled:opacity-60"
                >
                  <Clock3 size={12} /> {versionesLoading ? "Cargando..." : "Actualizar"}
                </button>
              </div>

              <div className="max-h-56 space-y-2 overflow-auto pr-1">
                {versionesCloud.length === 0 && !versionesLoading && (
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Sin versiones aun.</p>
                )}
                {versionesCloud.map((version) => (
                  <div key={version.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-400">
                        Version {version.createdAt ? new Date(version.createdAt).toLocaleString() : "SIN FECHA"}
                      </p>
                    </div>
                    <button
                      onClick={() => restoreVersion(version.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-amber-300 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-black"
                    >
                      <RotateCcw size={11} /> Restaurar
                    </button>
                  </div>
                ))}
              </div>

              {versionesMessage && <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">{versionesMessage}</p>}
            </div>
          )}
        </section>

        <section className="print-card rounded-3xl border border-cyan-400/20 bg-black/65 p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2"><Target className="text-cyan-400" size={20} /><h2 className="text-sm font-black uppercase italic">Monitor de Ventas</h2></div>
          <input type="text" inputMode="numeric" value={ventasRealesMes} onChange={(e) => setVentasRealesMes(onlyNumbers(e.target.value))} placeholder="Ventas reales $0" className="mb-4 w-full border-b border-cyan-400/70 bg-transparent py-2 text-left text-2xl font-black text-cyan-300 outline-none placeholder:text-zinc-600" />
          {ventasRealesNum > 0 && <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Cumplimiento</p><p className={`text-lg font-black ${cumplimiento >= 100 ? "text-green-400" : "text-amber-400"}`}>{cumplimiento.toFixed(1)}%</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Utilidad Real</p><p className={`text-lg font-black ${utilidadReal >= 0 ? "text-green-400" : "text-red-400"}`}>{formatoCOP.format(utilidadReal)}</p></div></div>}
        </section>

        <section className="print-card rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between border-l-4 border-cyan-400 pl-3"><h2 className="text-sm font-black uppercase italic">Costos Fijos</h2><span className="text-xs font-black text-zinc-400">{formatoCOP.format(totalGastosFijos)}</span></div>
          <div className="grid gap-3">
            <CampoCostoDetallado label="Arriendo" valor={arriendo} setValor={setArriendo} totalFijos={totalGastosFijos} icono={Home} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><CampoCostoDetallado label="Nomina Fija" valor={nominaFija} setValor={setNominaFija} totalFijos={totalGastosFijos} icono={UserCheck} /><CampoCostoDetallado label="Nomina Ocasional" valor={nominaOcasional} setValor={setNominaOcasional} totalFijos={totalGastosFijos} icono={UserPlus} /></div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><CampoCostoDetallado label="Luz" valor={luz} setValor={setLuz} totalFijos={totalGastosFijos} icono={Zap} /><CampoCostoDetallado label="Agua" valor={agua} setValor={setAgua} totalFijos={totalGastosFijos} icono={Droplets} /><CampoCostoDetallado label="Gas" valor={gas} setValor={setGas} totalFijos={totalGastosFijos} icono={Flame} /></div>
            <CampoCostoDetallado label="Otros" valor={otros} setValor={setOtros} totalFijos={totalGastosFijos} icono={PlusCircle} />
          </div>
        </section>

        {alertas.length > 0 && <section className="print-card rounded-3xl border border-red-500/40 bg-red-500/10 p-5"><div className="mb-3 flex items-center gap-2"><AlertCircle className="text-red-400" size={18} /><h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-red-300">Fuera de Estandares (CO)</h3></div><ul className="space-y-1">{alertas.map((alerta, index) => <li key={index} className="flex items-start gap-2 text-[10px] font-bold uppercase text-red-200"><span>-</span>{alerta}</li>)}</ul></section>}

        <section className="print-card rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <h2 className="mb-4 border-l-4 border-amber-300 pl-3 text-left text-sm font-black uppercase italic">Food Cost Objetivo</h2>
          <div className="mb-4 flex rounded-2xl bg-white/5 p-1">{[0.3,0.35,0.4].map((p) => <button key={p} onClick={() => setFoodCost(p)} className={`flex-1 rounded-xl py-2 text-[10px] font-black transition-all ${foodCost === p ? "bg-cyan-500 text-black" : "text-zinc-400"}`}>{p*100}%</button>)}</div>
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 sm:grid-cols-2"><div className="text-left"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Costo Plato</p><input type="text" value={costoProduccionPlato} onChange={(e) => setCostoProduccionPlato(onlyNumbers(e.target.value))} className="w-full border-b border-amber-300/40 bg-transparent text-lg font-black text-white outline-none" /></div><div className="text-right"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-300">Venta Sugerida</p><p className="text-xl font-black text-white">{formatoCOP.format(asNumber(costoProduccionPlato) / foodCost)}</p></div></div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 no-print">
            <div className="flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Modo Estres</p><button onClick={() => setModoEstres((prev) => !prev)} className={`rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${modoEstres ? "bg-red-500 text-white" : "bg-zinc-700 text-zinc-200"}`}>{modoEstres ? "Activo" : "Inactivo"}</button></div>
            {modoEstres && <div className="mt-3"><p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Caida de ventas (%)</p><input type="range" min="5" max="80" value={caidaVentas} onChange={(e) => setCaidaVentas(Number(e.target.value))} className="w-full accent-red-500" /><p className="mt-1 text-right text-xs font-black text-red-300">{caidaVentas}%</p></div>}
          </div>
        </section>

        <section className={`print-card rounded-[2.2rem] p-8 text-white shadow-2xl transition-all ${utilidadReal >= 0 && ventasRealesNum > 0 ? "bg-green-600" : "bg-amber-500"}`}>
          <div className="space-y-6 text-center"><div><p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Ventas Punto de Equilibrio</p><h3 className="text-4xl font-black tracking-tighter">{formatoCOP.format(ventasEquilibrio)}</h3></div><div className="rounded-2xl border border-white/20 bg-white/10 p-4"><div className="mb-1 flex items-center justify-center gap-2"><ShoppingBag size={14} className="opacity-80" /><p className="text-[10px] font-black uppercase tracking-[0.2em]">Presupuesto Materia Prima</p></div><p className="text-2xl font-black italic">{formatoCOP.format(presupuestoMP)}</p>{modoEstres && <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em]">Escenario estresado aplicado</p>}</div></div>
        </section>

        <a href="https://wa.me/573504562065?text=Hola,%20Nomada%20me%20muestra%20alertas%20en%20mi%20operacion.%20Necesito%20diagnostico." target="_blank" rel="noreferrer" className="no-print flex w-full items-center justify-between rounded-3xl border border-white/10 bg-black p-5 text-white shadow-xl transition-transform active:scale-95">
          <div className="flex items-center gap-3"><div className={`rounded-xl p-2 text-black ${alertas.length > 0 ? "animate-pulse bg-red-500" : "bg-amber-300"}`}><Activity size={20} /></div><div className="text-left"><p className="text-[10px] font-black uppercase leading-none text-amber-300">Consultoria Express</p><p className="text-xs font-bold italic">Hablar con mi asesor</p></div></div>
          <ChevronRight size={20} className="text-zinc-500" />
        </a>
      </div>
    </div>
  );
}
