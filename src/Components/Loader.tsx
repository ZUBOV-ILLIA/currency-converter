export default function Loader({ size = 8 }: { size?: number }) {
  return (
    <div
      className="border-red-600 border-b-transparent border-r-transparent border-2 rounded-full md:animate-spin"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
