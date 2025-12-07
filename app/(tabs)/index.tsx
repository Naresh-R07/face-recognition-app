import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>

      <Text style={{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20
      }}>
        Face Recognition
      </Text>

      <View style={{
        width: 280,
        height: 280,
        backgroundColor: '#dfe6e9',
        borderRadius: 140,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginBottom: 40
      }}>
        <Text style={{ color: '#636e72' }}>Camera Preview</Text>
      </View>

      <Link href="./scan" asChild>
        <TouchableOpacity style={{
          backgroundColor: '#4A90E2',
          paddingVertical: 15,
          paddingHorizontal: 60,
          borderRadius: 14,
          elevation: 4
        }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Start Scan</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}
