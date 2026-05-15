import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
};

const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/71MmfkN6V-L.jpg',
    description: 'Um clássico da literatura brasileira sobre memória, ciúme e dúvida.',
  },
  {
    id: '2',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/71tbalAHYCL.jpg',
    description: 'Uma história poética sobre amizade, afeto e o olhar essencial.',
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg',
    description: 'Distopia política que discute vigilância, linguagem e liberdade.',
  },
  {
    id: '4',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/91BsZhxCRjL.jpg',
    description: 'Sátira política em formato de fábula, curta e poderosa.',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredBooks = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return BOOKS;
    }

    return BOOKS.filter(
      (book) =>
        book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>📚 Biblioteca App</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          placeholder="Pesquisar por título ou autor"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        <Text style={styles.sectionTitle}>Livros disponíveis</Text>

        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text>Nenhum livro encontrado.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookCard}
              onPress={() =>
                router.push({
                  pathname: '/book/[id]',
                  params: {
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    cover: item.cover,
                    description: item.description,
                  },
                })
              }>
              <Image source={{ uri: item.cover }} style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
                <Text numberOfLines={2}>{item.description}</Text>
              </View>
            </TouchableOpacity>
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
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  sectionTitle: { fontWeight: '700', fontSize: 18, marginBottom: 12 },
  listContent: { paddingBottom: 16 },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bookImage: { width: 70, height: 100, borderRadius: 8 },
  bookInfo: { flex: 1, gap: 4 },
  bookTitle: { fontWeight: '700', fontSize: 16 },
  bookAuthor: { color: '#334155', marginBottom: 2 },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  footerText: { textAlign: 'center', color: '#475569' },
});
