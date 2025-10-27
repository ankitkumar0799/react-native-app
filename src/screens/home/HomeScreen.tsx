import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { ScrollView, ImageBackground } from "react-native";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 🔹 Location Row */}
      <View style={styles.headerRow}>
        <Text style={styles.location}>New Delhi ▾</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="wallet-outline" size={20} color="#1E293B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="cart-outline" size={20} color="#1E293B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔹 Search Bar */}
      <View style={styles.searchBar}>
        <Feather name="search" size={18} color="#64748B" />
        <TextInput
          placeholder="Search for medicines"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      {/* 🔹 Banner */}
      <TouchableOpacity activeOpacity={0.8} style={styles.bannerContainer}>
        <Image
          source={require("../../assets/banner1.png")} // 👈 Add your image in /assets folder
          style={styles.banner}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* 🔹 Add Prescription */}
      <View style={styles.prescriptionCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="document-text-outline" size={22} color="#E879F9" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.prescriptionTitle}>Add a prescription</Text>
            <Text style={styles.prescriptionSub}>
              to place your order
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.uploadBtn}>
          <Icon name="cloud-upload-outline" size={18} color="#2563EB" />
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Call to Order */}
      <Text style={styles.callText}>
        Or call us to order on <Text style={styles.callNumber}>09240250346</Text>
      </Text>

      {/* 🗣️ Testimonials Carousel */}
<View style={{ marginTop: 24 }}>
  <Text style={styles.testimonialTitle}>What our customers have to say</Text>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingVertical: 12 }}
  >
    {[
      { id: 1, name: "Jai", image: require("../../assets/customers/jai.jpg") },
      { id: 2, name: "Srishti", image: require("../../assets/customers/srishti.jpg") },
      { id: 3, name: "Anil", image: require("../../assets/customers/anil.jpg") },
    ].map((item) => (
      <View key={item.id} style={styles.customerCard}>
        <ImageBackground
          source={item.image}
          style={styles.customerImage}
          imageStyle={{ borderRadius: 14 }}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.customerName}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    ))}
  </ScrollView>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  iconRow: { flexDirection: "row", gap: 10 },
  iconBtn: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 30,
    elevation: 2,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 2,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
    marginLeft: 8,
  },
  bannerContainer: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 14,
  },
  prescriptionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  prescriptionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  prescriptionSub: {
    fontSize: 13,
    color: "#64748B",
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0EAFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  uploadText: {
    marginLeft: 4,
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 13,
  },
  callText: {
    textAlign: "center",
    color: "#475569",
    marginTop: 12,
    fontSize: 13,
  },
  callNumber: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  testimonialTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 8,
  },
  customerCard: {
    width: 140,
    height: 200,
    marginRight: 14,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#F1F5F9",
    elevation: 3,
  },
  customerImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 6,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  customerName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  
});
