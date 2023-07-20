local Model = require("lapis.db.model").Model

local User = Model:extend("user", {
    primary_key = "id",
  { "name", "text" },
  { "username", "text" },
  {"password","text"},
})

return User