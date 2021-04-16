/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
 import axiosConfig from '../redux/axiosConfig';

 const postJSON = (url, options = {}) => {
 
     return axiosConfig.post(url, options)
         .then(response => response.data)
         .then(data => {
             return data;
         })
         .catch(error => {
             throw error;
         });
         
 };
 
 
 const fetchJSON = (url, options = {}) => {
 
     return axiosConfig.get(url, options)
         .then(response => response.data)
         .then(data => {
             return data;
         })
         .catch(error => {
             throw error;
         });
         
 };
 
 export { fetchJSON, postJSON };
 