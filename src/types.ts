export interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}
export interface FoodData {
  foods: FoodProps[]
}
