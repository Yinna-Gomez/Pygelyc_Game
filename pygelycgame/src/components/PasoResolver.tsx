interface Props {
  pasos: string[];
}

export default function PasoResolver({ pasos }: Props) {
  if (!pasos || pasos.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-500/50">
      <h3 className="text-xl font-bold text-white mb-4">📖 Pasos de resolución:</h3>
      <ol className="space-y-2">
        {pasos.map((paso, index) => (
          <li key={index} className="text-white/90 flex gap-3">
            <span className="font-bold text-blue-400">{index + 1}.</span>
            <span>{paso}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}