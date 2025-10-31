import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';

const AuthScreen = ({ username, setUsername, password, setPassword, handleLogin, loginError }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-6">
    <div className="card p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 gradient-indigo rounded-full mb-4 shadow">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-slate-900 mb-1">mySalesOps</h1>
        <p className="text-sm text-slate-500">Business Management System</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="form-label">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" placeholder="Enter username" />
        </div>
        <div>
          <label className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" placeholder="Enter password" />
        </div>
        {loginError && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            {loginError}
          </div>
        )}
        <button onClick={handleLogin} className="btn-primary w-full">Sign In</button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-slate-600 mb-2 font-medium">Demo Credentials:</p>
        <p className="text-xs text-slate-500">admin / admin123</p>
        <p className="text-xs text-slate-500">sales / sales123</p>
        <p className="text-xs text-slate-500">viewer / viewer123</p>
      </div>
    </div>
  </div>
);

export default AuthScreen;
