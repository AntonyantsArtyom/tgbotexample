const User = require("../models/User")
const bot = require("../bot")
const mailer = require("../mailer")

module.exports = {
   route: "/deliveryMessage/:id",
   action: async (req, res) => {
      console.log(1)
      try {
         const basket = req.body.basket
         let basketText = ""
         basket.forEach((product) => (basketText += product.name + " " + product.count + "\n"))
         await mailer({
            from: "Green Fox <greenhungryfox@mail.ru>",
            to: "greenhungryfox@mail.ru>",
            subject: "заказ",
            html: `<strong>адрес: </strong>${req.body.adres}<br/><strong>телефон: </strong>${req.body.phone}<br/><strong>время: </strong>${req.body.time}<br/><strong>дополнительно: </strong>${req.body.additional}<br/><br/><pre>${basketText}</pre></br><strong>цена с учетом бонусов: </strong>${req.body.price}`,
         })
         await User.updateOne(
            { id: req.params.id },
            {
               weekPromotion: 0,
               friendPromotion: 0,
            }
         )
         await bot.sendMessage(
            await User.findOne({ id: req.params.id }).then((data) => data.chat),
            `<b>заказ получен</b>\n\nв течении 5 минут мы позвоним для его подтверждения\n\n<b>бонусы были списаны</b>\n\n<b>цена с учетом бонусов</b>\n${req.body.price} рублей`,
            {
               parse_mode: "HTML",
               reply_markup: {
                  inline_keyboard: [[{ text: "✅ ок", callback_data: "delete_message" }]],
               },
            }
         )
         res.status(200).json({ status: "correct" })
      } catch (error) {
         console.log(error)
      }
   },
}
