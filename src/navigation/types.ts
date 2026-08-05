export type ProductsStackParamList = {
  ProductsList: undefined;
  ProductDetail: { id: number };
  ProductForm: { id?: number };
};

export type UsersStackParamList = {
  UsersList: undefined;
  UserDetail: { id: number };
};

export type RootTabParamList = {
  Dashboard: undefined;
  Products: undefined;
  Users: undefined;
};
