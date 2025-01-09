import React from 'react';

const VehiclePanel = (props) => {
    return (
        <div className="w-full h-full bg-white rounded-t-lg p-4 overflow-y-auto">
            {/* Close Panel Button */}
            <h5
                className="p-2 text-center bg-gray-100 rounded-md cursor-pointer"
                onClick={() => {
                    props.setVehiclePanel(false);
                }}
            >
                <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-4 text-center">Choose a Vehicle</h3>

            {/* Vehicle Options */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('car');
                }}
                className="flex items-center border hover:border-black transition-all mb-3 rounded-lg w-full p-3 justify-between"
            >
                <img
                    className="h-14 md:h-16 object-contain"
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                    alt="Car"
                />
                <div className="ml-2 w-3/5">
                    <h4 className="font-medium text-base">
                        UberGo <span className="text-gray-600"><i className="ri-user-3-fill"></i> 4</span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
            </div>

            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('moto');
                }}
                className="flex items-center border hover:border-black transition-all mb-3 rounded-lg w-full p-3 justify-between"
            >
                <img
                    className="h-14 md:h-16 object-contain"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                    alt="Moto"
                />
                <div className="ml-2 w-3/5">
                    <h4 className="font-medium text-base">
                        Moto <span className="text-gray-600"><i className="ri-user-3-fill"></i> 1</span>
                    </h4>
                    <h5 className="font-medium text-sm">3 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Affordable motorcycle rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
            </div>

            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('auto');
                }}
                className="flex items-center border hover:border-black transition-all mb-3 rounded-lg w-full p-3 justify-between"
            >
                <img
                    className="h-14 md:h-16 object-contain"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                    alt="Auto"
                />
                <div className="ml-2 w-3/5">
                    <h4 className="font-medium text-base">
                        UberAuto <span className="text-gray-600"><i className="ri-user-3-fill"></i> 3</span>
                    </h4>
                    <h5 className="font-medium text-sm">3 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">Affordable Auto rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
