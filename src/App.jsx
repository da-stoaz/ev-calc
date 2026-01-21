import { useMemo, useState } from "react";
import PageHeader from "./components/PageHeader.jsx";
import ApertureHelper from "./components/ApertureHelper.jsx";
import SettingPanel from "./components/SettingPanel.jsx";
import ComparisonPanel from "./components/ComparisonPanel.jsx";
import FractionModal from "./components/FractionModal.jsx";
import { fmt } from "./utils/format.js";

const fullOnly = [1.0, 1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16, 22, 32];
const thirdStops = [
  0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0,
  4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32,
];

const isFinitePositive = (n) => Number.isFinite(n) && n > 0;
const log2 = (x) => Math.log(x) / Math.log(2);
const calcEV = (N, t) => log2((N * N) / t);

const parseNumber = (value) => {
  const num = Number(String(value).replace(",", "."));
  return Number.isFinite(num) ? num : null;
};

const parseTimeInput = (value) => {
  const str = String(value).trim().replace(",", ".");
  if (!str) return { ok: false, error: "Bitte einen Wert eingeben." };
  if (str.includes("/")) {
    const parts = str.split("/").map((p) => p.trim());
    if (parts.length !== 2) return { ok: false, error: "Ungültiges Format. Beispiel: 1/100." };
    const a = Number(parts[0]);
    const b = Number(parts[1]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      return { ok: false, error: "Bruch enthält keine gültigen Zahlen." };
    }
    if (b === 0) return { ok: false, error: "Division durch 0 ist nicht erlaubt." };
    const v = a / b;
    if (!(v > 0)) return { ok: false, error: "Zeit muss > 0 sein." };
    return { ok: true, value: v };
  }
  const v = Number(str);
  if (!Number.isFinite(v)) return { ok: false, error: "Bitte eine gültige Zahl eingeben." };
  if (!(v > 0)) return { ok: false, error: "Zeit muss > 0 sein." };
  return { ok: true, value: v };
};

const nearestIndex = (series, value) => {
  let bestI = 0;
  let bestD = Infinity;
  for (let i = 0; i < series.length; i += 1) {
    const d = Math.abs(series[i] - value);
    if (d < bestD) {
      bestD = d;
      bestI = i;
    }
  }
  return bestI;
};

export default function App() {
  const [apStep, setApStep] = useState("full");
  const [apInput, setApInput] = useState("");
  const [aN, setAN] = useState("");
  const [aT, setAT] = useState("");
  const [bN, setBN] = useState("");
  const [bT, setBT] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState(null);
  const [modalInput, setModalInput] = useState("");
  const [modalErr, setModalErr] = useState("");

  const series = useMemo(() => (apStep === "full" ? fullOnly : thirdStops), [apStep]);

  const apValue = useMemo(() => {
    const parsed = parseNumber(apInput);
    return parsed !== null && parsed > 0 ? parsed : null;
  }, [apInput]);

  const { apPrev, apNext } = useMemo(() => {
    if (!apValue) return { apPrev: null, apNext: null };
    const i = nearestIndex(series, apValue);
    return {
      apPrev: series[Math.max(0, i - 1)],
      apNext: series[Math.min(series.length - 1, i + 1)],
    };
  }, [apValue, series]);

  const evA = useMemo(() => {
    const N = parseNumber(aN);
    const t = parseNumber(aT);
    return isFinitePositive(N) && isFinitePositive(t) ? calcEV(N, t) : null;
  }, [aN, aT]);

  const evB = useMemo(() => {
    const N = parseNumber(bN);
    const t = parseNumber(bT);
    return isFinitePositive(N) && isFinitePositive(t) ? calcEV(N, t) : null;
  }, [bN, bT]);

  const delta = evA !== null && evB !== null ? evB - evA : null;
  const lightFactor = delta !== null ? Math.pow(2, -delta) : null;
  const interpretation = delta === null
    ? "—"
    : Math.abs(delta) < 0.05
      ? "Nahezu identisch"
      : delta > 0
        ? "B ist dunkler als A"
        : "B ist heller als A";

  const comparisonPill = delta === null
    ? null
    : Math.abs(delta) < 0.05
      ? "gleich"
      : delta > 0
        ? "B dunkler"
        : "B heller";

  const handleSetAperture = (target) => {
    if (target === "a" && apPrev) setAN(String(apPrev));
    if (target === "b" && apPrev) setBN(String(apPrev));
  };

  const handleSetNextAperture = (target) => {
    if (target === "a" && apNext) setAN(String(apNext));
    if (target === "b" && apNext) setBN(String(apNext));
  };

  const openModal = (target) => {
    setModalTarget(target);
    setModalInput("");
    setModalErr("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTarget(null);
    setModalErr("");
    setModalInput("");
  };

  const handleModalInput = (value) => {
    setModalInput(value);
    if (modalErr) setModalErr("");
  };

  const applyModal = () => {
    const parsed = parseTimeInput(modalInput);
    if (!parsed.ok) {
      setModalErr(parsed.error);
      return;
    }
    if (modalTarget === "a") setAT(String(parsed.value));
    if (modalTarget === "b") setBT(String(parsed.value));
    closeModal();
  };

  const fillExample = () => {
    setAN("2.8");
    setAT("0.01");
    setBN("5.6");
    setBT("0.04");
    setApInput("2.8");
    setApStep("full");
  };

  const resetAll = () => {
    setAN("");
    setAT("");
    setBN("");
    setBT("");
    setApInput("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader onExample={fillExample} onReset={resetAll} />

      <ApertureHelper
        apStep={apStep}
        apInput={apInput}
        series={series}
        apPrev={apPrev}
        apNext={apNext}
        onStepChange={setApStep}
        onInputChange={setApInput}
        onSetPrevA={() => handleSetAperture("a")}
        onSetPrevB={() => handleSetAperture("b")}
        onSetNextA={() => handleSetNextAperture("a")}
        onSetNextB={() => handleSetNextAperture("b")}
      />

      <main className="grid gap-6 lg:grid-cols-2">
        <SettingPanel
          title="Einstellung A"
          description="Blende (N) und Belichtungszeit (t) eingeben."
          aperturePlaceholder="z. B. 2.8"
          timePlaceholder="z. B. 0.01"
          timeHint="Tipp: 0.01 für 1/100s. Über „1/…“ kannst du „1/100“ eingeben."
          apertureValue={aN}
          timeValue={aT}
          onApertureChange={setAN}
          onTimeChange={setAT}
          onParseClick={() => openModal("a")}
          evValue={evA}
        />

        <SettingPanel
          title="Einstellung B"
          description="Zum Vergleich mit Einstellung A."
          aperturePlaceholder="z. B. 5.6"
          timePlaceholder="z. B. 0.04"
          timeHint="Beispiel: „1/25“ → 0.04"
          apertureValue={bN}
          timeValue={bT}
          onApertureChange={setBN}
          onTimeChange={setBT}
          onParseClick={() => openModal("b")}
          evValue={evB}
        />

        <ComparisonPanel
          delta={delta}
          lightFactor={lightFactor}
          interpretation={interpretation}
          pillLabel={comparisonPill}
        />
      </main>

      <FractionModal
        open={modalOpen}
        value={modalInput}
        error={modalErr}
        onChange={handleModalInput}
        onClose={closeModal}
        onApply={applyModal}
      />
    </div>
  );
}
