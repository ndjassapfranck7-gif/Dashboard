import { nw as searchNw } from "../store/search.store.tsx";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import type { Category } from "../schemas/product.schema";
interface CategoryFilterProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <View className={searchNw.filterWrapper}>
      <Picker selectedValue={value} onValueChange={onChange} className={searchNw.filterPicker}>
        <Picker.Item label="Toutes les catégories" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.slug} label={cat.name} value={cat.slug} />
        ))}
      </Picker>
    </View>
  );
}
