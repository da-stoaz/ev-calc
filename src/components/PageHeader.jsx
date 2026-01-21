import Button from "./ui/Button.jsx";

export default function PageHeader({ onExample, onReset }) {
  return (
    <header className="mb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">EV100 Rechner & Vergleich</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            EV100 = log₂(N² / t). EV100 ist der Exposure Value bezogen auf ISO 100 (ISO-normalisiert).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button className="px-4 py-2" onClick={onExample}>Beispiel</Button>
          <Button className="px-4 py-2" variant="ghost" onClick={onReset}>
            Zurücksetzen
          </Button>
        </div>
      </div>
    </header>
  );
}
