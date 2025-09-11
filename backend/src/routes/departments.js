const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all departments (public)
router.get('/', departmentController.getDepartments);

// Get a single department by ID (public)
router.get('/:id', departmentController.getDepartmentById);

// Create a new department (protected, admin only)
router.post('/', authMiddleware.auth, departmentController.createDepartment);

// Update an existing department (protected, admin only)
router.put('/:id', authMiddleware.auth, departmentController.updateDepartment);

// Delete a department (protected, admin only)
router.delete('/:id', authMiddleware.auth, departmentController.deleteDepartment);

module.exports = router;