const qr = require("qr-image")

module.exports = {
   route: "/generateQR/:type/:id",
   action: async (req, res) => {
      const qrImage = qr.image(`http://localhost4000/${req.params.type}/${req.params.id.replace(".png", "")}`, {
         size: 5,
         margin: 5,
      })
      res.type("png")
      qrImage.pipe(res)
   },
}
