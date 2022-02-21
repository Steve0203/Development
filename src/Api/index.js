import axios from "axios";

class Api {
  constructor() {
    this.base_url = window.location.protocol + "//" + window.location.host;
    this.api_url =
      this.base_url == "http://localhost:3000"
        ? "https://dewolfchemical.wpengine.com"
        : this.base_url;
    axios.defaults.baseURL = this.api_url + "/api/";
  }

  async getPostTypes() {
    const data = {
      request: "meta",
    };
    return axios
      .get("/", { params: data })
      .then((res) => {
        return Promise.resolve(res.data["post_types"]);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async get_taxonomies(type) {
    const data = {
      request: "meta",
    };
    return axios
      .get("/", { params: data })
      .then((res) => {
        return Promise.resolve(res.data["posts_by_taxonomy"][type]);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async get_trends(args) {
    const data = {
      request: "posts",
      ...args,
    };
    return axios
      .get("/", { params: data })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if ((err.response.status = "404")) {
          return Promise.resolve(err.response.data);
        }
      });
  }

  async search_keyword(args) {
    const data = {
      data_type: "product",
      request: "posts",
      ...args,
    }
    return axios
      .get("/", { params: data })
      .then((res) => {
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        if ((err.response.status = "404")) {
          return Promise.resolve(err.response.data)
        }
      })
  }

  async get_Results(args) {
    const data = {
      request: "posts",
      ...args,
    };
    return axios
      .get("/", { params: data })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if ((err.response.status = "404")) {
          return Promise.resolve(err.response.data);
        }
      });
  }

  async get_terms_from_taxonomies(args) {
    const data = {
      request: "terms",
      ...args,
    };
    return axios
      .get("/", { params: data })
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        if ((err.response.status = "404")) {
          return Promise.resolve(err.response.data);
        }
      });
  }

  async getTermsForTrends() {
    return axios
      .get('/', {
        params: {
          'request': 'terms',
          'data_type': 'post'
        }
      }).then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        if ((err.response.status = "404")) {
          return Promise.resolve(err.response.data);
        }
      });
  } 
}

export default new Api();
