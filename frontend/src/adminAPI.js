import { deleteApi, getApi, postApi, putApi, patchApi } from "./adminAxios";

/* =====================================
   --- ADMIN PRODUCTS API CALLS ---
  ===================================== */ 

// GET
export const getAllProducts = async () => {
 try {
   const response = await getApi('/api/product/');
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
   return ({data: error.response});
 }
}

// DELETE
export const deleteProduct = async (id) => {
  try {
    const response = await deleteApi('/api/product/' + id);
    return ({data:response});   
  } catch (error) {
    return ({data: error.response});
  }
}

 
// EDIT
export const updateProduct = async (product) => {
  try {
    let response;
    let form_data = new FormData();
    form_data.append("name", product.name);
    form_data.append("price", product.price);
    form_data.append("category", product.category);
    if (product.image){
      form_data.append("image", product.image, product.image.name);

      response = await putApi(
        '/api/product/' + product.id +'/',
        form_data,
        { headers: {
             "Content-Type": "multipart/form-data",
         },}
       )
    }
    else {
      response = await patchApi(
        '/api/product/' + product.id +'/',
        form_data,
        { headers: {
             "Content-Type": "multipart/form-data",
         },}
      )
    }
    
     return ({data:response});   
   } catch (error) {
     return ({data: error.response});
   }
 }

/* =====================================
   --- ADMIN GALLERY API CALLS ---
  ===================================== */ 

  // GET
export const getAllPhotos = async () => {
  try {
    const response = await getApi('/api/gallery/');
    return ({data:response});   
  } catch (error) {
    return ({error: error});
  }
 }

// POST
export const addPhoto = async (newPhoto) => {
  try {
    let form_data = new FormData();
      if (newPhoto)
        form_data.append("image", newPhoto, newPhoto.name);
 
    const response = await postApi(
      '/api/gallery/',
      form_data,
      { headers: {
           "Content-Type": "multipart/form-data",
       },}
     )
    return ({data:response});   
  } catch (error) {
    return ({data: error.response});
  }
 }
 
 // DELETE
 export const deletePhoto = async (id) => {
   try {
     const response = await deleteApi('/api/gallery/' + id + '/');
     return ({data:response});   
   } catch (error) {
     return ({data: error.response});
   }
 }
