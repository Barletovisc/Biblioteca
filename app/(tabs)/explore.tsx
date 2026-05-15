import { FlatList, StyleSheet, Text, View } from 'react-native';

const CATEGORIES = [
  { id: '1', name: 'Romance' },
  { id: '2', name: 'Fantasia' },
  { id: '3', name: 'Ficção científica' },
  { id: '4', name: 'Biografia' },
  { id: '5', name: 'Suspense' },
];

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Categorias</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Organização dos livros</Text>
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
        />
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
  content: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 14 },
  item: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  itemText: { fontSize: 16 },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  footerText: { textAlign: 'center', color: '#475569' },
});
