local lunajson = require "lunajson"

local file = io.open("test.json", "r")
local data = file:read("*all")
file:close()

local tbl = lunajson.decode(data)
print(tbl["name"])