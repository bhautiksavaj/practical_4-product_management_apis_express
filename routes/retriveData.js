// const sellerRoutes = (app, fs) => {
//     // variables
//     const dataPath = "./data/data.json";

//     // helper methods
//     const readFile = (
//       callback,
//       returnJson = false,
//       filePath = dataPath,
//       encoding = "utf8"
//     ) => {
//       fs.readFile(filePath, encoding, (err, data) => {
//         if (err) {
//           throw err;
//         }
//         callback(returnJson ? JSON.parse(data) : data);
//       });
//     };

//     // READ
//     app.get("/seller", (req, res) => {
//       fs.readFile(dataPath, "utf8", (err, data) => {
//         if (err) {
//           throw err;
//         }
//         const oldData = JSON.parse(data);
//         res.send(oldData.seller);
//       });
//     });

//   module.exports = sellerRoutes;
