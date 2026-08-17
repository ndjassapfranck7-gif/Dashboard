import { nw as dashboardNw } from "../store/dashboard.store.tsx";
import { Text, View } from "react-native";
interface StatsCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
}

export function StatsCard({ label, value, icon, color }: StatsCardProps) {
  const iconStyle =
    color === "#0ea5e9" ? dashboardNw.statsIconInfo :
    color === "#10b981" ? dashboardNw.statsIconSuccess :
    dashboardNw.statsIconPrimary;

  return (
    <View className={dashboardNw.statsCard}>
      <View className={iconStyle}>
        <Text className={dashboardNw.statsIcon}>{icon}</Text>
      </View>
      <View>
        <Text className={dashboardNw.statsLabel}>{label}</Text>
        <Text className={dashboardNw.statsValue}>{value}</Text>
      </View>
    </View>
  );
}
