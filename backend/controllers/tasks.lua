
local Task = require("models.task")
local errors = require("errors")
local success = require("utils.controller").success
local get_table_columns = require("utils.controller").get_table_columns

local function check_owner(current_user, task_id)
    local task = Task:find(task_id)
    if task == nil then 
        return false
    end    
    if task.user_id == current_user then return true else return false end 
end

local function get_tasks(self)
    local user_id = self.params.userId
    local task = nil
    if user_id then
        task = Task:select("where user_id = ?",user_id)
    else
        task = Task:select()
    end
    return success(task)
end

local function get_task(self)
    local task = Task:select("where id = ?",self.params.id)
    return success(task)
end

local function add_task(self)
    if self.params.title == nil then
        return errors.error_field_required("title")
    end
    if self.params.description == nil then
        return errors.error_field_required("description")
    end
    if self.params.title and self.params.description then
        local task = Task:create({
            title=self.params.title,
            description=self.params.description,
            checked=false,
            user_id=self.current_user.id
        })
        if task then return success(task) else return errors.error_server() end 
    else
      return errors.error_invalid_request()
    end
end

local function update_task(self)
    if not check_owner(self.current_user.id, self.params.id) then 
        return errors.error_forbidden()
    end
    local update_params = {}
    local cols = get_table_columns(Task)
    for key, value in pairs(self.params) do
        if cols[key] ~= nil and key ~= 'id' and key ~= 'user_id' then 
            update_params[key] = value
        end
    end
    if next(update_params) ~= nil then
      local task = Task:find(self.params.id):update(update_params)
      if task then return success({message = "Task updated successfully"}) else return errors.error_server() end 
    else
      return errors.error_invalid_request()
    end
end

local function delete_task(self)
    if not check_owner(self.current_user.id, self.params.id) then 
        return errors.error_forbidden()
    end
    local task = Task:find(self.params.id):delete()
    if task then return success({message = "Task deleted successfully"}) else return errors.error_server() end 
end

return {
    get_tasks = get_tasks,
    get_task = get_task,
    add_task = add_task,
    update_task = update_task,
    delete_task = delete_task,
}