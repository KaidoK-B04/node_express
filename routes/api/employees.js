const express = require("express");
const router = express.Router();
const path = require("path");

const employeesController = require("../../controller/employeesController");
const { get } = require("http");

const data = {};
data.employees = require("../../data/employees.json");

router.route("/")
.get(employeesController.getAlleEmployees)
.post(employeesController.createNewEmployee)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee);

router.route("/:id")
  get(employeesController.getEmployee);

module.exports = router;