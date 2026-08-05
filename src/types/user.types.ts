export interface UserAddress {
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface UserCompany {
  name: string;
  title: string;
  department: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  address: UserAddress;
  company: UserCompany;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserQueryParams {
  search?: string;
  limit?: number;
  skip?: number;
}
