import { supabase } from "../../lib/supabase";



import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import { api } from "../../services/api";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      return Alert.alert("Invalid number", "Please enter a valid 10-digit number");
    }
  
    const formattedPhone = `+91${phone}`;
  
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
  
      if (error) {
        console.log("OTP error:", error.message);
        Alert.alert("Error", error.message);
        return;
      }
  
      Alert.alert("Success", "OTP sent successfully!");
      navigation.navigate("OtpScreen", { phone: formattedPhone });
    } catch (e: any) {
      console.log("Unexpected error:", e);
      Alert.alert("Network Error", e.message);
    } finally {
      setLoading(false);
    }
  };
  
  



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#E8F5E9" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        {/* ---------- HEADER WITH CAROUSEL ---------- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <View style={styles.sliderContainer}>
            <Swiper
              autoplay
              autoplayTimeout={3}
              showsPagination
              dotColor="#cfd8dc"
              activeDotColor="#0066FF"
              height={width * 0.8}
            >
              <Image
                source={require("../../../assets/banner1.png")}
                style={styles.sliderImage}
              />
              <Image
                source={require("../../../assets/banner2.webp")}
                style={styles.sliderImage}
              />
              <Image
                source={require("../../../assets/banner3.webp")}
                style={styles.sliderImage}
              />
              <Image
                source={require("../../../assets/banner4.webp")}
                style={styles.sliderImage}
              />
            </Swiper>
          </View>

          <Text style={styles.title}>Easy Returns</Text>
          <Text style={styles.subtitle}>No questions asked</Text>
        </View>

        {/* ---------- BOTTOM SHEET (same as before) ---------- */}
        <View style={styles.bottomSheet}>
          <Text style={styles.heading}>
            Enter your mobile number to get started
          </Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Enter your 10-digit number"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSendOtp}
            disabled={loading || phone.length !== 10}
            style={[
              styles.button,
              { backgroundColor: phone.length === 10 ? "#0066FF" : "#ccc" },
            ]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Get OTP"}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.truecallerBtn}>
            <Text style={styles.truecallerText}>
              Login with Truecaller (UI only)
            </Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By logging in or signing up, you agree to our{" "}
            <Text style={styles.link}>Terms & Conditions</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#E8F5E9",
  },
  skipBtn: {
    position: "absolute",
    right: 20,
    top: 20,
    borderWidth: 1,
    borderColor: "#0066FF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    zIndex: 10,
  },
  skipText: { color: "#0066FF", fontWeight: "600" },
  sliderContainer: {
    width: width,
    height: height * 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderImage: {
    width: width,
    height: height * 0.35,
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#006400",
    marginTop: 12,
  },
  subtitle: { fontSize: 14, color: "#006400" },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  heading: { fontSize: 15, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: { marginHorizontal: 8, color: "#666" },
  truecallerBtn: {
    backgroundColor: "#1A73E8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  truecallerText: { color: "#fff", fontWeight: "600" },
  terms: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginTop: 14,
  },
  link: { color: "#0066FF", fontWeight: "600" },
});
