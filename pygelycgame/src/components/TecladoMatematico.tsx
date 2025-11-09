interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TecladoMatematico({ value, onChange, placeholder }: Props) {
  const insertarSimbolo = (simbolo: string) => {
    onChange(value + simbolo);
  };

  const simbolos = ['(', ')', '+', '-', '*', '^', '²', '√', 'x', 'y'];

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Escribe tu respuesta..."}
        className="w-full bg-white/20 border-2 border-white/30 rounded-lg px-4 py-3 text-white text-xl font-mono mb-3"
      />
      
      <div className="grid grid-cols-5 gap-2">
        {simbolos.map(simbolo => (
          <button
            key={simbolo}
            onClick={() => insertarSimbolo(simbolo)}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg transition-all"
          >
            {simbolo}
          </button>
        ))}
      </div>
    </div>
  );
}