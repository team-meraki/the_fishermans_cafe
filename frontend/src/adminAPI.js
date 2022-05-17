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

    console.log(product)
    console.log(form_data)

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



/* =================================================
  --- ADMIN ABOUT THE CAFE / CAFE INFO API CALLS ---
=================================================== */

// GET
export const getCafeInfo = async () => {
  try {
    const response = await getApi('/api/cafeinfo/');
    return ({data:response});   
  } catch (error) {
    return ({error: error});
  }
}

export const editCafeInfo = async (editedInfo) => {
  try {
    let response;
    let form_data = new FormData();
    form_data.append("schedule", editedInfo.schedule);
    form_data.append("location", editedInfo.location);
    form_data.append("contact_number", editedInfo.contact_number);
    form_data.append("facebook", editedInfo.facebook);
    form_data.append("description", editedInfo.description);
    form_data.append("announcement", editedInfo.announcement);
    form_data.append("table_accommodation", editedInfo.table_accommodation);
    form_data.append("delivery_info", editedInfo.delivery_info);

    //console.log(editedInfo)
    //console.log(form_data)

    if (editedInfo.logo){
      form_data.append("logo", editedInfo.logo, editedInfo.logo.name);

      response = await putApi(
        '/api/cafeinfo/',
        form_data,
        { headers: {
             "Content-Type": "multipart/form-data",
         },}
       )
        
       //console.log('put')
       //console.log(response)
    }
    else {
      response = await patchApi(
        '/api/cafeinfo/',
        form_data,
        { headers: { 
             "Content-Type": "multipart/form-data",
         },}
      )

      //console.log('patch')
      //console.log(response)
    }
    //console.log(response)
     return ({data:response});   
   } catch (error) {
     return ({data: error.response});
  }
}

// export const editCafeInfo = async (editedInfo) => {
//   try {
//     const response = await putApi(
//       '/api/cafeinfo/',
//       editedInfo,
//     );
//     console.log(response)
//     return ({data:response});   
//   } catch (error) {
//     return ({error: error});
//   }
// }