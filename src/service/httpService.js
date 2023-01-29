import axios from 'axios';

export default class HTTP {
  static Post = async payload => {
    try {
      let {data} = await axios.post(payload.url, {}, {});
      // console.log('PostApi: ', JSON.stringify(data));
      return data;
    } catch (error) {
      console.log('# Error', JSON.stringify(error));
      // return {error, status: 'error', message: 'API Level Issue'};
    }
  };
  static PostData = async (url, payload) => {
    try {
      var formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }
      console.log(JSON.stringify(formData));
      let {data} = await axios.post(url, formData, {
        headers: {'Content-type': 'multipart/form-data'},
      });
      return data;
    } catch (error) {
      console.log('#Error ', JSON.stringify(error));
    }
  };
  static Get = async payload => {
    try {
      let {data} = await axios.get(payload.url, {});
      // console.log('PostApi: ', JSON.stringify(data));
      return data;
    } catch (error) {
      console.log('#Error ', JSON.stringify(error));
    }
  };
  static GetData = async payload => {
    try {
      let {data} = await axios.get(payload.url, payload.data);
      return data;
    } catch (error) {
      console.log('#Error ', JSON.stringify(error));
    }
  };
}

// export default {Post, PostData, Get, GetData};
