import Client from "shopify-buy";

export const shopifyClient = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
  domain: process.env.SHOPIFY_STORE_DOMAIN!,
});

export const parseShopifyResponse = (response: any) =>
  JSON.parse(JSON.stringify(response));

export const AddToCart = (id: string, variant: string) => {
  let items: any = JSON.parse(localStorage.getItem("items")!);

  if (items) {
    if (items.some((storedItem: any) => storedItem.id === id)) {
      const index = items.findIndex((storedItem: any) => storedItem.id === id);
      items[index].quantity += 1;
    } else {
      items.push({ id: id, variant: variant, quantity: 1 });
    }

    localStorage.setItem("items", JSON.stringify(items));
  } else {
    let list: any = [];
    list.push({ id: id, variant: variant, quantity: 1 })
    localStorage.setItem("items", JSON.stringify(list));
  }
};

export const SubtractFromCart = (id: string) => {
  let items: any = JSON.parse(localStorage.getItem("items")!);
  if(items){
    if (items.some((storedItem: any) => storedItem.id === id)) {
      const index = items.findIndex((storedItem: any) => storedItem.id === id);
      items[index].quantity -= 1;

      if(items[index].quantity < 1)
        items.splice(index, 1)
    } 
  }
  localStorage.setItem("items", JSON.stringify(items));
}

export const ClearCart = () => {
  localStorage.clear();
};
