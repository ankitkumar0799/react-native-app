import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);

      // 🔁 Listen to auth state changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          await AsyncStorage.setItem("sb_session", JSON.stringify(session));
          setUser(session.user);
        } else {
          await AsyncStorage.removeItem("sb_session");
          setUser(null);
        }
      });
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
