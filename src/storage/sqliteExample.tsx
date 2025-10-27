import * as SQLite from "expo-sqlite";

// Abre (ou cria) o banco
const db = SQLite.openDatabaseSync("example.db");

// Cria a tabela se não existir
export async function createTable() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
  `);
}

// Adiciona um usuário
export async function addUser(name: string) {
  await db.runAsync("INSERT INTO users (name) VALUES (?);", [name]);
}

// Busca todos os usuários
export async function getUsers(): Promise<any[]> {
  const result = await db.getAllAsync("SELECT * FROM users;");
  return result;
}

// Limpa todos os usuários e reseta o contador de IDs
export async function clearUsers() {
  await db.execAsync("DELETE FROM users;"); // apaga registros
  await db.execAsync("DELETE FROM sqlite_sequence WHERE name='users';"); // reseta autoincrement
}
