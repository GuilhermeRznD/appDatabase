import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_name";

export async function saveUserName(name: string) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, name);
  } catch (error) {
    console.error("Erro ao salvar nome:", error);
  }
}

export async function getUserName(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao carregar nome:", error);
    return null;
  }
}

export async function clearUserName() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar nome:", error);
  }
}
