import express from "express";
import { pizzaList, addPizza,addCart,cartList,getPizzaById,deleteItem,checkOut,succesful } from "../Helper.js";

const router = express.Router();


router
  .route("/pizza")
  .get(async (request, response) => {
    const result = await pizzaList();
    response.send(result);
  })
  .post(async (request, response) => {
    const data = request.body;
    const result = await addPizza(data);
    response.send(result);
  })
  router
  .route("/pizza/:id")
  .get(async (request,response)=>{
    const {id} = request.params
    // const movie = movies.find(mv=>mv.id === id)
    const result = await getPizzaById(id);
    result ? response.send(result) 
    : response.status(404).send({msg:"no found"})
})

  router
  .route("/cart")
  .get(async (request, response) => {
    const result = await cartList();
    response.send(result);
  })

  .post(async (request, response) => {
    const cartItem = request.body;
    const result = await addCart(cartItem);
    response.send(result);
  });

router
.route("/checkout")
.post(async(request, response)=>{
  const details = request.body;
  const result = await checkOut(details)
  response.send(result) 
})
.get(async(request, response)=>{
  const result = await succesful()
  response.send(result) 
})


router
.route("/cart/:id")
.delete(async(request, response)=>{
  const {id} = request.params
  const result = await deleteItem(id)
  response.send(result) 
})

export const pizzaApp = router;
