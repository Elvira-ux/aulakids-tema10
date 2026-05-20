import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  MapPin,
  Layers,
  Calculator,
  Award,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  ArrowRight,
  CheckCircle2,
  Trophy,
  XCircle,
  Printer,
  FileText,
  CheckSquare,
  Target,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const FLASHCARDS = [
  {
    id: 1,
    q: "¿Qué mide la longitud?",
    a: "Mide líneas o distancias. Unidad base: metro (m).",
  },
  {
    id: 2,
    q: "¿Qué mide la superficie?",
    a: "Mide zonas planas (2 dimensiones). Unidad: metro cuadrado (m²).",
  },
  {
    id: 3,
    q: "¿Qué mide el volumen?",
    a: "Mide el espacio que ocupa un cuerpo (3D). Unidad: metro cúbico (m³).",
  },
  {
    id: 4,
    q: "¿Qué es la capacidad?",
    a: "Indica cuánto líquido cabe en un recipiente. Unidad: litro (L).",
  },
  {
    id: 5,
    q: "¿Cuánto vale un salto en superficie?",
    a: "La coma se mueve 2 lugares. Multiplicas o divides por 100.",
  },
  {
    id: 6,
    q: "¿Cuánto vale un salto en volumen?",
    a: "La coma se mueve 3 lugares. Multiplicas o divides por 1.000.",
  },
  {
    id: 7,
    q: "LLAVE MAESTRA 1: Equivalencia 1 dm³",
    a: "1 dm³ = 1 Litro (L).",
  },
  {
    id: 8,
    q: "LLAVE MAESTRA 2: Equivalencia 1 cm³",
    a: "1 cm³ = 1 mililitro (mL).",
  },
  {
    id: 9,
    q: "LLAVE MAESTRA 3: Equivalencia 1 m³",
    a: "1 m³ = 1.000 Litros (L).",
  },
  {
    id: 10,
    q: "¿Qué es una hectárea (ha)?",
    a: "Es una unidad agraria para terrenos grandes: 1 ha = 10.000 m².",
  },
  {
    id: 11,
    q: "Regla de oro de los problemas",
    a: "¡Convertir todo a la misma unidad antes de calcular!",
  },
  {
    id: 12,
    q: "¿Cuántos cm² son 1 dm²?",
    a: "100 cm² (1 salto hacia la derecha × 100).",
  },
  {
    id: 13,
    q: "¿Cuántos m³ son 1 dam³?",
    a: "1.000 m³ (1 salto hacia la derecha × 1.000).",
  },
  {
    id: 14,
    q: "¿Cuál es el volumen de un cubo?",
    a: "Volumen = arista × arista × arista.",
  },
  {
    id: 15,
    q: "Diferencia entre mL y L",
    a: "1 L = 1.000 mL. (Capacidad va de 10 en 10).",
  },
];

