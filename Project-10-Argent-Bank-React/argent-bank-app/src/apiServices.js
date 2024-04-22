const API_BASE_URL = "http://localhost:3001/api/v1";

// Fonction de connexion avec une requête POST à l'endpoint ../login pour authentifier l'utilisateur
export const loginApi = (email, password) => {
  return fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

// Fonction pour récupérer les détails du profil de l'utilisateur avec une requête POST
export const fetchUserProfile = (token) => {
  return fetch(`${API_BASE_URL}/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

// Fonction pour mettre à jour les détails du profil de l'utilisateur avec une requête PUT
export const updateUserProfileApi = (userData, token) => {
  return fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
