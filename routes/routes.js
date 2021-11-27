// import other routes

const productRoutes = require("./product");
const companyRoutes = require("./company");
const sellerRoutes = require("./seller");

const appRouter = (app, fs) => {
  // default route
  app.get("/", (req, res) => {
    res.send("practical_4-product_management_apis_express");
  });

  // // other routes
  productRoutes(app, fs);
  companyRoutes(app, fs);
  sellerRoutes(app, fs);
};

module.exports = appRouter;
