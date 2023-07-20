local function error_invalid_request()
    return { json = { error = "Invalid request" }, status = 400 }
end

local function error_invalid_token()
    return { json = { error = "Invalid token" }, status = 401 }
end

local function error_authorization_required()
    return { json = { error = "Authorization required" }, status = 401 }
end

local function error_incorrect_user_password()
    return { json = { error = "Incorrect username or password" }, status = 401 }
end

local function error_forbidden()
    return { json = { error = "Not allowed to alter element" }, status = 403 }
end

local function error_not_found()
    return { json = { error = "Not found" }, status = 404 }
end

local function error_field_required(field_name)
    return { json = { error = "Field '" .. field_name .. "' is required" }, status = 422 }
end

local function error_server()
    return { json = { error = "Something went wrong..." }, status = 500 }
end

return {
    error_invalid_request = error_invalid_request,
    error_invalid_token = error_invalid_token,
    error_authorization_required = error_authorization_required,
    error_incorrect_user_password = error_incorrect_user_password,
    error_forbidden = error_forbidden,
    error_not_found = error_not_found,
    error_field_required = error_field_required,
    error_server = error_server,
}