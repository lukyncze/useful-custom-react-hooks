import {isNil} from 'lodash';
import {useState, useEffect} from 'react';
import {Maybe} from '../types';

interface Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface GeolocationHookOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface GeolocationHook {
  loading: boolean;
  error?: GeolocationError;
  data: Coordinates;
}

const initialCoordinates: Coordinates = {
  latitude: 0,
  longitude: 0,
};

export default function useGeolocation(options: GeolocationHookOptions = {}): GeolocationHook {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Maybe<GeolocationError>>();
  const [data, setData] = useState<Coordinates>(initialCoordinates);

  useEffect(() => {
    const successHandler = (e: GeolocationPosition) => {
      setLoading(false);
      setError(undefined);
      setData({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
        ...(!isNil(e.coords.altitude) && {altitude: e.coords.altitude}),
        ...(!isNil(e.coords.accuracy) && {accuracy: e.coords.accuracy}),
        ...(!isNil(e.coords.altitudeAccuracy) && {altitudeAccuracy: e.coords.altitudeAccuracy}),
        ...(!isNil(e.coords.heading) && {heading: e.coords.heading}),
        ...(!isNil(e.coords.speed) && {speed: e.coords.speed}),
      });
    };

    const errorHandler = (e: GeolocationPositionError) => {
      setError({code: e.code, message: e.message});
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);

    const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return {loading, error, data};
}

