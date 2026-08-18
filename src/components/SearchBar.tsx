import { nw as searchNw } from "../store/search.store";
import { TextInput } from "react-native";
import { colors } from "../utils/theme";
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder ?? "Rechercher..."}
      placeholderTextColor={colors.textMuted}
      className={searchNw.searchInput}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
