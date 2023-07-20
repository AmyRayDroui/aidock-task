local lapis = require("lapis")
local db = require("lapis.db")
local app = lapis.Application()
local respond_to = require("lapis.application").respond_to

local tasks = require("controllers.tasks")
local users = require("controllers.uesers")

local error_not_found = require("errors").error_not_found

app:before_filter(
  users.authentication
)

app:post("/users",
  users.add_user
)

app:get("/user",
  users.get_user
)

app:post("/auth",
  users.connect_user
)

app:get("/tasks", 
  tasks.get_tasks
)

app:post("/task", 
  tasks.add_task
)

app:get("/get-task", 
  tasks.get_task
)

app:post("/update-task", 
  tasks.update_task
)

app:post("/delete-task", 
tasks.delete_task
)



app:match("*", respond_to({
  GET =  error_not_found,
  POST = error_not_found,
  PUT =  error_not_found,
  DELETE = error_not_found
}))


return app