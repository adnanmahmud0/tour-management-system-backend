import { Server } from "http";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

let server: Server;

const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();

// unhandledRejection error
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection found. Server shutting down...   ", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);

})


//uncought rejection error

process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception found. Server shutting down...   ", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);

})

// signal handling for graceful shutdown
process.on("SIGTERM", () => {
  console.error("SIGTERM signal found. Server shutting down...   ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);

})

process.on("SIGINT", () => {
  console.error("SIGINT signal found. Server shutting down...   ");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);

})


// //uncought rejection error
// Promise.reject(new Error("The Server is shutting down due to an unhandled rejection"));

// // uncaught exception error
// throw new Error("The Server is shutting down due to an uncaught exception");






