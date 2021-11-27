const productRoutes = (app, fs) => {
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
  app.get("/product", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const oldData = JSON.parse(data);
      res.send(oldData.product);
    });
  });

  // CREATE
  app.post("/product", (req, res) => {
    readFile((data) => {
      const newUserId = Date.now().toString();
      data["product"].push({ ...req.body, id: newUserId });

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("New product inserted");
      });
    }, true);
  });

  // UPDATE
  app.put("/product/:id", (req, res) => {
    readFile((data) => {
      const productId = req.params.id;
      var data1 = data.product.map((item) =>
        item.id == productId ? { ...item, ...req.body } : item
      );
      data["product"] = data1;
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(req.body);
      });
    }, true);
  });

  // DELETE
  app.delete("/product/:id", (req, res) => {
    readFile((data) => {
      const productId = req.params.id;
      var data1 = data.product.filter((item) => item.id != productId);
      data["product"] = data1;
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("Product deleted : " + productId);
      });
    }, true);
  });
};

module.exports = productRoutes;
