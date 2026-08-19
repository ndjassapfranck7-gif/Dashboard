import { QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, Tabs } from "expo-router";
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { queryClient } from "../../lib/Query.Client";
import { colors } from "../../utils/theme";

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar  style="dark"/>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0ea5e9",
          },
          headerTintColor: colors.card,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "black",
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