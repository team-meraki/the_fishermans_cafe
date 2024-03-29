import { rest } from 'msw'

const baseURL = "https://cafe-backend.azurewebsites.net"
const infoURL = baseURL + "/api/cafeinfo"
const productURL = baseURL + "/api/product"
const galleryURL = baseURL + "/api/gallery"
const testimonialURL = baseURL + "/api/testimonial"
const recaptchaURL = baseURL + "/api/recaptcha"
const featuredProductURL = baseURL + "/api/featured-product"
const featuredReviewURL = baseURL + "/api/featured-review"

let cafeinfo = {
  id : 1,
  logo : "http://127.0.0.1:8000/media/logo/tfcafe_logo.png",
  location : "Sts. Peter and Paul Parish, Binaobao, Bantayan Island, Cebu, Philippines",
  description: "This is a description",
  announcement: "This is an announcement",
  table_accommodation: "This provides table accommodation",
  delivery_info: "This provides delivery info",
  schedule : "Monday - Sunday\r\n9:00 AM - 7:00 PM",
  facebook : "https://www.facebook.com/thefishermanscafe/",
  contact_number : '09123456789'
}

let products = [{
  id : 1,
  name : "product1",
  category : "meal",
  price : "999.00",
  image : "http://127.0.0.1:8000/media/products/product1.png",
  last_modified : "2022-03-20T04:16:19.450471Z"
}, {
  id : 2,
  name : "product2",
  category : "drink",
  price : "25.00",
  image : "http://127.0.0.1:8000/media/products/product2.png",
  last_modified : "2022-03-20T04:15:54.579776Z"
}, {
  id : 3,
  name : "product3",
  category : "meal",
  price : "199.25",
  image : "http://127.0.0.1:8000/media/products/product3.png",
  last_modified : "2022-03-20T04:16:19.450471Z"
}, {
  id : 4,
  name : "product4",
  category : "drink",
  price : "50.00",
  image : "http://127.0.0.1:8000/media/products/product4.png",
  last_modified : "2022-03-20T04:15:54.579776Z"
}, {
  id : 5,
  name : "product5",
  category : "dessert",
  price : "199.00",
  image : "http://127.0.0.1:8000/media/products/product5.png",
  last_modified : "2022-03-20T04:15:54.579776Z"
}]

let testimonials = [{
  id : 1,
  name : "Person1",
  email : "person1@email.com",
  message : "Good service!"
}, {
  id : 2,
  name : "Person2",
  email : "person2@email.com",
  message : "Well done!"
}, {
  id : 3,
  name : "Person3",
  email : "person3@email.com",
  message : "We'll come back for more!"
}]

let gallery = [{
  id : 1,
  image : "http://127.0.0.1:8000/media/gallery/interior1.png"
}, {
  id : 2,
  image : "http://127.0.0.1:8000/media/gallery/interior2.png"
}, {
  id : 3,
  image : "http://127.0.0.1:8000/media/gallery/interior3.png"
}, {
  id : 4,
  image : "http://127.0.0.1:8000/media/gallery/exterior1.png"
}]

let featured_product = [{
  id : 1,
  product_id : 1,
  product : {
    id : 1,
    name : "product1",
    category : "meal",
    price : "999.00",
    image : "http://127.0.0.1:8000/media/products/product1.png",
    last_modified : "2022-03-20T04:16:19.450471Z"
  }
}, {
  id : 2,
  product_id : 2,
  product : {
    id : 2,
    name : "product2",
    category : "drink",
    price : "25.00",
    image : "http://127.0.0.1:8000/media/products/product2.png",
    last_modified : "2022-03-20T04:15:54.579776Z"
  }
}, {
  id : 3,
  product_id : 3,
  product : {
    id : 3,
    name : "product3",
    category : "meal",
    price : "199.25",
    image : "http://127.0.0.1:8000/media/products/product3.png",
    last_modified : "2022-03-20T04:16:19.450471Z"
  }
}, {
  id : 4,
  product_id : 4,
  product : {
    id : 4,
    name : "product4",
    category : "drink",
    price : "50.00",
    image : "http://127.0.0.1:8000/media/products/product4.png",
    last_modified : "2022-03-20T04:15:54.579776Z"
  }
}]

let featured_review = [{
  id : 1,
  review_id : 1,
  review : {
    id : 1,
    name : "Person1",
    email : "person1@email.com",
    message : "Good service!"
  }
}, {
  id : 2,
  review_id : 2,
  review : {
    id : 2,
    name : "Person2",
    email : "person2@email.com",
    message : "Well done!"
  }
}]

export const handlers = [
    rest.get(infoURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(cafeinfo))
    }),

    rest.put(infoURL, (req, res, ctx) => {
      cafeinfo = req.body;
      return res(ctx.status(200), ctx.json(cafeinfo))
    }),

    rest.post(infoURL, (req, res, ctx) => {
      return res(ctx.status(405))
    }),

    rest.delete(infoURL, (req, res, ctx) => {
      return res(ctx.status(405))
    }),

    rest.get(productURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(products))
    }),

    rest.get(productURL+'/:id', (req, res, ctx) => {
      const { id } = req.params
      const product = products.find(prod => {
        return prod.id === id
      })
      if (product)
        return res(ctx.status(200), ctx.json(product))
      else
        return res(ctx.status(404))
    }),

    rest.put(productURL+'/:id', (req, res, ctx) => {
      const { id } = req.params
      for (let product  of products) {
        if (product.id === id) {
          product = request.body
          break;
        }
      }
      const product = products.find(prod => {
        return prod.id === id
      })
      if (product)
        return res(ctx.status(200), ctx.json(product))
      else
        return res(ctx.status(404))
    }),

    rest.post(productURL, (req, res, ctx) => {
      const { product } = req.body;
      products.push(product)
      return res(ctx.status(201), ctx.json(product))
    }),

    rest.delete(productURL+'/:id', (req, res, ctx) => {
      const product = products.find(prod => {
        return prod.id === id
      })
      if (product)
        return res(ctx.status(200))
      else
        return res(ctx.status(404))
    }),

    rest.get(testimonialURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(testimonials))
    }),

    rest.post(testimonialURL, (req, res, ctx) => {
      const testimonial = req.body;
      testimonials.push(testimonial)
      return res(ctx.status(201), ctx.json(testimonial))
    }),

    rest.post(recaptchaURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ success : true }))
    }),

    rest.get(galleryURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(gallery))
    }),

    rest.get(featuredProductURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(featured_product))
    }),

    rest.get(featuredReviewURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(featured_review))
    }),
]