import { CameraView, useCameraPermissions } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [faceData, setFaceData] = useState<any>(null);
  const [faceDetectedTime, setFaceDetectedTime] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  useEffect(() => {
    // Auto-navigate to result after face is detected for 1.5 seconds
    if (faceData && !faceDetectedTime) {
      setFaceDetectedTime(Date.now());
    }
    
    if (faceDetectedTime && Date.now() - faceDetectedTime > 1500) {
      router.replace("./result");
    }
  }, [faceData, faceDetectedTime]);

  const handleFacesDetected = ({ faces }: { faces: any[] }) => {
    try {
      if (faces && faces.length > 0) {
        setFaceData(faces[0]);
      } else {
        setFaceData(null);
        setFaceDetectedTime(null);
      }
    } catch (error) {
      console.error("Face detection error:", error);
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#333" }}>Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center", color: "#333" }}>
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
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minInterval: 500,
        }}
      />

      {/* FACE INFO BOX */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Scanning Face...</Text>

        {faceData ? (
          <>
            <Text style={styles.detected}>✔ Face Detected</Text>
            <Text style={styles.detailsText}>
              Position: ({Math.round(faceData.bounds?.origin?.x || 0)}, {Math.round(faceData.bounds?.origin?.y || 0)})
            </Text>
          </>
        ) : (
          <Text style={styles.notDetected}>No Face Detected</Text>
        )}

        {faceData && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("./result")}
          >
            <Text style={styles.buttonText}>Show Result</Text>
          </TouchableOpacity>
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
    backgroundColor: "#ffffff",
  },
  infoContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 12,
    fontWeight: "600",
  },
  detected: {
    fontSize: 18,
    color: "#00ff88",
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailsText: {
    fontSize: 14,
    color: "#b3e5fc",
    fontWeight: "400",
    marginBottom: 10,
  },
  notDetected: {
    fontSize: 16,
    color: "#ff6b6b",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
    marginTop: 15,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
