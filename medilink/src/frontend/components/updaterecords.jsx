const UpdateRecords = () => {
    return (
      <>
        <div className="p-6 max-w-6xl mx-auto">
          {/* section1 */}
          <h2 className="text-3xl font-bold mb-4">Update Records</h2>
  
          {/* wanted to incorporate a button */}
          <div className="mb-6 flex justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
              Upload Records
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
              Upload Records
            </button>
          </div>
  
          {/* update records */}
          <h2 className="text-3xl font-bold mt-10 mb-4">Upload Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* section2: upload history */}
            <div className="text-center">
              <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-black text-center">
                <p className="text-lg font-bold">BloodTest.pdf</p>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p className="font-semibold">Feb 5, 2025</p>
                <p className="text-xs">Completed</p>
              </div>
            </div>
  
            <div className="text-center">
              <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-black text-center">
                <p className="text-lg font-bold">XRay_Scan.jpg</p>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p className="font-semibold">Feb 4, 2025</p>
                <p className="text-xs">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default UpdateRecords;
  