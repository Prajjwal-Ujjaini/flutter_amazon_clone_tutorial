export interface SignUpRequestData {
  name: string;
  email: string;
  password: string;
}

export interface SignIpRequestData {
  email: string;
  password: string;
}

export interface AddProductRequestData {
  name: string;
  description: string;
  quantity: string;
  images: string;
  category: string;
  price: string;
}
