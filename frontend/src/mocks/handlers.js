import { rest } from 'msw'

const infourl = "/api/cafeinfo"
let cafeinfo = {
  id : 1,
  logo : "http://127.0.0.1:8000/media/tfcafe_logo.png",
  location : "Sts. Peter and Paul Parish, Binaobao, Bantayan Island, Cebu, Philippines",
  about : "The Fisherman's Cafe is a coffee shop located within the compound of the St. Peter’s Parish, Binaobao, Bantayan Island.\r\nWe serve all-day breakfast, coffee, pastries, and more!",
  schedule : "Monday - Sunday\r\n9:00 AM - 7:00 PM",
  email : "tfcafe@gmail.com",
  facebook : "https://www.facebook.com/thefishermanscafe/",
  contact_number : '09123456789'
}

export const handlers = [
    rest.get(infourl, (req, res, ctx) => {
      return res(ctx.delay(), ctx.status(200), ctx.json(cafeinfo))
    }),

    rest.put(infourl, (req, res, ctx) => {
      cafeinfo = req.body;
      return res(ctx.delay(), ctx.status(200), ctx.json(cafeinfo))
    }),

    rest.post(infourl, (req, res, ctx) => {
      return res(ctx.status(405))
    }),

    rest.delete(infourl, (req, res, ctx) => {
      return res(ctx.status(405))
    }),
  ]