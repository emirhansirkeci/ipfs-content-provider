const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

const max = 6999;
const url =
  "https://ipfs.io/ipfs/bafybeibo2oniklnbpcyrciqrserby3qxnug27mvzxan7z4xrsdway6pijq/";

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id || id > max || id < 1 || isNaN(id))
    return res.status(400).json({
      code: 400,
      message:
        "Invalid request. Please provide a valid id parameter between 1 and 6999.",
    });

  axios.get(url + id + ".json").then((response) => {
    res.json(response.data);
  });
});

app.use("/", (req, res) => {
  res.status(400).json({
    code: 400,
    message:
      "Invalid request. You must specify a valid id parameter in the URL.", // aynı şekilde burası için de kullanıcı dostu bir hata mesajı lazım
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
