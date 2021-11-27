const sellerRoutes = (app, fs) => {
  // variables
  const dataPath = "./data/data.json";

  // helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }
      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // READ
  app.get("/seller", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const oldData = JSON.parse(data);
      res.send(oldData.seller);
    });
  });

  // READ : using productName
  app.get("/seller/:name", (req, res) => {
    readFile((data) => {
      const productName = req.params.name;
      var data1 = data.product.filter((item) => item.title == productName);

      var responseArray = data1.map((item, i) => {
        return item.sellerId.map((id) => {
          return data.seller.filter((item) => item.id == id);
        });
      });
      res.send(responseArray.flat(3));
    }, true);
  });

  // READ PRODUCT: using sellername
  app.get("/getProductNameBySeller/:sellername", (req, res) => {
    readFile((data) => {
      const sellerName = req.params.sellername;
      var data1 = data.seller.filter((item) => item.name == sellerName);

      var responseArray = data1.map((item, i) => {
        return item.product_ids.map((id) => {
          return data.product.filter((item) => item.id == id);
        });
      });
      res.send(responseArray.flat(3));
    }, true);
  });

  // CREATE
  app.post("/seller", (req, res) => {
    readFile((data) => {
      const newUserId = Date.now().toString();
      data["seller"].push({ ...req.body, id: newUserId });

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("New seller inserted");
      });
    }, true);
  });

  // UPDATE
  app.put("/seller/:id", (req, res) => {
    readFile((data) => {
      const productId = req.params.id;
      var data1 = data.seller.map((item) =>
        item.id == productId ? { ...item, ...req.body } : item
      );
      data["seller"] = data1;
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(req.body);
      });
    }, true);
  });

  // DELETE
  app.delete("/seller/:id", (req, res) => {
    readFile((data) => {
      const productId = req.params.id;
      var data1 = data.seller.filter((item) => item.id != productId);
      data["seller"] = data1;
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("Seller deleted : " + productId);
      });
    }, true);
  });
};

module.exports = sellerRoutes;
