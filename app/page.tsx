export default function Home() {
  return (
    <div className="scanlines min-h-screen bg-black p-8 font-mono">
      {/* TEST: If these Tailwind classes work, setup is correct */}
      <div className="mb-6 border-2 border-green-500 p-4">
        <h1 className="text-3xl font-bold text-green-400">
          ✓ Tailwind Test
        </h1>
        <p className="mt-2 text-green-300">
          If this text is green and has a border, Tailwind works!
        </p>
        <button className="mt-4 bg-green-900 px-6 py-2 text-green-300">
          Test Button
        </button>
      </div>
      
      {/* Your DOS interface below */}
      <div className="border border-green-800 p-4">
        <span className="text-green-300">C:\EPLURIBUS\</span>
        <span className="blink ml-1">_</span>
      </div>
    </div>
  );
}
