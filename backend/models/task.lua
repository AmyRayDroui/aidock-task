local Model = require("lapis.db.model").Model

local Task = Model:extend("task", {
  primary_key = "id",
  { "title", "text" },
  { "description", "text" },
  {"checked","boolean"},
  {"user_id", "integer"}
})

return Task