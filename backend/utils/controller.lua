local function success(message) 
    return { json = message, status = 200 }
end

local function get_table_columns(Module)
    local cols = Module:columns()
    local new_cols = {}
    print(type(cols))
    for key, value in pairs(cols) do
        new_cols[value.column_name] = value.data_type
    end
    return new_cols
end

return {
    success=success,
    get_table_columns=get_table_columns,
}