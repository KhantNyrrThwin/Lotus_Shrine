import "../App.css";

function Grid_Features() {
  return (
    <>
    <div className= "flex bg-[url('./assets/bar3.jpg')] bg-cover h-[700px] mt-0" >
      <div className= "w-screen  mt-0 h-[500px] bg-[#fde9da] text-[#4f3016] rounded-4xl ">
        <h1 className="text-4xl font-bold text-center mt-10">ဝန်ဆောင်မှုများ</h1>
        <div className="grid grid-cols-2 gap-4 p-4 max-w-3xl mx-auto mt-5">
      {/* Feature 1: Hover Effect */}
      <div className="p-8 rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-lg font-bold">ဘုရားများ</h3>
        <p>ဘုရားများကို ကြည့်ရှုရန်</p>
      </div>

      {/* Feature 2: Hover Effect */}
      <div className="p-8 rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-lg font-bold">တရားတော်များ</h3>
        <p>တရားတော်များကို နားထောင်ရန်</p>
      </div>

      {/* Feature 3: Hover Effect */}
      <div className="p-8 rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-lg font-bold">ဆရာတော်များ</h3>
        <p>ဆရာတော်များ၏ တရားတော်များ</p>
      </div>

      {/* Feature 4: Hover Effect */}
      <div className="p-8 rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-lg font-bold">သတင်းများ</h3>
        <p>နေ့စဉ်သတင်းများ</p>
      </div>
        </div>
    </div>
      </div>
      
    </>
  );
}

export default Grid_Features;

