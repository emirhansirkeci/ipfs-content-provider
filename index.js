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

app.get("/:id", async (req, res) => {
  let { id } = req.params;

  if (id.endsWith(".json")) id = id.split(".json")[0];

  if (!id || id > max || id < 1 || isNaN(id))
    return res.status(400).json({
      code: 400,
      message:
        "Invalid request. Please provide a valid id parameter between 1 and 6999.",
    });

  try {
    const response = await axios.get(url + id + ".json");
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching data from url:", err.message);

    res.status(500).json({
      code: 500,
      message: "Internal Server Error. Failed to fetch data from IPFS.",
    });
  }
});

app.use("*", (req, res) => {
  res.status(400).json({
    code: 400,
    message:
      "Invalid request. You must specify a valid id parameter in the URL.",
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