const PREGUNTAS_SIMULACRO = [
  {
    q: "Una finca de 4,5 ha se vende a 150,6 € el metro cuadrado. ¿Cuál es el precio total de la finca?",
    opts: ["677.700 €", "6.777.000 €", "67.770 €"],
    ans: 1,
    exp: "1 ha = 10.000 m², así que 4,5 ha = 45.000 m². Multiplicamos por el precio: 45.000 × 150,6 = 6.777.000 €.",
    hint: "Recuerda: 1 hectárea (ha) son 10.000 m². Primero pasa los 4,5 a m².",
  },
  {
    q: "Un campo de fútbol mide 8.800 m². ¿A cuántos campos de fútbol equivale un terreno de 10,56 ha?",
    opts: ["10 campos", "12 campos", "120 campos"],
    ans: 1,
    exp: "10,56 ha = 105.600 m². Dividimos el área total entre la de un campo: 105.600 ÷ 8.800 = 12 campos.",
    hint: "Pasa las hectáreas (ha) a metros cuadrados (m²) multiplicando por 10.000 antes de dividir.",
  },
  {
    q: "Un piso de 95 m² costó 375.800 €. ¿Cuál es el precio por metro cuadrado de ese piso?",
    opts: ["3.956 €", "3.856 €", "4.056 €"],
    ans: 0,
    exp: "Dividimos el precio total entre los metros: 375.800 ÷ 95 = 3.955,78 €. Al redondear a la unidad más cercana es 3.956 €.",
    hint: "Si 95 m² cuestan todo eso, para saber cuánto cuesta 1 solo m² tienes que hacer un reparto (división).",
  },
  {
    q: "Una baldosa tiene una superficie de 400 cm². ¿Cuántas baldosas se necesitan para cubrir una superficie de 20 m²?",
    opts: ["50 baldosas", "500 baldosas", "5.000 baldosas"],
    ans: 1,
    exp: "Pasamos 20 m² a cm² = 200.000 cm². Dividimos 200.000 ÷ 400 = 500 baldosas.",
    hint: "¡Regla de oro! Están en diferentes unidades (m² y cm²). Pasa los 20 m² a cm² multiplicando por 10.000 primero.",
  },
  {
    q: "Una hoja de papel DIN A-4 tiene una superficie de 623,7 cm². ¿Cuántos metros cuadrados (m²) ocuparán 150 hojas?",
    opts: ["935,55 m²", "9,3555 m²", "0,935 m²"],
    ans: 1,
    exp: "150 hojas ocupan: 623,7 × 150 = 93.555 cm². Para pasar a m² damos 2 saltos hacia la izquierda (÷10.000). Resultado: 9,3555 m².",
    hint: "Primero averigua los cm² totales de las 150 hojas. Luego divide entre 10.000 para subir la escalera hasta m².",
  },
  {
    q: "Una construcción está formada por 24 cubos iguales. Cada cubo tiene 2 cm de arista. ¿Cuál es el volumen total?",
    opts: ["192 cm³", "48 cm³", "96 cm³"],
    ans: 0,
    exp: "Volumen de un cubo: 2 × 2 × 2 = 8 cm³. Como hay 24 cubos: 24 × 8 = 192 cm³.",
    hint: "Calcula primero el volumen de UN cubo multiplicando lado × lado × lado. Luego multiplica por todos los cubos.",
  },
  {
    q: "Un frasco de jarabe tiene 180 mL. Un niño toma 6 cm³, 3 veces al día. ¿Para cuántos días tiene con un frasco?",
    opts: ["30 días", "5 días", "10 días"],
    ans: 2,
    exp: "Llave maestra: 6 cm³ = 6 mL. Al día toma 18 mL (6×3). 180 mL ÷ 18 = 10 días.",
    hint: "La llave maestra dice que 1 cm³ es lo mismo que 1 mL. Así que toma 6 mL en cada dosis.",
  },
  {
    q: "¿Es verdad que el contenido de una botella de 1/2 L cabe dentro de un recipiente cúbico de 8 cm de arista?",
    opts: [
      "Sí, la botella tiene 500 mL y el cubo 512 mL.",
      "No, porque el cubo es más pequeño.",
      "Sí, caben exactamente igual.",
    ],
    ans: 0,
    exp: "1/2 L = 500 mL. El volumen del cubo es 8 × 8 × 8 = 512 cm³ (que equivale a 512 mL). Como 500 es menor que 512, ¡sí cabe!",
    hint: "Pasa medio litro a mililitros (500 mL). Luego calcula el volumen del cubo (8x8x8) y recuerda que 1 cm³ = 1 mL.",
  },
  {
    q: "Una familia consume 200 L de agua al día. Si cada metro cúbico cuesta 1,5 €, ¿cuánto cuesta el agua consumida en 90 días?",
    opts: ["27 €", "270 €", "18 €"],
    ans: 0,
    exp: "Consumo en 90 días: 200 × 90 = 18.000 L. Pasamos a m³ (÷1.000): 18 m³. Precio: 18 × 1,5 = 27 €.",
    hint: "Calcula los litros totales en los 90 días. Luego divide entre 1.000 para convertirlos a m³.",
  },
  {
    q: "Una lavadora consume entre 42 y 62 litros por lavado. Estima cuántos m³ consume al mes (30 días) si se usa una vez al día.",
    opts: [
      "Entre 126 y 186 m³",
      "Entre 1,26 y 1,86 m³",
      "Entre 12,6 y 18,6 m³",
    ],
    ans: 1,
    exp: "Mínimo: 42 × 30 = 1.260 L (1,26 m³). Máximo: 62 × 30 = 1.860 L (1,86 m³). (Recordando que 1.000 L = 1 m³).",
    hint: "Calcula el consumo de 30 días para el mínimo (42L) y el máximo (62L). Luego pásalos a m³ dividiendo por 1.000.",
  },
  {
    q: "El barril es la unidad para medir petróleo y equivale a 158,987 L. ¿Cuántos metros cúbicos (m³) hay en 10.000 barriles?",
    opts: ["1.589,87 m³", "15.898,7 m³", "158,987 m³"],
    ans: 0,
    exp: "10.000 barriles = 158,987 × 10.000 = 1.589.870 Litros. Para pasar a m³ dividimos entre 1.000: 1.589,87 m³.",
    hint: "Multiplica para saber el total de Litros. Como 1 m³ = 1.000 L, tendrás que dividir el resultado final.",
  },
  {
    q: "Un manantial vierte 60 litros de agua por segundo. ¿Cuántos metros cúbicos de agua salen de ese manantial al día?",
    opts: ["5.184 m³", "51,84 m³", "518,4 m³"],
    ans: 0,
    exp: "Un día tiene 86.400 segundos. Agua al día = 60 × 86.400 = 5.184.000 Litros. Dividiendo entre 1.000 obtenemos 5.184 m³.",
    hint: "Averigua cuántos segundos tiene un día (24h × 60min × 60s). Luego pasa los Litros totales a m³.",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("resumen");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [examScore, setExamScore] = useState(null);

  const tabs = [
    { id: "resumen", label: "Resumen", icon: FileText },
    { id: "flashcards", label: "Flashcards", icon: BookOpen },
    { id: "simulacro", label: "Simulacro", icon: GraduationCap },
    { id: "mapa", label: "Mapa Mental", icon: MapPin },
    { id: "escalas", label: "Escalas", icon: Layers },
    { id: "calc", label: "Calculadora", icon: Calculator },
    { id: "diploma", label: "Diploma", icon: Award },
  ];

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors p-4 md:p-8 font-sans text-slate-800 dark:text-slate-100">
        {/* HEADER */}
        <header className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border-b-4 border-orange-500 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-xl shadow-sm">
              <GraduationCap size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400">
                Tema 10: Unidades de Superficie y Volumen
              </h1>
              <p className="font-bold text-orange-500 text-sm md:text-base mt-1">
                Aula Kids | Matemáticas 6º Primaria
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full shadow-inner transition-colors"
          >
            {isDarkMode ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-indigo-500" />
            )}
          </button>
        </header>

        {/* NAVEGACIÓN */}
        <nav className="max-w-4xl mx-auto flex flex-wrap gap-2 mb-6 justify-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all shadow-sm ${
                activeTab === t.id
                  ? "bg-orange-500 text-white transform scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700"
              }`}
            >
              <t.icon size={20} />{" "}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>

        {/* CONTENIDO PRINCIPAL */}
        <main className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 md:p-10 rounded-3xl shadow-xl min-h-[400px]">
          {activeTab === "resumen" && <Resumen />}
          {activeTab === "flashcards" && <Flashcards />}
          {activeTab === "simulacro" && (
            <Simulacro
              setExamScore={setExamScore}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "mapa" && <MapaMental />}
          {activeTab === "escalas" && <Escalas />}
          {activeTab === "calc" && <Calculadora />}
          {activeTab === "diploma" && (
            <Diploma score={examScore} setActiveTab={setActiveTab} />
          )}
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------
// COMPONENTES DE LAS PESTAÑAS
// ---------------------------------------------

function Resumen() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 mb-4">
          Guía de Estudio: Tema 10
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto">
          Antes de empezar a practicar, lee detenidamente qué vas a aprender y
          cuáles son los pasos mágicos para no fallar nunca un problema.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 md:p-8 rounded-3xl border-2 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-blue-600 dark:text-blue-400" size={32} />
          <h3 className="text-2xl font-black text-slate-800 dark:text-white">
            ¿Qué vas a aprender?
          </h3>
        </div>
        <ul className="space-y-4 text-slate-700 dark:text-slate-300 font-medium text-lg">
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">✔</span>
            <span>
              A diferenciar qué medimos: <strong>Longitud</strong> (líneas),{" "}
              <strong>Superficie</strong> (planos), <strong>Volumen</strong>{" "}
              (espacio 3D) y <strong>Capacidad</strong> (líquidos).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">✔</span>
            <span>
              A entender las <strong>Unidades Agrarias</strong> (hectárea, área,
              centiárea) y saber que una hectárea (ha) es exactamente lo mismo
              que un hectómetro cuadrado (hm²).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">✔</span>
            <span>
              A usar las <strong>Llaves Maestras</strong> para pasar de cajas
              (volumen) a líquidos (capacidad) sin perderte.
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 p-6 md:p-8 rounded-3xl border-2 border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-3 mb-6">
          <CheckSquare
            className="text-orange-600 dark:text-orange-400"
            size={32}
          />
          <h3 className="text-2xl font-black text-slate-800 dark:text-white">
            El Método: 3 Pasos para Resolver Problemas
          </h3>
        </div>
        <p className="mb-6 text-slate-700 dark:text-slate-300 font-medium">
          Sigue siempre este orden cuando te enfrentes a los ejercicios del
          simulacro:
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border dark:border-slate-700">
            <div className="bg-orange-500 text-white font-black w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-lg dark:text-white">
                Lee y saca los datos
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Identifica qué números te da el problema y en qué unidad están
                (ej: 4,5 ha y 150,6 €/m²).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border-2 border-orange-400 dark:border-orange-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
            <div className="bg-orange-500 text-white font-black w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-black text-lg text-orange-600 dark:text-orange-400">
                LA REGLA DE ORO: Unifica
              </h4>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                <strong>¡No operes nunca con unidades mezcladas!</strong> Pasa
                todo a la misma unidad. Si el precio está en m², convierte las
                hectáreas a m² antes de hacer nada más.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border dark:border-slate-700">
            <div className="bg-orange-500 text-white font-black w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-lg dark:text-white">
                Opera y comprueba
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Haz la multiplicación o división (ej: 45.000 m² × 150,6 €) y lee
                tu resultado. ¿Tiene sentido que un piso cueste 300 euros? Si
                no, revisa las comas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-3xl border-2 border-green-200 dark:border-green-800 flex items-start gap-4">
        <AlertTriangle
          className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1"
          size={28}
        />
        <div>
          <h4 className="font-black text-lg text-green-800 dark:text-green-400 mb-2">
            💡 Tip rápido de cálculo
          </h4>
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            Recuerda que multiplicar por 10.000 es{" "}
            <strong>mover la coma 4 lugares a la derecha</strong> o añadir
            ceros. Dividir entre 1.000 es{" "}
            <strong>mover la coma 3 lugares a la izquierda</strong>. ¡Usa la
            pestaña de <em>Escalas</em> si te pierdes!
          </p>
        </div>
      </div>
    </div>
  );
}

function Flashcards() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 text-center">
        Tarjetas de Repaso
      </h2>
      <div
        className="w-full max-w-2xl h-72 perspective-1000 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`w-full h-full relative transition-transform duration-500 transform-style-3d shadow-lg rounded-3xl ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-700 border-4 border-blue-500 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
            <BookOpen
              size={40}
              className="text-blue-200 dark:text-slate-500 mb-4"
            />
            <p className="text-2xl font-black text-slate-800 dark:text-white">
              {FLASHCARDS[idx].q}
            </p>
            <p className="absolute bottom-4 text-slate-400 text-sm font-bold">
              Toca para girar
            </p>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-600 dark:bg-blue-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-inner">
            <p className="text-2xl font-bold text-white">{FLASHCARDS[idx].a}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={() => {
            setIdx((i) => Math.max(0, i - 1));
            setFlipped(false);
          }}
          className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="font-black text-lg text-slate-600 dark:text-slate-300">
          {idx + 1} / {FLASHCARDS.length}
        </span>
        <button
          onClick={() => {
            setIdx((i) => Math.min(FLASHCARDS.length - 1, i + 1));
            setFlipped(false);
          }}
          className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function Simulacro({ setExamScore, setActiveTab }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (selectedOptIdx) => {
    if (feedback) return;

    if (selectedOptIdx === PREGUNTAS_SIMULACRO[idx].ans) {
      setScore((s) => s + (showHint ? 0.5 : 1));
      setFeedback({ type: "correct", exp: PREGUNTAS_SIMULACRO[idx].exp });
    } else {
      setFeedback({ type: "wrong", exp: PREGUNTAS_SIMULACRO[idx].exp });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setShowHint(false);
    if (idx < PREGUNTAS_SIMULACRO.length - 1) {
      setIdx(idx + 1);
    } else {
      setFinished(true);
      setExamScore(score);
    }
  };

  const restart = () => {
    setIdx(0);
    setScore(0);
    setFinished(false);
    setFeedback(null);
    setExamScore(null);
    setShowHint(false);
  };

  if (finished) {
    const isPerfect = score === PREGUNTAS_SIMULACRO.length;
    return (
      <div className="text-center py-10 animate-fade-in-up">
        <Trophy
          size={80}
          className={`mx-auto mb-6 ${
            isPerfect ? "text-yellow-400" : "text-slate-400"
          }`}
        />
        <h2 className="text-4xl font-black mb-4">¡Simulacro Terminado!</h2>
        <p className="text-2xl mb-8">
          Has conseguido{" "}
          <span className="font-black text-blue-600">{score}</span> puntos de{" "}
          {PREGUNTAS_SIMULACRO.length}
        </p>

        {isPerfect ? (
          <button
            onClick={() => setActiveTab("diploma")}
            className="bg-green-500 hover:bg-green-600 text-white font-black text-xl py-4 px-8 rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            ¡Reclamar mi Diploma!
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-red-500 font-bold bg-red-50 dark:bg-red-900/20 p-4 rounded-xl inline-block">
              ¡Casi! Recuerda que usar pistas resta 0.5 puntos. Necesitas 12
              puntos perfectos para ganar el diploma. Revisa el resumen e
              inténtalo de nuevo.
            </p>
            <br />
            <button
              onClick={restart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-md transition-colors"
            >
              Volver a Intentar
            </button>
          </div>
        )}
      </div>
    );
  }

  const q = PREGUNTAS_SIMULACRO[idx];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 font-bold text-slate-500 dark:text-slate-400">
        <span>
          Pregunta {idx + 1} de {PREGUNTAS_SIMULACRO.length}
        </span>
        <span className="text-orange-500">Puntuación: {score}</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-6 leading-tight bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-600">
        {q.q}
      </h2>

      {!feedback && !showHint && (
        <button
          onClick={() => setShowHint(true)}
          className="mb-6 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-bold py-2 px-4 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-2 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors w-fit"
        >
          <Lightbulb size={20} /> Pedir una pista (-0.5 puntos)
        </button>
      )}

      {showHint && !feedback && (
        <div className="mb-6 bg-amber-100 dark:bg-amber-900/40 p-4 rounded-xl border border-amber-300 dark:border-amber-700 flex gap-3 text-amber-800 dark:text-amber-300 animate-fade-in-up">
          <Lightbulb className="flex-shrink-0" size={24} />
          <p>
            <strong>Pista del profe:</strong> {q.hint}
          </p>
        </div>
      )}

      <div className="space-y-3 mb-8">
        {q.opts.map((opt, i) => {
          let btnClass =
            "bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-200";
          if (feedback) {
            if (i === q.ans)
              btnClass =
                "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-300 font-bold";
            else
              btnClass =
                "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 opacity-50";
          }
          return (
            <button
              key={i}
              disabled={feedback !== null}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-5 rounded-2xl font-bold text-lg transition-all ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div
          className={`p-6 rounded-2xl mb-6 border ${
            feedback.type === "correct"
              ? "bg-green-50 border-green-200 dark:bg-green-900/20"
              : "bg-red-50 border-red-200 dark:bg-red-900/20"
          }`}
        >
          <p
            className={`font-black text-xl mb-2 flex items-center gap-2 ${
              feedback.type === "correct" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback.type === "correct" ? <CheckCircle2 /> : <XCircle />}
            {feedback.type === "correct" ? "¡Correcto!" : "¡Error!"}
          </p>
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            <strong>Explicación:</strong> {feedback.exp}
          </p>
        </div>
      )}

      {feedback && (
        <button
          onClick={handleNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xl py-4 rounded-2xl shadow-md transition-colors"
        >
          {idx === PREGUNTAS_SIMULACRO.length - 1
            ? "Ver Resultado Final"
            : "Siguiente Pregunta"}
        </button>
      )}
    </div>
  );
}

function MapaMental() {
  const conceptos = [
    {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      icon: "📏",
      title: "Longitud",
      dim: "1 Dimensión (Línea)",
      desc: "Mide distancias entre dos puntos.",
      ejemplo: "El largo de un lápiz, la distancia entre dos ciudades.",
      unidades: "km, m, cm, mm",
      salto: "De 10 en 10",
    },
    {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-800 dark:text-orange-200",
      icon: "⬛",
      title: "Superficie",
      dim: "2 Dimensiones (Plano)",
      desc: "Mide la extensión de una zona plana.",
      ejemplo: "El suelo de una habitación, un campo de fútbol.",
      unidades: "m², ha, cm²",
      salto: "De 100 en 100 (²)",
    },
    {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-200",
      icon: "📦",
      title: "Volumen",
      dim: "3 Dimensiones (Espacio)",
      desc: "Mide el espacio total que ocupa un cuerpo.",
      ejemplo: "Una caja de zapatos, un dado, el interior de una piscina.",
      unidades: "m³, dm³, cm³",
      salto: "De 1.000 en 1.000 (³)",
    },
    {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-800 dark:text-purple-200",
      icon: "🥛",
      title: "Capacidad",
      dim: "Contenido Líquido",
      desc: "Mide cuánto líquido cabe dentro de un recipiente.",
      ejemplo: "Una botella de agua, un cartón de leche, un jarabe.",
      unidades: "kL, L, mL",
      salto: "De 10 en 10",
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
        Las 4 Dimensiones
      </h2>
      <p className="text-slate-500 dark:text-slate-400 font-bold mb-8">
        Conoce las diferencias y ejemplos de la vida real de cada una.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {conceptos.map((item, i) => (
          <div
            key={i}
            className={`${item.bg} p-6 rounded-3xl border-2 ${item.border} flex flex-col items-center relative overflow-hidden transition-transform hover:scale-[1.02]`}
          >
            <div className="text-5xl mb-3">{item.icon}</div>
            <h3 className="font-black text-2xl mb-1 dark:text-white">
              {item.title}
            </h3>
            <span
              className={`text-xs font-black uppercase tracking-widest ${item.text} mb-4`}
            >
              {item.dim}
            </span>

            <p className="text-slate-700 dark:text-slate-300 font-medium mb-3 text-sm">
              {item.desc}
            </p>

            <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl mb-4 w-full text-left shadow-sm">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                Ejemplo real:
              </p>
              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium italic">
                {item.ejemplo}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center bg-white/40 dark:bg-slate-800/40 px-3 py-2 rounded-lg">
                <span className="text-xs font-bold text-slate-500">
                  Unidades:
                </span>
                <span className={`font-black ${item.text}`}>
                  {item.unidades}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/40 dark:bg-slate-800/40 px-3 py-2 rounded-lg">
                <span className="text-xs font-bold text-slate-500">
                  Cada salto:
                </span>
                <span className={`font-black ${item.text}`}>{item.salto}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-100 to-purple-100 dark:from-green-900/30 dark:to-purple-900/30 p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-left shadow-sm">
        <span className="text-4xl animate-bounce">🔗</span>
        <div>
          <h4 className="font-black text-lg text-slate-800 dark:text-white mb-1">
            El puente mágico
          </h4>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            El{" "}
            <strong className="text-green-600 dark:text-green-400">
              Volumen
            </strong>{" "}
            y la{" "}
            <strong className="text-purple-600 dark:text-purple-400">
              Capacidad
            </strong>{" "}
            están conectados directamente. Si construyes un cubo exacto de{" "}
            <strong>1 dm³</strong>, en su interior cabrá perfectamente{" "}
            <strong>1 Litro</strong> de agua.
          </p>
        </div>
      </div>
    </div>
  );
}

function Escalas() {
  const [escalaActiva, setEscalaActiva] = useState("longitud");

  const tablas = {
    longitud: {
      id: "longitud",
      titulo: "Longitud (m)",
      colorBoton: "bg-blue-500 hover:bg-blue-600",
      colorBorde: "border-blue-500",
      colorTexto: "text-blue-600 dark:text-blue-400",
      unidades: [
        { main: "km", sub: "" },
        { main: "hm", sub: "" },
        { main: "dam", sub: "" },
        { main: "m", sub: "" },
        { main: "dm", sub: "" },
        { main: "cm", sub: "" },
        { main: "mm", sub: "" },
      ],
      multiplica: "× 10",
      divide: "÷ 10",
    },
    superficie: {
      id: "superficie",
      titulo: "Superficie (²)",
      colorBoton: "bg-orange-500 hover:bg-orange-600",
      colorBorde: "border-orange-500",
      colorTexto: "text-orange-600 dark:text-orange-400",
      unidades: [
        { main: "km²", sub: "" },
        { main: "hm²", sub: "(ha)" },
        { main: "dam²", sub: "(a)" },
        { main: "m²", sub: "(ca)" },
        { main: "dm²", sub: "" },
        { main: "cm²", sub: "" },
        { main: "mm²", sub: "" },
      ],
      multiplica: "× 100",
      divide: "÷ 100",
    },
    volumen: {
      id: "volumen",
      titulo: "Volumen (³)",
      colorBoton: "bg-green-500 hover:bg-green-600",
      colorBorde: "border-green-500",
      colorTexto: "text-green-600 dark:text-green-400",
      unidades: [
        { main: "km³", sub: "" },
        { main: "hm³", sub: "" },
        { main: "dam³", sub: "" },
        { main: "m³", sub: "" },
        { main: "dm³", sub: "" },
        { main: "cm³", sub: "" },
        { main: "mm³", sub: "" },
      ],
      multiplica: "× 1.000",
      divide: "÷ 1.000",
    },
    capacidad: {
      id: "capacidad",
      titulo: "Capacidad (L)",
      colorBoton: "bg-purple-500 hover:bg-purple-600",
      colorBorde: "border-purple-500",
      colorTexto: "text-purple-600 dark:text-purple-400",
      unidades: [
        { main: "kL", sub: "" },
        { main: "hL", sub: "" },
        { main: "daL", sub: "" },
        { main: "L", sub: "" },
        { main: "dL", sub: "" },
        { main: "cL", sub: "" },
        { main: "mL", sub: "" },
      ],
      multiplica: "× 10",
      divide: "÷ 10",
    },
  };

  const actual = tablas[escalaActiva];

  return (
    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
        Tabla de Conversiones
      </h2>
      <p className="text-slate-500 dark:text-slate-400 font-bold mb-8">
        Desliza la tabla hacia los lados para ver todas las unidades.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.values(tablas).map((tabla) => (
          <button
            key={tabla.id}
            onClick={() => setEscalaActiva(tabla.id)}
            className={`px-6 py-3 rounded-xl font-black text-lg transition-all shadow-md ${
              escalaActiva === tabla.id
                ? `${tabla.colorBoton} text-white transform scale-105`
                : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
            }`}
          >
            {tabla.titulo}
          </button>
        ))}
      </div>

      <div
        className={`bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border-4 ${actual.colorBorde} shadow-inner mb-10 overflow-hidden`}
      >
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex items-center min-w-max px-2">
            {actual.unidades.map((uni, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-4 ${actual.colorBorde} bg-white dark:bg-slate-700 shadow-md transform transition-transform hover:scale-105`}
                >
                  <span className="text-2xl font-black text-slate-800 dark:text-white">
                    {uni.main}
                  </span>
                  {uni.sub && (
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      {uni.sub}
                    </span>
                  )}
                </div>
                {idx < actual.unidades.length - 1 && (
                  <div className="flex flex-col items-center justify-center px-2 sm:px-4 min-w-[80px] sm:min-w-[100px]">
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-black text-xs sm:text-sm mb-2 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                      <span>{actual.multiplica}</span> <ArrowRight size={16} />
                    </div>
                    <div className="flex items-center gap-1 text-red-500 dark:text-red-400 font-black text-xs sm:text-sm bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-lg">
                      <ArrowRight size={16} className="rotate-180" />{" "}
                      <span>{actual.divide}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 font-bold flex items-center justify-center gap-2">
          💡{" "}
          <span>
            <strong>Hacia la derecha:</strong> Multiplicamos.
          </span>{" "}
          <span className="mx-2">|</span>{" "}
          <span>
            <strong>Hacia la izquierda:</strong> Dividimos.
          </span>
        </p>
      </div>

      <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg">
        <h3 className="text-2xl font-black mb-6 flex items-center justify-center gap-2">
          🔑 Las 3 Llaves Maestras
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-bold text-xl">
          <div className="bg-blue-800 p-4 rounded-xl shadow-inner">
            1 m³ = 1.000 L
          </div>
          <div className="bg-blue-800 p-4 rounded-xl ring-4 ring-yellow-400 shadow-lg transform scale-105">
            1 dm³ = 1 L
          </div>
          <div className="bg-blue-800 p-4 rounded-xl shadow-inner">
            1 cm³ = 1 mL
          </div>
        </div>
        <p className="mt-6 text-blue-200 text-sm font-medium">
          Estas llaves conectan las cajas (Volumen) con los líquidos
          (Capacidad).
        </p>
      </div>
    </div>
  );
}

function Calculadora() {
  const [val, setVal] = useState("");
  const [fromUnit, setFromUnit] = useState("m³");
  const [toUnit, setToUnit] = useState("Litros (L)");
  const [isJumping, setIsJumping] = useState(false);
  const [stepsData, setStepsData] = useState(null);

  const units = {
    "m³": 1000,
    "dm³": 1,
    "cm³": 0.001,
    "Litros (L)": 1,
    "mililitros (mL)": 0.001,
  };

  const calcular = () => {
    const numero = parseFloat(val);
    if (isNaN(numero)) {
      alert("Por favor, escribe un número válido primero.");
      return;
    }

    setIsJumping(true);
    setStepsData(null);

    setTimeout(() => {
      setIsJumping(false);
      const valorEnLitros = numero * units[fromUnit];
      const resultadoFinal = valorEnLitros / units[toUnit];
      const factor = units[fromUnit] / units[toUnit];

      const formato = Number.isInteger(resultadoFinal)
        ? resultadoFinal
        : parseFloat(resultadoFinal.toFixed(6));

      let expl = "";
      if (factor > 1) {
        expl = `Como pasamos a una unidad MENOR, damos saltos hacia la derecha. ¡Por eso MULTIPLICAMOS por ${factor.toLocaleString(
          "es-ES"
        )}!`;
      } else if (factor < 1) {
        expl = `Como pasamos a una unidad MAYOR, damos saltos hacia la izquierda. ¡Por eso DIVIDIMOS entre ${(
          1 / factor
        ).toLocaleString("es-ES")}!`;
      } else {
        expl = `¡Magia! Estas dos unidades son primas hermanas (Llave Maestra). Valen exactamente lo mismo, no hay que hacer operaciones.`;
      }

      setStepsData({
        start: `${numero} ${fromUnit}`,
        explanation: expl,
        end: `${formato.toLocaleString("es-ES")} ${toUnit}`,
      });
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <style>{`
        @keyframes multipleJumps {
           0% { transform: translate(0, 0); }
           15% { transform: translate(30px, -30px); }
           30% { transform: translate(60px, 0); }
           45% { transform: translate(90px, -30px); }
           60% { transform: translate(120px, 0); }
           75% { transform: translate(150px, -30px); }
           100% { transform: translate(180px, 0); }
        }
        .frog-jumping {
           animation: multipleJumps 1.5s linear forwards;
        }
      `}</style>

      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
        Calculadora con Ranita 🐸
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 font-bold">
        Convierte volumen y capacidad viendo los saltos.
      </p>

      <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-600 space-y-6">
        <input
          type="number"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setStepsData(null);
          }}
          className="w-full p-4 text-center font-black text-2xl border-2 rounded-2xl outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
          placeholder="Ej: 3.5"
        />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <select
            value={fromUnit}
            onChange={(e) => {
              setFromUnit(e.target.value);
              setStepsData(null);
            }}
            className="w-full sm:w-2/5 p-4 rounded-xl font-bold bg-white dark:bg-slate-800 border-2 dark:border-slate-600 dark:text-white outline-none"
          >
            {Object.keys(units).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <ArrowRight
            className="hidden sm:block text-slate-400 font-black"
            size={32}
          />
          <select
            value={toUnit}
            onChange={(e) => {
              setToUnit(e.target.value);
              setStepsData(null);
            }}
            className="w-full sm:w-2/5 p-4 rounded-xl font-bold bg-white dark:bg-slate-800 border-2 dark:border-slate-600 dark:text-white outline-none"
          >
            {Object.keys(units).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calcular}
          disabled={isJumping}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-black text-xl py-4 rounded-2xl shadow-md transition-transform active:scale-95"
        >
          Convertir y ver saltos
        </button>

        <div className="relative h-24 overflow-hidden border-b-4 border-dashed border-slate-300 dark:border-slate-500 flex items-end mb-4">
          {isJumping ? (
            <div className="frog-jumping text-6xl pb-2">🐸</div>
          ) : (
            <div className="text-6xl pb-2 opacity-50 absolute left-[calc(50%-1.5rem)]">
              🐸
            </div>
          )}
        </div>

        {stepsData && !isJumping && (
          <div className="mt-6 text-left space-y-4 animate-fade-in-up">
            <div className="bg-green-100 dark:bg-green-900/40 border-2 border-green-500 p-4 rounded-2xl text-center">
              <p className="text-2xl font-black text-green-800 dark:text-green-400">
                {stepsData.start} = {stepsData.end}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                ¿Cómo lo hizo la ranita?
              </h4>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {stepsData.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Diploma({ score, setActiveTab }) {
  const [studentName, setStudentName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  if (score === PREGUNTAS_SIMULACRO.length) {
    if (!nameSubmitted) {
      return (
        <div className="text-center py-16 animate-fade-in-up">
          <Award size={80} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">
            ¡Enhorabuena, lo has conseguido!
          </h2>
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-8">
            Introduce tu nombre para generar tu diploma oficial.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (studentName.trim()) setNameSubmitted(true);
            }}
            className="max-w-md mx-auto space-y-4"
          >
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ej: Leo Martínez"
              className="w-full p-4 text-center font-bold text-xl border-2 border-yellow-400 rounded-2xl outline-none focus:border-yellow-600 dark:bg-slate-800 dark:text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black text-xl py-4 rounded-2xl shadow-md transition-transform active:scale-95"
            >
              Generar Diploma
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center animate-fade-in-up">
        <style>{`
          @media print {
            body * { visibility: hidden; }
            .diploma-print-zone, .diploma-print-zone * { visibility: visible; }
            .diploma-print-zone { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: white !important; margin: 0; }
            .dark .diploma-print-zone { background-color: #fffbeb !important; color: #1e293b !important; }
          }
        `}</style>

        <button
          onClick={() => window.print()}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md flex items-center gap-2 transition-colors"
        >
          <Printer size={20} /> Imprimir o Guardar PDF
        </button>

        <div className="diploma-print-zone w-full text-center bg-amber-50 dark:bg-amber-900/20 border-8 border-double border-yellow-500 p-8 md:p-16 rounded-3xl relative overflow-hidden">
          <Award
            size={120}
            className="mx-auto text-yellow-500 mb-6 opacity-20 absolute top-10 left-10"
          />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-yellow-500 mb-4 tracking-wider uppercase">
              Diploma de Excelencia
            </h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8">
              Aula Kids
            </p>
            <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
              Por haber superado con éxito el{" "}
              <strong>Simulacro Oficial de Aula Kids</strong> del Tema 10,
              demostrando un dominio absoluto de las unidades de medida, se
              otorga este reconocimiento a:
            </p>

            <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-10 border-b-2 border-slate-400 dark:border-slate-500 pb-2 inline-block px-8">
              {studentName}
            </h3>

            <div className="flex justify-center">
              <div className="border-t-2 border-slate-400 pt-2 px-12 mt-4">
                <p className="font-cursive font-black text-2xl text-slate-800 dark:text-slate-200">
                  Firma de Aula Kids
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16 animate-fade-in-up">
      <Award size={80} className="mx-auto text-slate-300 mb-6" />
      <h2 className="text-3xl font-black text-slate-400 mb-4">
        Diploma Bloqueado
      </h2>
      <p className="text-lg font-bold text-slate-500 mb-8">
        Para desbloquear este certificado, debes conseguir 12 puntos en el
        Simulacro.
      </p>
      <button
        onClick={() => setActiveTab("simulacro")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-md transition-colors"
      >
        Ir al Simulacro
      </button>
    </div>
  );
}
