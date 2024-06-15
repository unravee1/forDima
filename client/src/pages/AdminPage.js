import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', trainer: '' });
  const [newCourse, setNewCourse] = useState({ name: '', description: '', trainer: '' });
  const [selectedUser, setSelectedUser] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchGroups();
    fetchCourses();
    fetchPayments();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/groups', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setGroups(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/payments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setPayments(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ role }),
      });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const { name, description, trainer } = newGroup;
      await fetch('http://localhost:5000/api/admin/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, description, trainer }),
      });
      setNewGroup({ name: '', description: '', trainer: '' });
      fetchGroups();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await fetch(`http://localhost:5000/api/admin/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchGroups();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const { name, description, trainer } = newCourse;
      await fetch('http://localhost:5000/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, description, trainer }),
      });
      setNewCourse({ name: '', description: '', trainer: '' });
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await fetch(`http://localhost:5000/api/admin/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const addBalanceHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/payments/add-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: selectedUser, amount: balance }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Balance added successfully');
        setBalance('');
        setSelectedUser('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}
        
        <section>
          <h3 className="text-xl font-bold mb-2">Users</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    >
                      <option value="user">User</option>
                      <option value="trainer">Trainer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-bold mb-2">Add Balance to User</h3>
          <form onSubmit={addBalanceHandler}>
            <div className="mb-4">
              <label>User</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label>Balance Amount</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full"
            >
              Add Balance
            </button>
          </form>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-bold mb-2">Groups</h3>
          <div className="mb-4">
            <input
              type="text"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              placeholder="New Group Name"
              className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={newGroup.description}
              onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              placeholder="Description"
              className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <select
              value={newGroup.trainer}
              onChange={(e) => setNewGroup({ ...newGroup, trainer: e.target.value })}
              className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
            >
              <option value="">Select Trainer</option>
              {users
                .filter((user) => user.role === 'trainer')
                .map((trainer) => (
                  <option key={trainer._id} value={trainer._id}>
                    {trainer.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={handleCreateGroup}
            className="btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Create
          </button>
          <table className="min-w-full bg-white mt-4">
            <thead>
              <tr>
                <th className="py-2">Group Name</th>
                <th className="py-2">Description</th>
                <th className="py-2">Trainer</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group._id}>
                  <td className="py-2">{group.name}</td>
                  <td className="py-2">{group.description}</td>
                  <td className="py-2">{group.trainer.name}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleDeleteGroup(group._id)}
                      className="btn-primary bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-bold mb-2">Courses</h3>
          <div className="mb-4">
            <input
              type="text"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              placeholder="New Course Name"
              className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              placeholder="Description"
              className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <select
              value={newCourse.trainer}
              onChange={(e) => setNewCourse({ ...newCourse, trainer: e.target.value })}
              className="input w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
            >
              <option value="">Select Trainer</option>
              {users
                .filter((user) => user.role === 'trainer')
                .map((trainer) => (
                  <option key={trainer._id} value={trainer._id}>
                    {trainer.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={handleCreateCourse}
            className="btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Create
          </button>
          <table className="min-w-full bg-white mt-4">
            <thead>
              <tr>
                <th className="py-2">Course Name</th>
                <th className="py-2">Description</th>
                <th className="py-2">Trainer</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td className="py-2">{course.name}</td>
                  <td className="py-2">{course.description}</td>
                  <td className="py-2">{course.trainer.name}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="btn-primary bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-bold mb-2">Payments</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">User</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="py-2">{payment.user.name}</td>
                  <td className="py-2">${payment.amount}</td>
                  <td className="py-2">{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
