import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Loader } from "../../../components/Loader";
import { StatsCard } from "../../../components/StatsCard";
import { useDashboardStats } from "../../../hooks/useDashboardStats";
import { colors } from "../../../utils/theme";

export function DashboardScreen() {
  const { stats, isLoading, error, refetch } = useDashboardStats();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Text style={styles.title}>Tableau de bord</Text>

      {isLoading && !stats && (
        <Loader label="Chargement du tableau de bord..." />
      )}
      {error && <ErrorMessage message={error} />}

      {stats && (
        <View style={styles.grid}>
          <StatsCard
            label="Produits"
            value={stats.totalProducts}
            icon="📦"
            color={colors.primary}
          />
          <StatsCard
            label="Utilisateurs"
            value={stats.totalUsers}
            icon="👤"
            color={colors.info}
          />
          <StatsCard
            label="Catégories"
            value={stats.totalCategories}
            icon="🏷️"
            color={colors.success}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  grid: {
    gap: 12,
  },
});

export default DashboardScreen;
