import { getApi, postApi } from "./adminAxios";

// GET
export const getAllProducts = async () => {
 try {
   const response = await getApi('/api/product/');
    console.log(response);
   return ({data:response});   
 } catch (error) {
   return ({error: error});
 }
}

// POST
export const addProduct = async (product) => {
 try {
  let form_data = new FormData();
    if (product.image)
        form_data.append("image", product.image, product.image.name);
    form_data.append("name", product.name);
    form_data.append("price", product.price);
    form_data.append("category", product.category);



   const response = await postApi(
     '/api/product/',
     form_data,
     { headers: {
          "Content-Type": "multipart/form-data",
      },}
    )
   // console.log(response);
   return ({data:response});   
 } catch (error) {
   return ({error: error});
 }
}
