interface SenalinProps {
  direction: 'left' | 'right';
  label: string;
}

export default function Senalin({ direction, label }: SenalinProps) {
  return (
    <div
      style={{
        backgroundImage: "url('/img/gifseñalin.gif')",
        transform: direction === 'left' ? 'scaleX(-1)' : 'none'
      }}
      className="absolute bg-contain bg-center w-20 h-20 bg-no-repeat hover:scale-110 transition-transform cursor-pointer"
      title={`Señalín - ${label}`}
    >
      <span className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 text-white text-sm whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
