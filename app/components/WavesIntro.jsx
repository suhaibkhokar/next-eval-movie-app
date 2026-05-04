"use client";

export default function WavesIntro() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Wave 1 */}
      <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 blur-3xl animate-wave1"></div>

      {/* Wave 2 */}
      <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur-3xl animate-wave2"></div>

      {/* Wave 3 */}
      <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-20 blur-3xl animate-wave3"></div>

    </div>
  );
}