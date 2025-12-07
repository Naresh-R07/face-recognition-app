import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Face Recognition
      </Text>

      <View style={styles.cameraPreview}>
        <Text style={styles.previewText}>📷</Text>
      </View>

      <Link href="./scan" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Scan</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 40,
    textAlign: 'center',
  },
  cameraPreview: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 3,
  },
  previewText: {
    fontSize: 60,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
