import express from "express"
import { addTodo , delTodo, editTodo, getallTodo , getSingletodo } from "../controller/todos.controller.js"


const router = express.Router()

router.post("/todos", addTodo)
router.get("/alltodos", getallTodo)
router.get("/todos/:id", getSingletodo)
router.delete("/del/:id", delTodo)
router.put("/edit/:id", editTodo)



export default router





