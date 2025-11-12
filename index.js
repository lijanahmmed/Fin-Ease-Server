const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.3kkgkzf.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({
      message: "unauthorized access.",
    });
  }

  const token = authorization.split(" ")[1];
  try {
    await admin.auth().verifyIdToken(token);

    next();
  } catch (error) {
    res.status(401).send({
      message: "unauthorized access.",
    });
  }
};

async function run() {
  try {
    await client.connect();

    const db = client.db("FinEase_DB");
    const transactionCollection = db.collection("transaction");

    app.post("/add-transaction", verifyToken, async (req, res) => {
      const transactionData = req.body;
      const result = await transactionCollection.insertOne(transactionData);
      res.send(result);
    });

    app.get("/my-transaction", verifyToken, async (req, res) => {
      const email = req.query.email;
      const sortBy = req.query.sortBy || "date";
      const order = req.query.order === "asc" ? 1 : -1;

      const query = { email };
      let cursor;

      if (sortBy === "amount") {
        cursor = transactionCollection.aggregate([
          { $match: query },
          { $addFields: { amountNum: { $toDouble: "$amount" } } },
          { $sort: { amountNum: order } },
        ]);
      } else {
        cursor = transactionCollection.find(query).sort({ [sortBy]: order });
      }

      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/my-transaction/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);

      const result = await transactionCollection.findOne({ _id: objectId });
      res.send({ result });
    });

    app.put("/update-transaction/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const update = {
        $set: data,
      };
      const result = await transactionCollection.updateOne(filter, update);
      res.send(result);
    });

    app.delete("/transaction/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await transactionCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Fin Ease server is running!!");
});

app.listen(port, () => {
  console.log(`Fin Ease server is listening on port ${port}`);
});
