import React, { useState, useEffect } from 'react';
import '../../styles/UserFormModal.css';

const UserFormModal = ({ isOpen, onClose, onSave, onPasswordSave, user, isPasswordChange }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    useEffect(() => {
        if (isPasswordChange) {
            setFormData(prevState => ({
                ...prevState,
                password: '',
                confirmPassword: ''
            }));
        } else if (user) {
            setFormData({ ...user, password: '', confirmPassword: '' });
        } else {
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                role: 'user'
            });
        }
    }, [user, isPasswordChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        if (isPasswordChange) {
            onPasswordSave(user._id, formData.password);
        } else {
            onSave(formData);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isPasswordChange ? 'Change Password' : (user ? 'Edit User' : 'Add User')}</h2>
                <form onSubmit={handleSubmit}>
                    {isPasswordChange ? (
                        <>
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required={!user} disabled={!!user} />
                            </div>
                            {!user && ( // Only show password/confirm for new user creation
                                <>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                                    </div>
                                </>
                            )}
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
