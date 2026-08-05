import { Tabs } from "expo-router";
import { Text } from "react-native";
import { colors } from "../utils/theme";

const icons = {
  dashboard: "📊",
  products: "📦",
  users: "👤",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarItemStyle: { flex: 1 },
        tabBarLabelStyle: { textAlign: "center" },
        tabBarIcon: () => (
          <Text style={{ fontSize: 18 }}>
            {icons[route.name as keyof typeof icons]}
          </Text>
        ),
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Tableau de bord",
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: "Produits",
        }}
      />

      <Tabs.Screen
        name="users"
        options={{
          title: "Utilisateurs",
        }}
      />
      <Tabs.Screen
        name="products/[id]"
        options={({ route }) => ({
          tabBarButton: () => null,
          title: "Détail produit",
        })}
      />
      <Tabs.Screen
        name="products/form"
        options={({ route }) => ({
          tabBarButton: () => null,
          title: (route.params as any)?.id ? "Modifier le produit" : "Ajouter un produit",
          presentation: "modal",
        })}
      />
      <Tabs.Screen
        name="users/[id]"
        options={({ route }) => ({
          tabBarButton: () => null,
          title: "Détail utilisateur",
        })}
      />
    </Tabs>
  );
}
