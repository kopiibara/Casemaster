// AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the ProfileData interface
interface ProfileData {
  fullName: string;
  email: string;
  phoneNo: string;
  image: Blob | null;  
}

// Define the context type, which includes the profile data and setter function
interface AppContextType {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;  
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // State to hold profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    email: "",
    phoneNo: "",
    image: null,  // Initialize with null as a default
  });

  return (
    <AppContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </AppContext.Provider>
  );
};
