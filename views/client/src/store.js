import { makeAutoObservable } from "mobx"
import axios from "axios"

class store {
   server = "http://45.87.247.56:3443"
   id = window.Telegram.WebApp.initDataUnsafe.user.id
   loading = true
   deliveryData = {
      adres: "",
      phone: "",
      time: "",
      additional: "",
   }
   promotions = {
      week: null,
      friend: null,
   }
   products = []
   basket = []
   error = false
   constructor() {
      makeAutoObservable(this)
   }
   setErrorStatus(status) {
      this.error = status
   }
   async getProductsAndBasket(showLoading) {
      this.loading = showLoading
      const products = await axios.get(this.server + "/products").then((res) => res.data)
      this.basket.forEach((product) => (products.find((p) => p.name == product.name).count = product.count))
      this.products = products
      this.loading = false
   }
   async getPromotions() {
      this.promotions = await axios.get(this.server + "/promotions/" + this.id).then((res) => res.data)
   }
   async updateBasket(type, payload) {
      if (type == "ADD|UPGRADE") {
         const product = payload
         if (!this.basket.find((p) => p.id == product.id)) this.basket.push(product)
         else this.basket.forEach((p) => p.id == product.id && (p.count = product.count))
      }
      if (type == "DELETE") {
         const id = payload
         this.basket = this.basket.filter((p) => p.id != id)
      }
      this.products.forEach((product) => (product.count = undefined))
      this.basket.forEach((product) => (this.products.find((p) => p.name == product.name).count = product.count))
      this.products = [...this.products]
      this.basket = [...this.basket]
   }
   basketPrice() {
      let price = 0
      this.basket.forEach((product) => (price += product.price * product.count))
      return price
   }
   basketPriceWithPromotions() {
      let price = 0
      this.basket.forEach((product) => (price += product.price * product.count))
      price = Math.max(0, (price * (100 - this.promotions.friend)) / 100 - this.promotions.week)
      price = Math.ceil(price)
      return price
   }
   setDeliveryData(property, data) {
      this.deliveryData[property] = data
   }
   async finishDelivery() {
      this.loading = true
      await axios.post(this.server + "/deliveryMessage/" + this.id, {
         ...this.deliveryData,
         price: this.basketPriceWithPromotions(),
         basket: this.basket,
      })
      this.loading = false
   }
}

export default new store()
