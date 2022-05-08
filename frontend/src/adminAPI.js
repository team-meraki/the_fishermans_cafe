import { deleteApi, getApi, postApi, putApi } from "./adminAxios";

/* =====================================
   --- ADMIN PRODUCTS API CALLS ---
  ===================================== */ 

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
   return ({data:response});   
 } catch (error) {
   return ({error: error});
 }
}

// DELETE
export const deleteProduct = async (id) => {
  try {
    const response = await deleteApi('/api/product/' + id);
     console.log(response);
    return ({data:response});   
  } catch (error) {
    return ({data: error.response});
  }
}

 
// EDIT
export const updateProduct = async (id, product) => {
  try {
    let form_data = new FormData();
      if (product.image)
          form_data.append("image", product.image, product.image.name);
      form_data.append("name", product.name);
      form_data.append("price", product.price);
      form_data.append("category", product.category);
  
     const response = await putApi(
       '/api/product/' + id +'/',
       form_data,
       { headers: {
            "Content-Type": "multipart/form-data",
        },}
      )
     return ({data:response});   
   } catch (error) {
     return ({data: error});
   }
 }

/* =====================================
   --- ADMIN GALLERY API CALLS ---
  ===================================== */ 

  // GET
export const getAllPhotos = async () => {
  try {
    const response = await getApi('/api/gallery/');
     console.log(response);
    return ({data:response});   
  } catch (error) {
    return ({error: error});
  }
 }

// POST
export const addPhoto = async (gallery) => {
  try {
   let form_data = new FormData();
     if (gallery.image)
         form_data.append("image", gallery.image, gallery.image.name);
 
    const response = await postApi(
      '/api/gallery/',
      form_data,
      { headers: {
           "Content-Type": "multipart/form-data",
       },}
     )
    return ({data:response});   
  } catch (error) {
    return ({error: error});
  }
 }
 
 // DELETE
 export const deletePhoto = async (id) => {
   try {
     const response = await deleteApi('/api/gallery/' + id);
      console.log(response);
     return ({data:response});   
   } catch (error) {
     return ({data: error.response});
   }
 }
