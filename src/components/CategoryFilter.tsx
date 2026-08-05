import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import type { Category } from "../schemas/product.schema";
import { colors } from "../utils/theme";

interface CategoryFilterProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <View style={styles.wrapper}>
      <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
        <Picker.Item label="Toutes les catégories" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.slug} label={cat.name} value={cat.slug} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  picker: {
    height: 48,
  },
});
