import { QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { queryClient } from "../../lib/Query.Client";
import { colors } from "../../utils/theme";

const icons: Record<string, string> = {
  index: "📊",
  products: "📦",
  users: "👤",
  "products/form": "📋",
};

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            justifyContent: "center",
          },
          tabBarItemStyle: {
            flex: 0,
            minWidth: 100,
          },
          tabBarLabelStyle: { textAlign: "center" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarLabel: "Tableau de bord",
            tabBarIcon: () => (
              <Text style={{ fontSize: 18 }}>{icons.index}</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Produit",
            tabBarLabel: "Produit",
            tabBarIcon: () => (
              <Text style={{ fontSize: 18 }}>{icons.products}</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: "Utilisateur",
            tabBarLabel: "Utilisateur",
            tabBarIcon: () => (
              <Text style={{ fontSize: 18 }}>{icons.users}</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="products/form"
          options={{
            title: "Ajouter un produit",
            tabBarLabel: "Ajouter un produit",
            tabBarIcon: () => (
              <Text style={{ fontSize: 18 }}>{icons["products/form"]}</Text>
            ),
          }}
        />
        <Tabs.Screen
          name= "products/[id]"
          options={{
            title: "Details du produit",
            href: null,
          }}
        />
        <Tabs.Screen
          name= "users/[id]"
          options={{
            title: "Details du produit",
            href: null,
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
