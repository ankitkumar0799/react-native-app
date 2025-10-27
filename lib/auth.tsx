// lib/auth.ts
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../src/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthCtx = { loading: boolean; isAuthed: boolean };
const Ctx = createContext<AuthCtx>({ loading: true, isAuthed: false });
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setIsAuthed(!!data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session);
      if (session)
        AsyncStorage.setItem("sb_session", JSON.stringify(session));
      else AsyncStorage.removeItem("sb_session");
    });

    return () => {
      mounted = false;
      sub.subscription?.unsubscribe();
    };
  }, []);

  return <Ctx.Provider value={{ loading, isAuthed }}>{children}</Ctx.Provider>;
}
