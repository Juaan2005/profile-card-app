import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@profile_card:data';

export async function saveProfileCard(data) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function getProfileCard() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearProfileCard() {
  await AsyncStorage.removeItem(KEY);
}

export default { saveProfileCard, getProfileCard, clearProfileCard };
