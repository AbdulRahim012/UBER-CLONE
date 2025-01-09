import React from 'react';

const LookingForDriver = (props) => {
    return (
        <div className="w-full h-full bg-white p-4 rounded-t-lg overflow-y-auto">
            {/* Close Panel Button */}
            <h5
                className="p-2 text-center bg-gray-100 rounded-md cursor-pointer"
                onClick={() => {
                    props.setVehicleFound(false);
                }}
            >
                <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-5 mt-4 text-center">
                Looking for a Driver
            </h3>

            {/* Main Content */}
            <div className="flex flex-col items-center gap-6">
                {/* Vehicle Image */}
                <img
                    className="h-20 md:h-24 lg:h-28 object-contain"
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                    alt="Vehicle"
                />

                {/* Ride Details */}
                <div className="w-full mt-5">
                    {/* Pickup Location */}
                    <div className="flex items-center gap-4 p-3 border-b border-gray-300">
                        <i className="text-xl text-gray-600 ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm text-gray-600">{props.pickup}</p>
                        </div>
                    </div>

                    {/* Destination Location */}
                    <div className="flex items-center gap-4 p-3 border-b border-gray-300">
                        <i className="text-xl text-gray-600 ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm text-gray-600">{props.destination}</p>
                        </div>
                    </div>

                    {/* Fare Information */}
                    <div className="flex items-center gap-4 p-3">
                        <i className="text-xl text-gray-600 ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">
                                ₹{props.fare[props.vehicleType]}
                            </h3>
                            <p className="text-sm text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LookingForDriver;
