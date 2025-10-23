import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { api } from "../../services/api";

export default function OtpScreen({ route, navigation }: any) {
  const { phone } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // 👈 6 boxes
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const inputs = useRef<TextInput[]>([]);

  // ⏳ Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // 🧩 Handle OTP input changes
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // move focus to next input
    if (text && index < otp.length - 1) inputs.current[index + 1]?.focus();
    // move back on delete
    if (!text && index > 0) inputs.current[index - 1]?.focus();
  };

  const code = otp.join("");

  // 💥 Shake animation for invalid OTP
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // ✅ Verify OTP with Supabase
  const verifyOtp = async () => {
    if (code.length < 6) {
      Alert.alert("Incomplete", "Please enter the full 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: "sms",
      });

      if (error) {
        triggerShake();
        Alert.alert("Invalid OTP", error.message || "Please try again");
        return;
      }

      Alert.alert("Success", "OTP verified successfully!");
      navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
    } catch (e: any) {
      triggerShake();
      Alert.alert("Error", e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Resend OTP
  const resendOtp = async () => {
    try {
      await api.post("/send-otp", { phone });
      setTimer(60);
      setOtp(Array(6).fill(""));
      inputs.current[0]?.focus();
      Alert.alert("OTP Sent", "A new OTP has been sent to your phone");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to resend OTP");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E8F5E9" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Verify your OTP</Text>
        <Text style={styles.subtitle}>
          Enter the one-time password sent to{" "}
          <Text style={{ fontWeight: "700" }}>{phone}</Text>
        </Text>

        {/* 🔢 OTP Inputs with shake animation */}
        <Animated.View
          style={[
            styles.otpContainer,
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el) => (inputs.current[i] = el!)}
              value={digit}
              onChangeText={(txt) => handleChange(txt.replace(/[^0-9]/g, ""), i)}
              maxLength={1}
              keyboardType="number-pad"
              style={styles.otpBox}
              autoFocus={i === 0}
            />
          ))}
        </Animated.View>

        {/* ⏱ Timer / Resend */}
        {timer > 0 ? (
          <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={resendOtp}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}

        {/* 🔘 Verify Button */}
        <TouchableOpacity
          onPress={verifyOtp}
          disabled={code.length < 6 || loading}
          style={[
            styles.button,
            { opacity: code.length < 6 || loading ? 0.6 : 1 },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003300",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpBox: {
    width: 50,
    height: 60,
    borderWidth: 1.5,
    borderColor: "#0066FF",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#fff",
    color: "#000",
    elevation: 2,
  },
  timerText: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  resendText: {
    textAlign: "center",
    color: "#0066FF",
    fontWeight: "600",
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#0066FF",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
