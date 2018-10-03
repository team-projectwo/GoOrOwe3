import axios from "axios";

export default {
  // Gets all books
  getGroups: function() {
    return axios.get("/api/groups");
  },
  // Gets the book with the given id
  getGroupById: function(id) {
    return axios.get("/api/groups/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a group to the database
  saveGroup: function(groupData) {
    return axios.post("/api/groups", groupData);
  },
  createUser: function (user){
    console.log(user);
    return axios.post("/api/user/signin", user);
  },
  getUserByEmail: function (userEmail) {
    return axios.get("/api/user/signin", userEmail);
  },
  saveUserToGroup: function (groupUserData) {
    return axios.post("/api/groups/addUser", groupUserData);
  }
};