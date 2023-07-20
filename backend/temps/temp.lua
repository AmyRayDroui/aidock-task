local lapis = require("lapis")
local app = lapis.Application()

app:get("/hello/:name", function(self)
  return "Hello, " .. self.params.name .. "!"
end)

app:post("/message", function(self)
  local data = self.req.parsed_post
  if data and data.message then
    -- Process the message here
    return "Received message: " .. data.message
  else
    self.status = 400
    return "Invalid request"
  end
end)

app:run()