type Options = {
  baseUrl: string;
  headers: {
    "Content-Type": string;
  };
};

class Api {
  private _baseUrl: string;
  private _headers: { "Content-Type": string };
  private _token: string;
  constructor(options: Options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = "";
  }

  _checkResponse(res: any) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  setToken(token: string) {
    this._token = `Bearer ${token}`;
  }

  signup(values: any) {
    return fetch(`${this._baseUrl}/users`, {
      method: "POST",
      headers: this._headers,
      body: new URLSearchParams(values).toString(),
    }).then((res) => this._checkResponse(res));
  }

  signin(values: any) {
    return fetch(`${this._baseUrl}/auth`, {
      method: "POST",
      headers: this._headers,
      body: new URLSearchParams(values).toString(),
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo(token: string) {
    return fetch(`${this._baseUrl}/user?token=${token}`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  getTasks(userId?: number) {
    return fetch(
      `${this._baseUrl}/tasks?token=${this._token}${
        userId ? "&userId=" + userId : ""
      }`,
      {
        headers: this._headers,
      }
    ).then((res) => this._checkResponse(res));
  }

  addTask(data: any) {
    data["token"] = this._token;
    return fetch(`${this._baseUrl}/task`, {
      method: "POST",
      headers: this._headers,
      body: new URLSearchParams(data).toString(),
    }).then((res) => this._checkResponse(res));
  }

  getTask(taskId: number) {
    return fetch(`${this._baseUrl}/task/?id=${taskId}&token=${this._token}`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  updateTask(data: any, taskId: number) {
    data["token"] = this._token;
    data["id"] = taskId;
    return fetch(`${this._baseUrl}/update-task`, {
      method: "POST",
      headers: this._headers,
      body: new URLSearchParams(data).toString(),
    }).then((res) => this._checkResponse(res));
  }

  deleteTask(taskId: number) {
    const data = {
      token: this._token,
      id: taskId.toString(),
    };
    return fetch(`${this._baseUrl}/delete-task`, {
      method: "POST",
      headers: this._headers,
      body: new URLSearchParams(data).toString(),
    }).then((res) => this._checkResponse(res));
  }
}

const mainApi = new Api({
  baseUrl: "http://localhost:9090",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default mainApi;
