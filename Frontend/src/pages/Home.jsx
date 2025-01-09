import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    // State declarations
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null);

    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    useEffect(() => {
        socket.emit('join', { userType: 'user', userId: user._id });
    }, [user]);

    // Socket event listeners
    socket.on('ride-confirmed', (ride) => {
        setVehicleFound(false);
        setWaitingForDriver(true);
        setRide(ride);
    });

    socket.on('ride-started', (ride) => {
        setWaitingForDriver(false);
        navigate('/riding', { state: { ride } });
    });

    // Handle pickup input change
    const handlePickupChange = async (e) => {
        setPickup(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPickupSuggestions(response.data);
        } catch {
            console.error('Error fetching pickup suggestions');
        }
    };

    // Handle destination input change
    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setDestinationSuggestions(response.data);
        } catch {
            console.error('Error fetching destination suggestions');
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    // GSAP animations for panel transitions
    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            });
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            });
        }
    }, [panelOpen]);

    // Responsive animation logic for other panels
    const panelAnimations = [
        { ref: vehiclePanelRef, state: vehiclePanel },
        { ref: confirmRidePanelRef, state: confirmRidePanel },
        { ref: vehicleFoundRef, state: vehicleFound },
        { ref: waitingForDriverRef, state: waitingForDriver },
    ];

    panelAnimations.forEach(({ ref, state }) => {
        useGSAP(() => {
            gsap.to(ref.current, {
                transform: state ? 'translateY(0)' : 'translateY(100%)',
            });
        }, [state]);
    });

    // Fetch fare data
    const findTrip = async () => {
        setVehiclePanel(true);
        setPanelOpen(false);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFare(response.data);
        } catch {
            console.error('Error fetching fare data');
        }
    };

    // Create a ride request
    const createRide = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                { pickup, destination, vehicleType },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            console.log(response.data);
        } catch {
            console.error('Error creating ride');
        }
    };

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Uber Logo */}
            <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

            {/* Map and live tracking */}
            <div className="h-screen w-screen">
                <LiveTracking />
            </div>

            {/* Bottom panels */}
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                {/* Search panel */}
                <div className="h-[30%] p-6 bg-white relative">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form className="relative py-3" onSubmit={submitHandler}>
                        <div className="absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('pickup');
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-gray-200 px-12 py-2 text-lg rounded-lg w-full"
                            type="text"
                            placeholder="Add a pick-up location"
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('destination');
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className="bg-gray-200 px-12 py-2 text-lg rounded-lg w-full mt-3"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                    <button onClick={findTrip} className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
                        Find Trip
                    </button>
                </div>

                {/* Expandable panels */}
                <div ref={panelRef} className="bg-white h-0 overflow-hidden">
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
                <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                    <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
                </div>
                <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
                    <ConfirmRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehicleFound={setVehicleFound}
                    />
                </div>
                <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
                    <LookingForDriver
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setVehicleFound={setVehicleFound}
                    />
                </div>
                <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12">
                    <WaitingForDriver
                        ride={ride}
                        setVehicleFound={setVehicleFound}
                        setWaitingForDriver={setWaitingForDriver}
                        waitingForDriver={waitingForDriver}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
