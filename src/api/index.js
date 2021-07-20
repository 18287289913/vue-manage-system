import http from '../utils/http'

// let request = "/dev-api/request/"
export default{
  login(params) {
    return http.post(`/user/login`, params);
  },
  checkToken(params) {
    return http.post("/user/token", params);
  },
  getUserList() {
    return http.get("/user/findall");
  },
  deleteUser(params) {
    return http.post("/user/delete", params);
  },
  updateUser(params) {
    return http.post("/user/update", params);
  },
  addUser(params) {
    return http.post("/user/add", params);
  }
}
