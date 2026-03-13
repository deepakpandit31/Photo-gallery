import Gallery from "./components/Gallery";

function App() {

  return (

   <div className="min-h-screen bg-gradient-to-r from-slate-100 to-blue-100">

      <h1 className="text-4xl font-bold text-center text-blue-700 pt-6 pb-4">
        Photo Gallery
      </h1>

      <Gallery />

    </div>
  );

}

export default App;