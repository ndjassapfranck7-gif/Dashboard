import { nw as commonNw } from "../../../store/common.store.tsx";import { nw as listNw } from "../../../store/list.store.tsx";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Loader } from "../../../components/Loader";
import { SearchBar } from "../../../components/SearchBar";
import { UserCard } from "../../../components/UserCard";
import { useUsers } from "../../../hooks/useUsers";
import { useDebounce } from "../../../utils/useDebounce";
export function UsersScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { users, isLoading, error } = useUsers({ search: debouncedSearch || undefined });

  return (
    <View className={commonNw.screen}>
      <View className="p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un utilisateur..." />
      </View>
      {isLoading && <Loader label="Chargement des utilisateurs..." />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName={listNw.list}
          ListEmptyComponent={<Text className={listNw.empty}>Aucun utilisateur trouvé.</Text>}
          renderItem={({ item }) => (
            <UserCard user={item} onPress={() => router.push({ pathname: "/users/[id]", params: { id: item.id } })} />
          )}
        />
      )}
    </View>
  );
}
export default UsersScreen;
