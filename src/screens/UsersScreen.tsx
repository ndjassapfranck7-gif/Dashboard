import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { SearchBar } from "../components/SearchBar";
import { UserCard } from "../components/UserCard";
import { useUsers } from "../hooks/useUsers";
import { colors } from "../utils/theme";
import { useDebounce } from "../utils/useDebounce";

export function UsersScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { users, isLoading, error } = useUsers({
    search: debouncedSearch || undefined,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un utilisateur..."
        />
      </View>

      {isLoading && <Loader label="Chargement des utilisateurs..." />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Aucun utilisateur trouvé.</Text>
          }
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onPress={() =>
                router.push({
                  pathname: "/users/[id]",
                  params: { id: item.id },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  empty: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: 40,
  },
});
