import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/colors';
import { getProfileCard } from '../services/storage';

export default function HomeScreen({ navigation }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reload the saved card every time this screen gains focus,
  // so it reflects changes made on ProfileCardScreen.
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      async function load() {
        setLoading(true);
        const data = await getProfileCard();
        if (isMounted) {
          setCard(data);
          setLoading(false);
        }
      }
      load();
      return () => {
        isMounted = false;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileCard</Text>
      <Text style={styles.subtitle}>
        Kartu profil dengan foto kamera dan lokasi GPS
      </Text>

      {card ? (
        <View style={styles.card}>
          {card.photoUri ? (
            <Image source={{ uri: card.photoUri }} style={styles.photo} />
          ) : (
            <View style={[styles.photo, styles.photoPlaceholder]}>
              <Text style={{ fontSize: 40 }}>🙂</Text>
            </View>
          )}
          <Text style={styles.name}>{card.name}</Text>
          {card.locationLabel ? (
            <Text style={styles.location}>📍 {card.locationLabel}</Text>
          ) : null}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Belum ada profil tersimpan</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfileCard')}
      >
        <Text style={styles.buttonText}>
          {card ? 'Edit Profil' : 'Buat Profil'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 28,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  photoPlaceholder: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 20, fontWeight: '700', color: colors.text },
  location: { fontSize: 13, color: colors.textLight, marginTop: 8, textAlign: 'center' },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: { color: colors.textLight, fontSize: 14 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
