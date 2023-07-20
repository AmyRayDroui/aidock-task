local db = require("lapis.db")
local jwt = require "resty.jwt"
local jwt_secret = require("lapis.config").get().jwt_secret
local User = require("models.user")
local errors = require("errors")
local success = require("utils.controller").success

local function authentication(self)
  local routeName = self.req.cmd_url:sub(2)
  if routeName == "users" or routeName == "auth" or string.find(routeName,"user") then
    return true
  end
  local auth_header = self.params.token
  if auth_header then
    local jwt_token = jwt:verify(jwt_secret, auth_header:sub(8))
    if jwt_token.verified then
      self.current_user = jwt_token.payload
    else
      self:write(errors.error_invalid_token())
    end
  else
    self:write(errors.error_authorization_required())
  end
end

local function add_user(self)
    if self.params.name == nil then
        return errors.error_field_required("name")
    end
    if self.params.username == nil then
        return errors.error_field_required("username")
    end
    if self.params.password == nil then
        return errors.error_field_required("password")
    end
    if self.params.name and self.params.username and self.params.password then
        local user = User:create({
            username=self.params.username,
            password=db.raw("crypt('"..self.params.password.."', gen_salt('md5'))"),
            name=self.params.name
        })
        if user then return success(user) else return errors.error_server() end
    else
        return errors.error_invalid_request()
    end
end

local function get_user(self)
    if self.params.token == nil then
        return errors.error_field_required("token")
    end
    local jwt_token = jwt:verify(jwt_secret, self.params.token)
    if jwt_token.verified then
        self.current_user = jwt_token.payload
        local user = User:find({
            id=self.current_user.id,
        })
        if user == nil then 
            return errors.error_server()
        end
        return success(user)
    else
        return errors.error_server()
    end
end

local function connect_user(self)
    if self.params.username == nil then
        return errors.error_field_required("username")
    end
    if self.params.password == nil then
        return errors.error_field_required("password")
    end
    if self.params.username and self.params.password then
        local user = User:find({
            username=self.params.username,
        })
        if user == nil then 
            return errors.error_incorrect_user_password()
        end
        local result = db.select("crypt( ? , ? ) = ? AS authenticated", self.params.password, user.password, user.password)
        if not result[1].authenticated then 
            return errors.error_incorrect_user_password()
        end
        local token = jwt:sign(jwt_secret, {
            header = { typ = "JWT", alg = "HS256" },
            payload = { id = user.id },
        })
        if token then return success({token = token,userId = user.id, name= user.name }) else return errors.error_server() end
    end
end

return  {
    authentication=authentication,
    add_user=add_user,
    get_user=get_user,
    connect_user = connect_user
}