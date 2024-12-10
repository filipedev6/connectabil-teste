const config = {
  _id: "rs0",
  members: [
    {
      _id: 0,
      host: "mongodb:27017",
      priority: 1
    }
  ]
};

rs.initiate(config);