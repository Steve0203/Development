import axios from "axios";

class Api {
  constructor() {
    this.base_url = window.location.protocol + "//" + window.location.host;
    this.api_url =
      this.base_url == "http://localhost:3000"
        ? "https://dewolfchemdev.wpengine.com"
        : this.base_url;
    this.axios = axios.create({
      baseURL: this.api_url + '/api'
    })
  }

  async initFilters(slug) {
    return this.axios.get('/', {
      params: {
        'data_type': slug,
        'request': 'getPosts'
      },
      maxContentLength: 6000000
    })
  }

  async getItems(dataType) {
    return this.axios.get('/', {
      params: {
        'data_type': dataType,
        'request': 'posts'
      }
    })
  }

  async reloadTrends(filterSlug) {
    return this.axios.get('/', {
      params: {
        'data_type': 'post',
        'request': 'posts',
        'category': filterSlug
      }
    })
  }

  async getProfiles() {
    return this.axios.get('/', {
      params: {
        'request': 'profile'
      }
    })
  }
}

export default Api
