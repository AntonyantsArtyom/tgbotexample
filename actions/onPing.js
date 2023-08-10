module.exports = {
   route: "/ping",
   action: async (req, res) => {
      res.send("Ping")
   },
}
