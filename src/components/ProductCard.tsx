import { nw as productNw } from "../store/product.store.tsx";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Product } from "../schemas/product.schema";
import { formatPrice } from "../utils/format";
interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductCard({ product, onPress, onEdit, onDelete }: ProductCardProps) {
  return (
    <TouchableOpacity className={productNw.productCard} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: product.thumbnail }} className={productNw.productImage} />
      <View className={productNw.productInfo}>
        <Text className={productNw.productTitle} numberOfLines={1}>{product.title}</Text>
        <Text className={productNw.productCategory}>{product.category} · {product.brand}</Text>
        <View className={productNw.productRow}>
          <Text className={productNw.productPrice}>{formatPrice(product.price)}</Text>
          <Text className={product.stock === 0 ? productNw.productStockEmpty : productNw.productStock}>
            Stock : {product.stock}
          </Text>
        </View>
      </View>
      <View className={productNw.productActions}>
        <TouchableOpacity onPress={onEdit} className={productNw.actionButton}>
          <Text className={productNw.editText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} className={productNw.actionButton}>
          <Text className={productNw.deleteText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
