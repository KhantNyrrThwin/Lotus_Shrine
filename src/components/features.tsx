import "../App.css";

function features() {
  return (
    <>
    <div className= "flex bg-[url('./assets/bar3.jpg')] bg-cover h-[700px] mt-0" >
      <div className= "w-screen  mt-2 h-[500px] bg-[#fde9da] text-yellow-400 rounded-4xl ">
        <h1>This is the Feature Page</h1>
        <div className="grid grid-cols-2 gap-4 p-4 max-w-3xl mx-auto">
      {/* Feature 1: Hover Effect */}
      <div className="p-8 rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-lg font-bold">Hover Effect</h3>
        <p>Hover over me to see the animation!</p>
    
      </div>

      {/* Feature 2: Gradient Background */}
      <div className="p-8 rounded-lg bg-gradient-to-tr from-red-400 to-teal-400 text-white">
        <h3 className="text-lg font-bold">Gradient Background</h3>
        <p>Beautiful color transition</p>
      </div>

      {/* Feature 3: Pulsing Animation */}
      <div className="p-8 rounded-lg bg-blue-500 text-white animate-pulse">
        <h3 className="text-lg font-bold">Pulsing Animation</h3>
        <p>Watch me pulse!</p>
      </div>

      {/* Feature 4: Border Pattern */}
      <div className="p-8 rounded-lg bg-white border-4 border-dashed border-yellow-400 shadow-md">
        <h3 className="text-lg font-bold">Border Pattern</h3>
        <p>Dashed border with shadow</p>
      </div>
    </div>
      </div>
      </div>
    </>
  );
}

export default features;

