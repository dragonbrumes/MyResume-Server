// experiencesController.js

// Import experiences model
Experiences = require("../models/experiencesModel");

// Handle viewAll actions (Read)
exports.viewAll = function(req, res) {
  Experiences.find(function(err, experiences) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Experiences retrieved successfully",
      data: experiences
    });
  }).sort({ order: "desc" });
};
// Handle index actions (Read)
exports.index = function(req, res) {
  Experiences.get(function(err, experiences) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Experiences retrieved successfully",
      data: experiences
    });
  });
};
// Handle create Experiences actions
exports.new = function(req, res) {
  var experiences = new Experiences();
  experiences.company = req.body.company;
  experiences.logo = req.body.logo;
  experiences.spanTime = req.body.spanTime;
  experiences.jobTitle = req.body.jobTitle;
  experiences.inCharge = req.body.inCharge;
  experiences.order = req.body.order;
  // save the Experiences and check for errors
  experiences.save(function(err) {
    if (err) {
      res.json(err);
      // res.status("204").json({ err, insert: "ko" });
      console.log(err);
    } else {
      res.json({
        insert: "ok",
        message: "New Experiences created!",
        data: experiences
      });
    }
  });
};
// Handle view One Experiences info
exports.view = function(req, res) {
  Experiences.findById(req.params.Experiences_id, function(err, experiences) {
    if (err) res.send(err);
    res.json({
      message: "Experiences details loading..",
      data: experiences
    });
  });
};

// Handle update Experiences info
exports.update = function(req, res) {
  Experiences.findById(req.params.id, function(err, experiences) {
    if (err) res.send(err);
    experiences.company = req.body.company;
    experiences.logo = req.body.logo;
    experiences.spanTime = req.body.spanTime;
    experiences.jobTitle = req.body.jobTitle;
    experiences.inCharge = req.body.inCharge;
    experiences.order = req.body.order;
    // save the Experiences and check for errors
    experiences.save(function(err) {
      if (err) res.json(err);
      res.json({ message: "Experiences Info updated", data: experiences });
    });
  });
};

// Handle delete Experiences
exports.delete = function(req, res) {
  Experiences.deleteOne(
    {
      _id: req.params.id
    },
    function(err, experiences) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Experience deleted"
      });
    }
  );
};
