const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;

export const collections = {
  USER: "users",
  COURSES: "courses",
};

let client;

export const dbConnect = (cname) => {
  if (!client) {
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  return client.db(dbname).collection(cname);
};
