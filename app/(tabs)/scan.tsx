import { Camera, CameraView } from "expo-camera";
import { useFaceDetector } from "expo-mlkit-face-detection";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [faceData, setFaceData] = useState<any>(null);
  const [faceDetectedTime, setFaceDetectedTime] = useState<number | null>(null);

  const cameraRef = useRef<CameraView | null>(null);
  const lastDetectionTime = useRef<number>(0);
  const detectFaces = useFaceDetector();

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Auto navigate after 1.5s of face detection
  useEffect(() => {
    if (faceData && !faceDetectedTime) setFaceDetectedTime(Date.now());
    if (faceDetectedTime && Date.now() - faceDetectedTime > 1500) {
      router.replace("./result");
    }
  }, [faceData, faceDetectedTime]);

  // Detect face every 500ms
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!cameraRef.current) return;
      const now = Date.now();
      if (now - lastDetectionTime.current < 500) return;
      lastDetectionTime.current = now;

      try {
        const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true });

        const faces = await detectFaces.detectFaces(photo.uri);
        if (faces) {
          setFaceData(faces);
        } else {
          setFaceData(null);
          setFaceDetectedTime(null);
        }
      } catch (e) {
        console.error("Face detection error:", e);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [detectFaces]);

  // Permission UI
  if (hasPermission === null) return <View style={styles.center}><Text>Requesting Camera Permission...</Text></View>;
  if (!hasPermission) return <View style={styles.center}><Text>Camera permission denied. Enable it in settings.</Text></View>;

  // Extract bounds safely
  const bounds = faceData?.bounds?.origin;
  const x = Math.round(bounds?.x || 0);
  const y = Math.round(bounds?.y || 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="front"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Scanning Face...</Text>
        {faceData ? (
          <>
            <Text style={styles.detected}>✔ Face Detected</Text>
            <Text style={styles.detailsText}>Position: ({x}, {y})</Text>
            {faceData.smilingProbability !== undefined && (
              <Text style={styles.detailsText}>Smiling: {Math.round(faceData.smilingProbability * 100)}%</Text>
            )}
            {faceData.leftEyeOpenProbability !== undefined && (
              <Text style={styles.detailsText}>Left Eye Open: {Math.round(faceData.leftEyeOpenProbability * 100)}%</Text>
            )}
            {faceData.rightEyeOpenProbability !== undefined && (
              <Text style={styles.detailsText}>Right Eye Open: {Math.round(faceData.rightEyeOpenProbability * 100)}%</Text>
            )}
          </>
        ) : (
          <Text style={styles.notDetected}>No Face Detected</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  infoContainer: { position: "absolute", bottom: 50, left: 20, right: 20, alignItems: "center", backgroundColor: "rgba(0,0,0,0.8)", borderRadius: 15, padding: 20, elevation: 5 },
  title: { fontSize: 18, color: "#fff", marginBottom: 12, fontWeight: "600" },
  detected: { fontSize: 18, color: "#00ff88", fontWeight: "bold", marginBottom: 15 },
  detailsText: { fontSize: 14, color: "#b3e5fc", fontWeight: "400", marginBottom: 10 },
  notDetected: { fontSize: 16, color: "#ff6b6b", fontWeight: "600" },
});
