import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import MovieGrid from "./components/MovieGrid"
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO / HOMEPAGE */}
      <Homepage />
      <MovieGrid/>

    </div>
  );
}