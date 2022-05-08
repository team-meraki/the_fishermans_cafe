import { getApi, postApi } from "./adminAxios";

// GET
export const getAllProducts = async () => {
 try {
   const response = await getApi('/api/product/');
   // console.log(response);
   return ({data:response});   
 } catch (error) {
   return ({error: error});
 }
}

// POST
export const addProduct = async (product) => {
 try {
   const response = await postApi('/api/product/', {
    name: product.name,
    category: product.category, 
    price: product.price, 
    //image: product.image
   });
   // console.log(response);
   return ({data:response});   
 } catch (error) {
   return ({error: error});
 }
}
