interface Props {
  expresion: string;
}

export default function ExpresionAlgebraica({ expresion }: Props) {
  // Conversión simple para mostrar expresiones
  const formatear = (expr: string) => {
    return expr
      .replace(/\^2/g, '²')
      .replace(/\^3/g, '³')
      .replace(/sqrt/g, '√');
  };

  return (
    <div className="text-3xl font-bold text-white font-mono">
      {formatear(expresion)}
    </div>
  );
}