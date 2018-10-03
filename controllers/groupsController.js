const db = require("../models");

// Defining methods for the groupsController
module.exports = {
  findAll: function(req, res) {
    db.Group
      .find(req.query)
      .sort({ title: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Group
      .findById(req.params.id)
      .populate("participants")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Group
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Group
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Group
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addUserToGroup: function(req, res){
    console.log(req.body);
    db.Group.findOneAndUpdate({
      _id: req.body.groupId
    }, {
      $push: {
        participants: req.body.userId
      }
    }, {
      new: true
    }).then((dbRes) => {
      console.log(dbRes);
      db.User.findOneAndUpdate({
        _id: req.body.userId
      }, {
        $push: {
          joinedGroups: req.body.groupId
        }
      }, {
        new: true
      }).then((finalDbRes) => {
        res.end()
      })
    })
  }
};
