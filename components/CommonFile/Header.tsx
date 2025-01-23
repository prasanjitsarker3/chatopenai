const Header = () => {
  return (
    <div className=" w-full">
      <div className=" w-full container mx-auto p-3 ">
        <div className=" grid grid-cols-12">
          <div className=" col-span-3 bg-gray-200">
            <div className=" text-2xl font-medium text-white flex items-center">
                <h1>AI CHAT</h1>
            </div>
          </div>
          <div className=" col-span-9 text-white bg-cyan-600 rounded-full">
            <div className=" flex items-center justify-between  p-2 ">
              <h1>Chat With AI</h1>
              <button className=" border border-white px-8 py-1.5 rounded-full">
                Explore AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
