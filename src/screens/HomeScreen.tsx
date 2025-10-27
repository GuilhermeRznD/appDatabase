import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  saveUserName,
  getUserName,
  clearUserName,
} from "../storage/asyncStorageExample";
import {
  createTable,
  addUser,
  getUsers,
  clearUsers,
} from "../storage/sqliteExample";

export default function HomeScreen() {
  const [storedName, setStoredName] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await createTable();
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const name = await getUserName();
    const dbUsers = await getUsers();
    setStoredName(name);
    setUsers(dbUsers);
  };

  const handleSave = async () => {
    if (!inputName.trim()) return;
    await saveUserName(inputName);
    await addUser(inputName);
    setInputName("");
    await loadData();
  };

  const handleClearAsync = async () => {
    await clearUserName();
    setStoredName(null);
  };

  const handleClearSQLite = async () => {
    await clearUsers();
    setUsers([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
        
          <View style={styles.scroll}>
            {/* AsyncStorage Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔹 AsyncStorage</Text>
              <Text style={styles.sectionSubtitle}>
                Armazena o último nome salvo de forma simples (chave/valor).
              </Text>

              <Text style={styles.valueText}>
                Usuário armazenado:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {storedName || "Nenhum"}
                </Text>
              </Text>

              <TextInput
                placeholder="Digite um nome"
                value={inputName}
                onChangeText={setInputName}
                style={styles.input}
              />

              <View style={styles.buttonRow}>
                <Button title="Salvar" onPress={handleSave} />
                <Button color="#c00" title="Limpar" onPress={handleClearAsync} />
              </View>
            </View>

            {/* SQLite Header */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🧱 SQLite</Text>
              <Text style={styles.sectionSubtitle}>
                Banco de dados local para armazenar múltiplos usuários.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.userItem}>
              {item.id}: {item.name}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum usuário salvo.</Text>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Button
              color="#c00"
              title="Limpar Banco"
              onPress={handleClearSQLite}
            />
          </View>
        }
        
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  
  scroll: { paddingBottom: 10 }, 
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  userRow: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    elevation: 1,
  },
  userItem: {
    fontSize: 16,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});