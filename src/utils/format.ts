export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
