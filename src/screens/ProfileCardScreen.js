import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import colors from '../constants/colors';
import { saveProfileCard } from '../services/storage';

export default function ProfileCardScreen({ navigation }) {
  const [name, setName] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationLabel, setLocationLabel] = useState('');
  const [error, setError] = useState('');
  const [cameraDenied, setCameraDenied] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleTakePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      setCameraDenied(true);
      Alert.alert(
        'Izin Kamera Ditolak',
        'ProfileCard membutuhkan akses kamera untuk mengambil foto profil. Aktifkan izin kamera di pengaturan HP.'
      );
      return;
    }

    setCameraDenied(false);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function handleGetLocation() {
    setGettingLocation(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setLocationDenied(true);
      setGettingLocation(false);
      Alert.alert(
        'Izin Lokasi Ditolak',
        'ProfileCard membutuhkan akses lokasi untuk menampilkan koordinat kamu. Aktifkan izin lokasi di pengaturan HP.'
      );
      return;
    }

    setLocationDenied(false);

    try {
      const position = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setLocationLabel(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    } catch (e) {
      Alert.alert('Gagal Mengambil Lokasi', 'Coba lagi dalam beberapa saat.');
    } finally {
      setGettingLocation(false);
    }
  }

  function validate() {
    if (!name.trim()) return 'Nama tidak boleh kosong.';
    if (name.trim().length < 3) return 'Nama minimal 3 karakter.';
    if (!photoUri) return 'Ambil foto profil terlebih dahulu.';
    return null;
  }

  async function handleSave() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setSaving(true);

    await saveProfileCard({
      name: name.trim(),
      photoUri,
      location,
      locationLabel,
      savedAt: new Date().toISOString(),
    });

    setSaving(false);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Buat / Edit ProfileCard</Text>

      <View style={styles.photoWrap}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <View style={[styles.photo, styles.photoPlaceholder]}>
            <Text style={{ fontSize: 40 }}>📷</Text>
          </View>
        )}
        <TouchableOpacity style={styles.secondaryButton} onPress={handleTakePhoto}>
          <Text style={styles.secondaryButtonText}>
            {photoUri ? 'Ambil Ulang Foto' : 'Ambil Foto'}
          </Text>
        </TouchableOpacity>
        {cameraDenied ? (
          <Text style={styles.warnText}>⚠️ Izin kamera ditolak.</Text>
        ) : null}
      </View>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama kamu"
        value={name}
        onChangeText={(v) => {
          setName(v);
          if (error) setError('');
        }}
      />

      <Text style={styles.label}>Lokasi</Text>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleGetLocation}
        disabled={gettingLocation}
      >
        {gettingLocation ? (
          <ActivityIndicator color={colors.primaryDark} />
        ) : (
          <Text style={styles.secondaryButtonText}>
            {locationLabel ? `📍 ${locationLabel}` : 'Ambil Lokasi Saat Ini'}
          </Text>
        )}
      </TouchableOpacity>
      {locationDenied ? (
        <Text style={styles.warnText}>⚠️ Izin lokasi ditolak.</Text>
      ) : null}

      {error ? <Text style={styles.errorText}>⚠️ {error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
        {saving ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>Simpan Profil</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 20 },
  photoWrap: { alignItems: 'center', marginBottom: 20 },
  photo: { width: 140, height: 140, borderRadius: 70, marginBottom: 12 },
  photoPlaceholder: {
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  label: { fontSize: 13, color: colors.textLight, marginBottom: 6, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: { color: colors.primaryDark, fontSize: 14, fontWeight: '600' },
  warnText: { color: colors.danger, fontSize: 12, marginTop: 8 },
  errorText: { color: colors.danger, marginTop: 16, fontSize: 13 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
