import {React, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) =>{
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    const navigate=useNavigate();
    const [captain, setCaptain] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {

        if(!token){
            navigate('/captain-login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.status === 200){
                setCaptain(response.data.captain);
                setIsLoading(false);
            }
        }).catch(error => {
            console.error('Error fetching captain profile:', error);
            localStorage.removeItem('token');
            navigate('/captain-login');
        })
    },[token]);

    if(isLoading){
        return <div>Loading...</div>

    }
    // Render children if token exists
    return (
        <>
            {children}
        </>
    )

}

export default CaptainProtectWrapper;