"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { server } from "@/app/_api/api";

const AddressContext = createContext(null);

export function AddressProvider({ children }) {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddress = useCallback(async () => {
    try {
      setLoading(true);
      const response = await server.get("/food-order/get");
      if (response.data) {
        setAddress(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch address:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAddress();
  }, [fetchAddress]);

  const createAddress = async (newAddressData) => {
    try {
      setLoading(true);
      const response = await server.post("/food-order/create", {
        address: newAddressData,
      });
      await fetchAddress();
      return response.data;
    } catch (error) {
      console.error("Failed to create address:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{ address, loading, fetchAddress, createAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
