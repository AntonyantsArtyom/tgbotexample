const qr = require("qr-image")
const consts = require("../consts")

module.exports = {
   route: "/generateQR/:type/:id",
   action: async (req, res) => {
      const qrImage = qr.image(`${consts.site}/${req.params.type}/${req.params.id.replace(".png", "")}`, {
         size: 5,
         margin: 5,
      })
      res.type("png")
      qrImage.pipe(res)
   },
}
