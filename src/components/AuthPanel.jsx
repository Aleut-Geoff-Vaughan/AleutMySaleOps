import React from 'react';

const AuthPanel = ({ isAuthenticated, currentUser, username, setUsername, password, setPassword, handleLogin, loginError, onLogout }) => {
  if (isAuthenticated) {
    return (
      <div className="p-4 border rounded-md bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Signed in as</div>
            <div className="font-medium">{currentUser}</div>
          </div>
          <button onClick={onLogout} className="text-sm text-red-600">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md bg-white">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded" />
        </div>
        {loginError && <div className="text-sm text-red-600">{loginError}</div>}
        <div className="text-right">
          <button onClick={handleLogin} className="px-4 py-2 bg-indigo-600 text-white rounded">Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
