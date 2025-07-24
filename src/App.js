import React, { useState } from "react";

const translations = {
  pl: {
    title: "Kalkulator stężenia",
    placeholder: "Współczynnik załamania (np. 1.338)",
    calculate: "Oblicz",
    error: "Niepoprawny współczynnik.",
    noData: "Brak danych dla podanego współczynnika.",
    result: "Stężenie roztworu",
  },
  en: {
    title: "Concentration Calculator",
    placeholder: "Refractive index (e.g. 1.338)",
    calculate: "Calculate",
    error: "Invalid index.",
    noData: "No data for given index.",
    result: "Solution concentration",
  }
};

export default function App() {
  const [refractiveIndex, setRefractiveIndex] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [lang, setLang] = useState("pl");

  const table = {
    1.336: 2,
    1.339: 4,
    1.343: 6,
    1.347: 8,
    1.35: 10
  };

  const t = translations[lang];

  const calculate = () => {
    const input = refractiveIndex.replace(/,/g, ".").trim();
    const exactMatch = Object.keys(table).find(key => key === input);

    if (exactMatch) {
      const concentration = table[exactMatch];
      const output = `${t.result}: ${concentration}%`;
      setResult(output);
      setHistory([...history, `${input} → ${output}`]);
    } else {
      setResult(t.noData);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] text-black flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-md p-6 border border-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900">{t.title}</h1>
        <div className="mb-4">
          <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-gray-700"
          >
            <option value="pl">🇵🇱 Polski</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder={t.placeholder}
            value={refractiveIndex}
            onChange={e => setRefractiveIndex(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-gray-300 bg-[#fafafa] text-gray-800"
          />
          <span className="min-w-[130px] text-center font-medium text-gray-800">
            {result}
          </span>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-[#007aff] text-white p-3 rounded-xl font-semibold hover:bg-[#0060cc] transition"
        >
          {t.calculate}
        </button>

        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2 text-gray-700">Historia</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {history.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
