# aidocks-task

### Instructions:

  - clone this repository
  ##### Backend:
  - install Lua, LuaRocks and Postgress
  - run this command in bash:  luarocks install lapis pgmoon lua-resty-cors lua-resty-jwt
  - run with changing "your_user_name" and "your_database_name" in the Backend directory: psql -U your_user_name -d your_database_name < run_this.sql
  - run: lapis server

  ##### Frontend:
  - run: npm install
  - make sure port 3000 is free
  - run: npm run start
