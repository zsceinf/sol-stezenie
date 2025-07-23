import React, { useState } from "react";

export default function App() {
  const [refractiveIndex, setRefractiveIndex] = useState("");
  const [hasFinalConcentration, setHasFinalConcentration] = useState(false);
  const [result, setResult] = useState("");

  const table = {
    1.336: 2,
    1.338: 4,
    1.343: 6,
    1.347: 8,
    1.35: 10,
  };

  const calculate = () => {
    const index = parseFloat(refractiveIndex);
    if (isNaN(index)) {
      setResult("Niepoprawny współczynnik.");
      return;
    }

    if (hasFinalConcentration) {
      const min = (index - 0.002).toFixed(3);
      const max = (index + 0.004).toFixed(3);
      setResult(`Zakres współczynnika: ${min} - ${max}`);
    } else {
      const keys = Object.keys(table)
        .map((k) => parseFloat(k))
        .sort((a, b) => a - b);

      for (let i = 0; i < keys.length - 1; i++) {
        const lower = keys[i];
        const upper = keys[i + 1];

        if (index >= lower && index <= upper) {
          const lowerConc = table[lower];
          const upperConc = table[upper];
          const ratio = (index - lower) / (upper - lower);
          const interpolated = lowerConc + ratio * (upperConc - lowerConc);
          setResult(`Szacowane stężenie: ${interpolated.toFixed(2)}%`);
          return;
        }
      }
      setResult("Brak danych dla podanego współczynnika.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "400px", width: "100%", padding: "2rem", backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Kalkulator stężenia</h1>
        <input
          type="text"
          placeholder="Współczynnik załamania (np. 1.338)"
          value={refractiveIndex}
          onChange={(e) => setRefractiveIndex(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <label style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <input
            type="checkbox"
            checked={hasFinalConcentration}
            onChange={() => setHasFinalConcentration(!hasFinalConcentration)}
            style={{ marginRight: "0.5rem" }}
          />
          Czy roztwór ma końcowe stężenie?
        </label>
        <button
          onClick={calculate}
          style={{ width: "100%", backgroundColor: "#007bff", color: "white", padding: "0.5rem", borderRadius: "8px", border: "none", fontWeight: "bold" }}
        >
          Oblicz
        </button>
        {result && <p style={{ marginTop: "1rem", textAlign: "center" }}>{result}</p>}
      </div>
    </div>
  );
}
