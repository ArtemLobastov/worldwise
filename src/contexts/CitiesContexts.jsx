/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react';
const URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (e) {
        alert('Error fetching cities');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (e) {
      alert('Error fetching cities');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside CitiesProvider');
  return context;
}
export { CitiesProvider, useCities };
