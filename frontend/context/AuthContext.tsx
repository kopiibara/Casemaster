import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  PublicClientApplication,
  AuthenticationResult,
} from "@azure/msal-browser";
import { config } from "../config";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// MSAL Configuration
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    authority: config.authority,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage", // Keep this as sessionStorage, but you can store tokens elsewhere
    storeAuthStateInCookie: false,
  },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Use localStorage to persist tokens across page reloads
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  // Method to set both tokens
  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    // Store the tokens in localStorage to persist them across page reloads
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  // Method to refresh the access token using MSAL
  const refreshAccessToken = async (): Promise<void> => {
    try {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length === 0) {
        throw new Error("No accounts found. User may need to sign in again.");
      }

      const silentRequest = {
        scopes: ["User.Read", "Mail.Read"], // Use the same scopes as login
        account: accounts[0], // Get the first account (should be the current user)
      };

      const tokenResponse: AuthenticationResult =
        await msalInstance.acquireTokenSilent(silentRequest);
      setAccessToken(tokenResponse.accessToken); // Update the access token in state
      console.log("Access token refreshed:", tokenResponse.accessToken);
    } catch (error) {
      console.error("Failed to refresh access token:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, setTokens, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
