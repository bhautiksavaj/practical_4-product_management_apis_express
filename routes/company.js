const companyRoutes = (app, fs) => {
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
  app.get("/company", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const oldData = JSON.parse(data);
      res.send(oldData.company);
    });
  });

  // READ : using productName
  app.get("/company/:name", (req, res) => {
    readFile((data) => {
      const productName = req.params.name;
      var data1 = data.product.filter((item) => item.title == productName);

      var data2 = data.company.filter(
        (item, i) => data1[i] && item.id == data1[i].companyId
      );
      res.send(data2);
    }, true);
  });

  // READ PRODUCT: using companyName
  app.get("/getProductNameByCompany/:companyname", (req, res) => {
    readFile((data) => {
      const companyName = req.params.companyname;
      var data1 = data.company.filter((item) => item.name == companyName);

      var responseArray = data1.map((item, i) => {
        return item.product_ids.map((id) => {
          return data.product.filter((item) => item.id == id);
        });
      });
      res.send(responseArray.flat(3));
    }, true);
  });

  // CREATE
  app.post("/company", (req, res) => {
    readFile((data) => {
      const newUserId = Date.now().toString();
      data["company"].push({ ...req.body, id: newUserId });

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("New company inserted");
      });
    }, true);
  });

  // UPDATE
  app.put("/company/:id", (req, res) => {
    readFile((data) => {
      const productId = req.params.id;
      var data1 = data.company.map((item) =>
        item.id == productId ? { ...item, ...req.body } : item
      );
      data["company"] = data1;
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(req.body);
      });
    }, true);
  });

  // DELETE
  app.delete("/company/:id", (req, res) => {
    readFile((data) => {
      const productId = req.params.id;
      var data1 = data.company.filter((item) => item.id != productId);
      data["company"] = data1;
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("Company deleted : " + productId);
      });
    }, true);
  });
};

module.exports = companyRoutes;
