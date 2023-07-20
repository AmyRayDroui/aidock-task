local schema = require("lapis.db.schema")
local migrations = require("lapis.db.migrations")
local types = schema.types

return  {[1]=function()
    migrations.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto;")

    schema.create_table("user", {
        { "id", types.serial },
        { "username", types.text },
        { "password", types.text },
        { "name", types.text },
        "PRIMARY KEY (id)"
    })

    schema.create_table("task", {
        { "id", types.serial },
        { "title", types.text },
        { "description", types.text },
        { "checked", types.boolean },
        { "user_id", types.integer },
        "PRIMARY KEY (id)"
    })

    schema.alter_table("task", function(table)
        table:add_foreign_key("user_id", "user", "id")
    end)
  end}
