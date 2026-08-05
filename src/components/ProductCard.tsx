import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Product } from "../schemas/product.schema";
import { colors } from "../utils/theme";
import { formatPrice } from "../utils/format";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductCard({ product, onPress, onEdit, onDelete }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category} · {product.brand}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={[styles.stock, product.stock === 0 && styles.stockEmpty]}>
            Stock : {product.stock}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
          <Text style={styles.editText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionBtn}>
          <Text style={styles.deleteText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
    minWidth: 160,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  category: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    textTransform: "capitalize",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  stock: {
    fontSize: 13,
    color: colors.success,
  },
  stockEmpty: {
    color: colors.danger,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    width: "100%",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  actionBtn: {
    paddingVertical: 4,
  },
  editText: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: "500",
  },
  deleteText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "500",
  },
});
