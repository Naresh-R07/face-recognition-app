import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.successText}>
          ✔ Success
        </Text>

        <Text style={styles.messageText}>
          Face Match Completed
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f0f8f0',
    padding: 40,
    borderRadius: 15,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 40,
    borderLeftWidth: 5,
    borderLeftColor: '#2ecc71',
  },
  successText: {
    fontSize: 32,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  messageText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '500',
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
