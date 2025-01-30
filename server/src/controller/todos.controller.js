import mongoose from "mongoose";
import Todos from "../models/todos.models.js";


// add Todo

const addTodo = async (req, res) => {
    const { title, description } = req.body;
    console.log("Request Body:", req.body); // Log request body to verify
    
    if (!title || !description) {
        res.status(400).json({
            message: "title or description required",
        });
        return;
    }
    try{
    const todo = await Todos.create({
      title,
      description,
    });
    res.status(201).json({
      message: "user added to database successfully",
      todo
    });}
    catch (error) {
        // Handle errors
        res.status(500).json({
          message: "Failed to add todo",
          error: error.message, // Include error message for debugging
        });
      }
  };


// get all todo

const getallTodo = async (req , res) =>{
const todos = await Todos.find({})  
res.status(200).json({
todos : todos
})
}

// get single Todo

const getSingletodo = async (req , res) => {
const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid Id" });
  }
const todo = await Todos.findById(id);
if (!todo) {
  res.status(404).json({
    message: "no todo found!",
  });
    return
}
res.status(200).json(todo)
}

// delete todo

const delTodo = async (req , res) => {
const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid Id" });
  }

  const todo = await Todos.findByIdAndDelete({_id : id})
if(!todo){
    res.status(404).json({
        message : "no found"
    })
    return
}
res.status(200).json({
message : "delete todo successfully",
todo ,
})
}
// editTodo

const editTodo = async (req , res) => {
 const {id} =req.params  
 
 if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ error: "Not valid Id" });
}
const updatetodo = await Todos.findByIdAndUpdate(id, { ...req.body }, { new: true })
if(!updatetodo){
res.status(404).json({
  message : "no found"
})
return
}
res.status(200).json({
  message: "Todo updated successfully",
  todo: updatetodo
})
 
}
export {addTodo , getallTodo , getSingletodo , delTodo , editTodo}


