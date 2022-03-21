import { rest } from 'msw'

const infoURL = "/api/cafeinfo"
const productURL = "/api/product"
const galleryURL = "/api/gallery"
const testimonialURL = "/api/testimonial"

let cafeinfo = {
  id : 1,
  logo : "http://127.0.0.1:8000/media/logo/tfcafe_logo.png",
  location : "Sts. Peter and Paul Parish, Binaobao, Bantayan Island, Cebu, Philippines",
  about : "The Fisherman's Cafe is a coffee shop located within the compound of the St. Peter’s Parish, Binaobao, Bantayan Island.\r\nWe serve all-day breakfast, coffee, pastries, and more!",
  schedule : "Monday - Sunday\r\n9:00 AM - 7:00 PM",
  email : "tfcafe@gmail.com",
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

export const handlers = [
    rest.get(infoURL, (req, res, ctx) => {
      return res(ctx.delay(), ctx.status(200), ctx.json(cafeinfo))
    }),

    rest.put(infoURL, (req, res, ctx) => {
      cafeinfo = req.body;
      return res(ctx.delay(), ctx.status(200), ctx.json(cafeinfo))
    }),

    rest.post(infoURL, (req, res, ctx) => {
      return res(ctx.status(405))
    }),

    rest.delete(infoURL, (req, res, ctx) => {
      return res(ctx.status(405))
    }),

    rest.get(productURL, (req, res, ctx) => {
      return res(ctx.delay(), ctx.status(200), ctx.json(products))
    }),

    rest.get(productURL+'/:id', (req, res, ctx) => {
      const { id } = req.params
      const product = products.find(prod => {
        return prod.id === id
      })
      if (product)
        return res(ctx.delay(), ctx.status(200), ctx.json(product))
      else
        return res(ctx.delay(), ctx.status(404))
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
        return res(ctx.delay(), ctx.status(200), ctx.json(product))
      else
        return res(ctx.delay(), ctx.status(404))
    }),

    rest.post(productURL, (req, res, ctx) => {
      const { product } = req.body;
      products.push(product)
      return res(ctx.delay(), ctx.status(201), ctx.json(product))
    }),

    rest.delete(productURL+'/:id', (req, res, ctx) => {
      const product = products.find(prod => {
        return prod.id === id
      })
      if (product)
        return res(ctx.delay(), ctx.status(200))
      else
        return res(ctx.delay(), ctx.status(404))
    }),

    rest.get(testimonialURL, (req, res, ctx) => {
      return res(ctx.delay(), ctx.status(200), ctx.json(testimonials))
    }),

    rest.post(testimonialURL, (req, res, ctx) => {
      const testimonial = req.body;
      testimonials.push(testimonial)
      return res(ctx.delay(), ctx.status(201), ctx.json(testimonial))
    }),
]