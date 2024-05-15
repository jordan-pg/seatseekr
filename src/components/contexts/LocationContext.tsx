import React, { createContext, useContext, useState, useEffect } from 'react';
import { Location } from '@/types/types';
import Geohash from 'latlon-geohash';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }: any) => {
    const [location, setLocation] = useState<Location>({
        hashLocation: '',
        lat: 0,
        lon: 0,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const geoLocation = Geohash.encode(
                position.coords.latitude,
                position.coords.longitude,
                7
            );
            setLocation({
                hashLocation: geoLocation,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        });
    }, []);

    return (
        <LocationContext.Provider value={location as any}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);