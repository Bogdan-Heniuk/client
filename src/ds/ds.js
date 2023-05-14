import { unAuthorizedAxios, authorizedAxios } from "../config.js";

export class Auth {
  constructor() {
    this.prefix = "/auth";
  }

  async register(formData) {
    try {
      return unAuthorizedAxios.post(`${this.prefix}/registration`, formData);
    } catch (e) {
      console.log("Failed to register", e);
      throw e;
    }
  }

  async login(email, password) {
    try {
      return unAuthorizedAxios.post(`${this.prefix}/login`, {
        email,
        password,
      });
    } catch (e) {
      console.log("Failed to login", e.response.data);
      throw e;
    }
  }
}

export class User {
  constructor() {
    this.prefix = "/user";
  }

  async update(formData) {
    try {
      return authorizedAxios.put(`${this.prefix}`, formData);
    } catch (e) {
      console.log("Failed to update user", e);
      throw e;
    }
  }

  getInfo(userId) {
    try {
      return authorizedAxios.get(`${this.prefix}/${userId}`);
    } catch (e) {
      console.log("Failed to get user info", e);
      throw e;
    }
  }
}

export class Company {
  constructor() {
    this.prefix = "/company";
  }

  async update(formData) {
    try {
      return authorizedAxios.put(`${this.prefix}`, formData);
    } catch (e) {
      console.log("Failed to update company", e);
      throw e;
    }
  }

  async get() {
    try {
      return authorizedAxios.get(`${this.prefix}`);
    } catch (e) {
      console.log("Failed to get company by id", e);
      throw e;
    }
  }
}

export class Vacancy {
  constructor() {
    this.prefix = "/vacancy";
  }

  async update(id, payload) {
    try {
      return authorizedAxios.put(`${this.prefix}/${id}`, payload);
    } catch (e) {
      console.log("Failed to update vacancy", e);
      throw e;
    }
  }

  async create(payload) {
    try {
      return authorizedAxios.post(`${this.prefix}`, payload);
    } catch (e) {
      console.log("Failed to create vanancy", e);
      throw e;
    }
  }

  async getById(id) {
    try {
      return authorizedAxios.get(`${this.prefix}/${id}`);
    } catch (e) {
      console.log("Failed to get company by id", e);
      throw e;
    }
  }

  async getByFitler(filter) {
    try {
      return authorizedAxios.post(`${this.prefix}/filter`, filter);
    } catch (e) {
      console.log("Failed to get vacancies by filter", e);
      throw e;
    }
  }

  async getByUser() {
    try {
      return authorizedAxios.get(`${this.prefix}/byUser`);
    } catch (e) {
      console.log("Failed to get vacancies by user", e);
      throw e;
    }
  }

  async apply(id, formData) {
    try {
      return authorizedAxios.post(`${this.prefix}/${id}/apply`, formData);
    } catch (e) {
      console.log("Failed to apply for a vacancy", e);
      throw e;
    }
  }
}
