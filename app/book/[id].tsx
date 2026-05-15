import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function BookDetailsScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    author: string;
    cover: string;
    description: string;
  }>();

  const [added, setAdded] = useState(false);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Detalhes do livro' }} />

      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Detalhes</Text>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: params.cover }} style={styles.cover} />
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.author}>por {params.author}</Text>
        <Text style={styles.description}>{params.description}</Text>

        <TouchableOpacity
          style={[styles.button, added && styles.buttonAdded]}
          onPress={() => setAdded(true)}>
          <Text style={styles.buttonText}>{added ? 'Adicionado à leitura' : 'Adicionar à Leitura'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Biblioteca • leitura para todos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  navbar: {
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: '#1d4ed8',
  },
  navbarTitle: { color: '#fff', fontWeight: '700', fontSize: 20 },
  content: { flex: 1, alignItems: 'center', padding: 20 },
  cover: { width: 180, height: 250, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  author: { marginTop: 6, marginBottom: 16, fontSize: 16, color: '#334155' },
  description: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  button: {
    marginTop: 24,
    backgroundColor: '#1d4ed8',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonAdded: { backgroundColor: '#16a34a' },
  buttonText: { color: '#fff', fontWeight: '700' },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  footerText: { textAlign: 'center', color: '#475569' },
});
