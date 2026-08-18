import { QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { queryClient } from "../../lib/Query.Client";
import { colors } from "../../utils/theme";

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
          tabBarLabelStyle: {
            textAlign: "center",
          },
        }}
      >
     
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarLabel: "Tableau de bord",
            tabBarIcon: () => (
              <AntDesign name="area-chart" size={30} color="black"/>
              
            ),
          }}
        />

        <Tabs.Screen
          name="products"
          options={{
            title: "Produits",
            tabBarLabel: "Produits",
            tabBarIcon: () => (
              <AntDesign name="product" size={30} color="black"/>
              
            ),
          }}
        />

        <Tabs.Screen
          name="users"
          options={{
            title: "Utilisateurs",
            tabBarLabel: "Utilisateurs",
            tabBarIcon: () => (
              <FontAwesome name="users" size={30} color="black"/>
               
            ),
          }}
        />

        <Tabs.Screen
          name="products/form"
          options={{
            title: "Ajouter un produit",
            tabBarLabel: "Ajouter un produit",
            tabBarIcon: () => (
              <Entypo name="add-to-list" size={30} color="black"/>

            ),
          }}
        />

        <Tabs.Screen
          name="products/[id]"
          options={{
            title: "Détails du produit",
            href: null,
          }}
        />

        <Tabs.Screen
          name="users/[id]"
          options={{
            title: "Détails utilisateur",
            href: null,
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}