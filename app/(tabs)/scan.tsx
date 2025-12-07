import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [faceData, setFaceData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission]);

  const handleFacesDetected = ({ faces }: any) => {
    setFaceData(faces[0] || null);
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center" }}>
          Camera permission denied.  
          Enable it in settings to continue.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <CameraView
        style={{ flex: 1 }}
        facing="front"
      />

      {/* FACE INFO BOX */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Scanning...</Text>

        {faceData ? (
          <Text style={styles.detected}>✔ Face Detected</Text>
        ) : (
          <Text style={styles.notDetected}>No Face Detected</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  infoContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  detected: {
    fontSize: 18,
    color: "#00ff88",
    fontWeight: "bold",
  },
  notDetected: {
    fontSize: 18,
    color: "#ff4444",
    fontWeight: "bold",
  },
});
