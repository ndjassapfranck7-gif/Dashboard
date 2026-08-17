import { nw as commonNw } from "../../../store/common.store";
import { nw as dashboardNw } from "../../../store/dashboard.store";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Loader } from "../../../components/Loader";
import { StatsCard } from "../../../components/StatsCard";
import { useDashboardStats } from "../../../hooks/useDashboardStats";
import { colors } from "../../../utils/theme";
export function DashboardScreen() {
  const { stats, isLoading, error, refetch } = useDashboardStats();

  return (
    <ScrollView
      className={commonNw.screen}
      contentContainerClassName={commonNw.content}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
    >
      <Text className={commonNw.title}>Tableau de bord</Text>
      {isLoading && !stats && <Loader label="Chargement du tableau de bord..." />}
      {error && <ErrorMessage message={error} />}
      {stats && (
        <View className={dashboardNw.dashboardGrid}>
          <StatsCard label="Produits" value={stats.totalProducts} icon="📦" color={colors.primary} />
          <StatsCard label="Utilisateurs" value={stats.totalUsers} icon="👤" color={colors.info} />
          <StatsCard label="Catégories" value={stats.totalCategories} icon="🏷️" color={colors.success} />
        </View>
      )}
    </ScrollView>
  );
}
export default DashboardScreen;
