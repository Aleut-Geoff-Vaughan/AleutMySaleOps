// API Service Layer
// This is a mock API service that simulates backend calls
// Replace with actual API calls when backend is ready

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses - currently returns local data
// Replace these with actual fetch calls when backend is available

export const api = {
  // Auth
  auth: {
    login: async (username, password) => {
      await delay();
      // This will be replaced with actual API call
      // return fetch(`${API_BASE_URL}/auth/login`, { ... })
      return { success: true };
    },
    logout: async () => {
      await delay();
      return { success: true };
    }
  },

  // Opportunities
  opportunities: {
    getAll: async () => {
      await delay();
      // return fetch(`${API_BASE_URL}/opportunities`)
      return [];
    },
    getById: async (id) => {
      await delay();
      return null;
    },
    create: async (data) => {
      await delay();
      return { success: true, id: Date.now() };
    },
    update: async (id, data) => {
      await delay();
      return { success: true };
    },
    delete: async (id) => {
      await delay();
      return { success: true };
    }
  },

  // Agencies
  agencies: {
    getAll: async () => {
      await delay();
      return [];
    },
    create: async (data) => {
      await delay();
      return { success: true, id: Date.now() };
    },
    update: async (id, data) => {
      await delay();
      return { success: true };
    },
    delete: async (id) => {
      await delay();
      return { success: true };
    }
  },

  // Contacts
  contacts: {
    getAll: async () => {
      await delay();
      return [];
    },
    getByAgency: async (agencyId) => {
      await delay();
      return [];
    },
    create: async (data) => {
      await delay();
      return { success: true, id: Date.now() };
    },
    update: async (id, data) => {
      await delay();
      return { success: true };
    },
    delete: async (id) => {
      await delay();
      return { success: true };
    }
  },

  // Entities
  entities: {
    getAll: async () => {
      await delay();
      return [];
    },
    create: async (data) => {
      await delay();
      return { success: true, id: Date.now() };
    },
    update: async (id, data) => {
      await delay();
      return { success: true };
    },
    delete: async (id) => {
      await delay();
      return { success: true };
    }
  },

  // Forecasts
  forecasts: {
    getAll: async () => {
      await delay();
      return [];
    },
    create: async (data) => {
      await delay();
      return { success: true, id: Date.now() };
    },
    update: async (id, data) => {
      await delay();
      return { success: true };
    }
  },

  // Configuration
  config: {
    getStages: async () => {
      await delay();
      return [];
    },
    getCapabilities: async () => {
      await delay();
      return [];
    },
    getAgencyTypes: async () => {
      await delay();
      return [];
    },
    getForecastGroups: async () => {
      await delay();
      return [];
    }
  }
};

// HTTP helper function for when you integrate real backend
export const http = {
  get: async (url) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers here
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  post: async (url, data) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  put: async (url, data) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  delete: async (url) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
};
