
const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Learn React.js",
    description: "Practice React components",
    completed: false
  },
  {
    id: 2,
    title: "Learn Node.js",
    description: "Practice REST APIs",
    completed: true
  }
];

// unique ID
const generateId = () => {
  return tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1
    : 1;
};

app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tasks fetched successfully",
    data: tasks
  });
});

// 2 Get single task by ID
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Task fetched successfully",
    data: task
  });
});

// 3POST-Create a new task
app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task title is required"
    });
  }

  const newTask = {
    id: generateId(),
    title: title.trim(),
    description: description || "",
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask
  });
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const { title, description, completed } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" || !title.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Task title must be a non-empty string"
    });
  }

  if (
    completed !== undefined &&
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Completed must be true or false"
    });
  }

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
});

app.patch("/api/tasks/:id/status", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Completed must be true or false"
    });
  }

  task.completed = completed;

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    data: task
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
