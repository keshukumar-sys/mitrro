export interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  images: {
    url: string;
    public_id?: string;
  }[];
}
