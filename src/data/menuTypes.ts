export type Category = 'coffee' | 'dessert' | 'not-coffee';

export type MenuItem = {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  bonusPrice: number;
  image: string;
};
