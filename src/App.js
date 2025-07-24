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
    const index = parseFloat(refractiveIndex.replace(",", "."));
    if (isNaN(index)) {
      setResult(t.error);
      return;
    }

    const keys = Object.keys(table).map(k => parseFloat(k));
    const closest = keys.find(k => Math.abs(k - index) < 0.0001);

    if (closest !== undefined) {
      const output = `${t.result}: ${table[closest]}%`;
      setResult(output);
      setHistory([...history, `${index} → ${output}`]);
    } else {
      setResult(t.noData);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>{t.title}</h1>
      <select value={lang} onChange={e => setLang(e.target.value)}>
        <option value="pl">🇵🇱 Polski</option>
        <option value="en">🇬🇧 English</option>
      </select>
      <input
        type="text"
        placeholder={t.placeholder}
        value={refractiveIndex}
        onChange={e => setRefractiveIndex(e.target.value)}
        style={{ display: "block", width: "100%", margin: "10px 0", padding: 8 }}
      />
      <button onClick={calculate} style={{ marginTop: 10 }}>{t.calculate}</button>
      <p style={{ marginTop: 20 }}>{result}</p>
      <h3>Historia</h3>
      <ul>
        {history.map((entry, i) => <li key={i}>{entry}</li>)}
      </ul>
    </div>
  );
}
