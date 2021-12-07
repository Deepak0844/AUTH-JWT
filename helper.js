import bcrypt from "bcryptjs";
import { client } from "./index.js";
import { ObjectId } from "mongodb";

async function genPassword(password) {
  const NO_OF_ROUNDS = 10; //difficulties
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS); //random string
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function getUserByName(userName) {
  return await client
    .db("b28wd")
    .collection("users")
    .findOne({ userName: userName });
}

async function createUser(data) {
  return await client.db("b28wd").collection("users").insertOne(data);
}

async function pizzaList() {
  return await client.db("b28wd").collection("pizza").find().toArray();
}

async function addPizza(data) {
  return await client.db("b28wd").collection("pizza").insertMany(data);
}

async function addCart(cartItem) {
  return await client.db("b28wd").collection("cart").insertOne(cartItem);
}

async function cartList() {
  return await client.db("b28wd").collection("cart").find().toArray();
}

async function getPizzaById(id) {
  return await client
    .db("b28wd")
    .collection("pizza")
    .findOne({ _id: ObjectId(id) });
}

async function deleteItem(id) {
  return await client
    .db("b28wd")
    .collection("cart")
    .deleteOne({ _id: ObjectId(id) });
}

async function checkOut(details) {
  return await client.db("b28wd").collection("checkout").insertOne(details);
}

async function succesful() {
  return await client.db("b28wd").collection("checkout").findOne();
}
export {
  genPassword,
  createUser,
  getUserByName,
  pizzaList,
  addPizza,
  addCart,
  cartList,
  getPizzaById,
  deleteItem,
  checkOut,
  succesful,
};
