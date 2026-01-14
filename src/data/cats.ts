export type Cat = {
  id: number;
  name: string;
  url: string;
};

export const cats: Cat[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Cat ${i}`,
  url: `https://cataas.com/cat?random=${i}`,
}));
