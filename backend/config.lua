local config = require("lapis.config")

config("development", {
  server = "nginx",
  code_cache = "off",
  num_workers = "1",
  port = 9090,
  jwt_secret = 'dev',
  postgres = {
    host = "127.0.0.1",
    password = "your_password",
    database = "your_database"
  }
})
