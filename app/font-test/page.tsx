'use client';

export default function FontTest() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-10">
      <h1 className="text-4xl mb-10 text-center">Font Test Page</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Poppins Tests */}
        <section className="border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl mb-4 text-yellow-400">Poppins Font Family</h2>
          
          <div className="space-y-2">
            <p className="poppins-thin text-xl">Poppins Thin (100) - The quick brown fox</p>
            <p className="poppins-extralight text-xl">Poppins Extra Light (200) - The quick brown fox</p>
            <p className="poppins-light text-xl">Poppins Light (300) - The quick brown fox</p>
            <p className="poppins-regular text-xl">Poppins Regular (400) - The quick brown fox</p>
            <p className="poppins-medium text-xl">Poppins Medium (500) - The quick brown fox</p>
            <p className="poppins-semibold text-xl">Poppins Semibold (600) - The quick brown fox</p>
            <p className="poppins-bold text-xl">Poppins Bold (700) - The quick brown fox</p>
            <p className="poppins-extrabold text-xl">Poppins Extra Bold (800) - The quick brown fox</p>
            <p className="poppins-black text-xl">Poppins Black (900) - The quick brown fox</p>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-lg text-yellow-300">Italic Styles:</h3>
            <p className="poppins-regular-italic text-xl">Poppins Regular Italic - The quick brown fox</p>
            <p className="poppins-medium-italic text-xl">Poppins Medium Italic - The quick brown fox</p>
            <p className="poppins-bold-italic text-xl">Poppins Bold Italic - The quick brown fox</p>
          </div>
        </section>

        {/* Inter Tests */}
        <section className="border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl mb-4 text-blue-400">Inter Font Family</h2>
          
          <div className="space-y-2">
            <p className="inter-thin text-xl">Inter Thin (100) - The quick brown fox</p>
            <p className="inter-extralight text-xl">Inter Extra Light (200) - The quick brown fox</p>
            <p className="inter-light text-xl">Inter Light (300) - The quick brown fox</p>
            <p className="inter-regular text-xl">Inter Regular (400) - The quick brown fox</p>
            <p className="inter-medium text-xl">Inter Medium (500) - The quick brown fox</p>
            <p className="inter-semibold text-xl">Inter Semibold (600) - The quick brown fox</p>
            <p className="inter-bold text-xl">Inter Bold (700) - The quick brown fox</p>
            <p className="inter-extrabold text-xl">Inter Extra Bold (800) - The quick brown fox</p>
            <p className="inter-black text-xl">Inter Black (900) - The quick brown fox</p>
          </div>
        </section>

        {/* Real Usage Examples */}
        <section className="border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl mb-4 text-green-400">Real Usage Examples (From Your Site)</h2>
          
          <div className="space-y-4">
            <h1 className="inter-medium text-[55px] lg:text-[80px] leading-tight">
              Designing
            </h1>
            
            <p className="poppins-regular text-lg">
              Cultivating digital brilliance through creative designs
            </p>
            
            <h2 className="poppins-semibold text-3xl">
              SHREECRAFT ERIA
            </h2>
            
            <p className="inter-regular text-base opacity-75">
              Greetings, I'm Hetrajsinh Raj, a solo designer and developer
            </p>
          </div>
        </section>

        {/* Instructions */}
        <section className="border border-green-700 p-6 rounded-lg bg-green-900/20">
          <h2 className="text-2xl mb-4 text-green-400">✅ Font Verification</h2>
          <div className="space-y-2 text-sm">
            <p>1. Open DevTools (F12)</p>
            <p>2. Go to Network tab</p>
            <p>3. Refresh the page</p>
            <p>4. Look for font files from <code className="bg-gray-800 px-2 py-1 rounded">/_next/static/media/</code></p>
            <p>5. Inspect any text element and check Computed styles</p>
            <p>6. Font-family should show the correct font (Poppins or Inter)</p>
          </div>
        </section>
      </div>
    </div>
  );
}
