import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ResultScreen() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 20
    }}>

      <View style={{
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 32,
          color: '#2ecc71',
          fontWeight: 'bold',
          marginBottom: 10
        }}>
          Success ✔
        </Text>

        <Text style={{ fontSize: 18, color: '#555' }}>
          Face Match Completed
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 40,
          backgroundColor: '#4A90E2',
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 12
        }}
        onPress={() => router.replace('/')}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Back Home</Text>
      </TouchableOpacity>

    </View>
  );
}
