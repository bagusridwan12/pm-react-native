import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "./components/button";
import { Input } from "./components/input";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1705364238367-707e71dbad2b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1673675865429-357daca108d6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1734546862643-4a9c4c32d42c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1664918706173-6349ca225dd0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1650362868658-51e18782764a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1623042392888-1f87e36a5b64?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531662439848-a7ed93c51468?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542725231-e6ff634bf0f5?auto=format&fit=crop&w=600&q=80",
];

const BALI_TITLES = [
  "Pura Ulun Danu",
  "Pantai Kelingking",
  "Tegallalang Ubud",
  "Pura Tanah Lot",
  "Pura Lempuyang",
  "Tebing Uluwatu",
  "Gunung Batur",
  "Danau Kintamani",
  "Teras Sawah Ubud",
  "Pesona Alam Bali",
];

export default function App() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);

  const handleShowAlert = () => {
    Alert.alert("Primakara Luar Biasa", "Tugas Mandiri: Pemrograman Mobile");
  };

  const handleLoadPhotos = async () => {
    setShowGallery((prev) => !prev);
    !showGallery &&
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: 10,
      })
        .then((res) => {
          const uris = res.assets?.map((asset) => asset.uri) ?? [];
          setPhotos(uris.length > 0 ? uris : FALLBACK_IMAGES);
        })
        .catch(() => setPhotos(FALLBACK_IMAGES));
  };

  const displayedPhotos = photos.length > 0 ? photos : FALLBACK_IMAGES;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Tugas Mandiri</Text>
            <Text style={styles.subtitle}>
              Modul I: Basic Component, Layouting &amp; Styling
            </Text>
          </View>

          <View style={styles.cardList}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Alert Primakara</Text>
              <Text style={styles.cardDescription} numberOfLines={1}>
                Menampilkan dialog alert native bertuliskan &quot;Primakara Luar Biasa&quot; menggunakan component Alert.
              </Text>
              <Button onPress={handleShowAlert} hostProps={{ style: styles.fullWidth }}>
                <ButtonText>Tampilkan Alert</ButtonText>
              </Button>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Galeri Wisata Bali</Text>
              <Text style={styles.cardDescription} numberOfLines={1}>
                Menampilkan 10 keindahan destinasi wisata Bali dalam tata letak Flexbox Grid 2-kolom.
              </Text>

              <Input
                placeholder="Cari destinasi wisata Bali..."
                hostProps={{ style: styles.inputHost }}
              />

              <Button onPress={handleLoadPhotos} hostProps={{ style: styles.fullWidth }}>
                <ButtonText>
                  {showGallery ? "Sembunyikan Galeri" : "Tampilkan Galeri Wisata Bali"}
                </ButtonText>
              </Button>

              {showGallery && (
                <View style={styles.gridContainer}>
                  {displayedPhotos.map((uri, index) => (
                    <View key={`${uri}-${index}`} style={styles.gridItem}>
                      <Image
                        source={{ uri }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                      <View style={styles.imageInfo}>
                        <Text style={styles.imageName} numberOfLines={1}>
                          {BALI_TITLES[index] ?? `Wisata Bali ${index + 1}`}
                        </Text>
                        <Text style={styles.imageBadge}>
                          {index + 1}/10
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#6c757d",
  },
  cardList: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    backgroundColor: "#ffffff",
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  cardDescription: {
    fontSize: 13,
    color: "#6c757d",
  },
  fullWidth: {
    width: "100%",
  },
  inputHost: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    backgroundColor: "#ffffff",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  gridItem: {
    width: "48%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 120,
  },
  imageInfo: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#212529",
    flex: 1,
    marginRight: 4,
  },
  imageBadge: {
    fontSize: 11,
    color: "#6c757d",
    fontWeight: "500",
  },
});