import { Alert } from "react-native";

/** Affiche une boîte de confirmation native avant une action destructrice */
export function confirmAction(title: string, message: string, onConfirm: () => void) {
  Alert.alert(title, message, [
    { text: "Annuler", style: "cancel" },
    { text: "Supprimer", style: "destructive", onPress: onConfirm },
  ]);
}
