import React, { useState, useEffect } from 'react';

const defaultPhoto = 'https://via.placeholder.com/150'; // URL фото за замовчуванням

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [age, setAge] = useState(userInfo.age || '');
  const [weight, setWeight] = useState(userInfo.weight || '');
  const [photo, setPhoto] = useState(userInfo.photo || defaultPhoto);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = '/login';
    }
  }, [userInfo]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ name, email, age, weight, photo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setMessage('Profile updated successfully');
        setEditMode(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVIPPurchase = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payment/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ userId: userInfo._id, amount: 250 }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo({ ...userInfo, vipStatus: true, balance: data.balance });
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, vipStatus: true, balance: data.balance }));
        setMessage('Successfully upgraded to VIP');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}
        {!editMode ? (
          <div>
            <div className="mb-4 text-center">
              <img src={photo} alt="Profile" className="mx-auto" style={{ maxHeight: '150px' }} />
            </div>
            <div className="mb-4">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Age:</strong> {age}</p>
              <p><strong>Weight:</strong> {weight}</p>
              <p><strong>VIP Status:</strong> 
                <span className={userInfo.vipStatus ? 'text-green-500' : 'text-red-500'}>
                  {userInfo.vipStatus ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
            <button onClick={() => setEditMode(true)} className="btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full">
              Edit Profile
            </button>
            {!userInfo.vipStatus && (
              <button onClick={handleVIPPurchase} className="btn-primary bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out w-full mt-4">
                Purchase VIP Membership for 250
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={updateProfileHandler}>
            <div className="mb-4">
              <label>Photo</label>
              <input type="file" onChange={handlePhotoChange} className="input" />
              {photo && <img src={photo} alt="Profile" className="mt-2" style={{ maxHeight: '150px' }} />}
            </div>
            <div className="mb-4">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
            </div>
            <div className="mb-4">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
            </div>
            <div className="mb-4">
              <label>Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input" />
            </div>
            <div className="mb-4">
              <label>Weight</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input" />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            </div>
            <button type="submit" className="btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full">
              Save Changes
            </button>
            <button onClick={() => setEditMode(false)} className="btn-secondary bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out w-full mt-4">
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
