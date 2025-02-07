interface Merch {
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
}

interface IMerch {
  _id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
}

export { Merch, IMerch };
