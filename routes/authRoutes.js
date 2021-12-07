import express from "express";
import bcrypt from "bcryptjs";
import { genPassword, createUser, getUserByName } from "../helper.js";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";

const router = express.Router();

//signup user - post
router.route("/signup").post(async (request, response) => {
  const { userName, password } = request.body;
  const userFromDB = await getUserByName(userName); //check whether user already exist

  if (userFromDB) {
    //if user name already exist
    response.status(401).send({ message: "username already exists " });
    return;
  }
  if (password.length < 8) {
    response.status(401).send({ message: "password must be longer" });
    return;
  }
  if (
    !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
  ) {
    response.status(401).send({ message: "Password pattern does not match" });
    return;
  }
  const hashedPassword = await genPassword(password);
  const result = await createUser({ userName, password: hashedPassword });
  response.send(result);
});

//login user - post
router.route("/signin").post(async (request, response) => {
  const { userName, password } = request.body;
  const userFromDB = await getUserByName(userName);

  if (!userFromDB) {
    //if user does not exist
    response.status(401).send({ message: "Invalid credentials" });
    return;
  }

  const storedPassword = userFromDB.password;
  console.log("password", storedPassword);

  const isPasswordMatch = await bcrypt.compare(password, storedPassword); //comparing input password with existing password
  console.log("password", isPasswordMatch);

  if (isPasswordMatch) {
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY); //,{expiresIn:"3hours"}
    response.send({ token: token }); //if password match
  } else {
    response.status(401).send({ message: "Invalid credentials" }); //if password does not match
  }
});

router.get("/protected", auth, (request, response) => {
  response.send("opened");
});

export const authRouter = router;
