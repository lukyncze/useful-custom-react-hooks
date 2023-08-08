import useGeolocation from './useGeolocation';

export default function GeolocationComponent() {
  const {
    loading,
    error,
    data: {latitude, longitude},
  } = useGeolocation();

  const renderGeolocation = () => {
    if (!latitude && !longitude) return 'No geolocation data';

    return `${latitude} x ${longitude}`;
  };

  return (
    <>
      <div>Loading: {loading.toString()}</div>
      <div>Error: {error?.message}</div>
      <div>{renderGeolocation()}</div>
    </>
  );
}

