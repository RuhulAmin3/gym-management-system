import { app } from "./app";
import config from "./config";
import { Server } from "http";
import { prisma } from "./utils/prisma-client";

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

let server: Server;

async function connectDb() {
  try {
    console.log("database connected successfully");
    server = app.listen(config.port, () => {
      console.log("server running on port", config.port);
    });
  } catch (err) {
    console.error("failed to connect database");
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

process.on("SIGTERM", (err) => {
  console.log("SIGTERM is received", err);
  if (server) {
    server.close();
  }
});
