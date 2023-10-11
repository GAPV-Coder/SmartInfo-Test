import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../reducers/userSlice';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        biography: '',
        telephone: '',
        gender: '',
        role: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, repeatPassword, name, biography, telephone, gender, role } = formData;
        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const user = { email, password, name, biography, telephone, gender, role };
            await dispatch(registerUser(user));
            history.push('/home');
        } catch (error) {
            console.log(error);
            alert('Error registering user');
        }
    };

    return (
        <div className="card">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register user</h2>
                <div className="form-group">
                    <input type="email" id="email" name="email" required placeholder="Enter email" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" required placeholder="Enter password" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="password" id="repeatPassword" name="repeatPassword" required placeholder="Repeat password" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" id="name" name="name" required placeholder="Enter your name" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <textarea id="biography" name="biography" rows="3" required placeholder="Enter your biography" onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <input type="tel" id="telephone" name="telephone" required placeholder="Enter your phone number" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" required onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" required onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="developer">User</option>
                        <option value="designer">Admin</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;