import { DynamoDB } from "aws-sdk";
import express, { json } from "express";
import serverless from "serverless-http";

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new DynamoDB.DocumentClient();

app.use(json());

app.get("/users/:userId", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/users", async function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };
  res.json({
    mess: 'aaa',
  })

  // try {
  //   await dynamoDbClient.put(params).promise();
  //   res.json({ userId, name });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: "Could not create user" });
  // }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


export const handler = serverless(app);