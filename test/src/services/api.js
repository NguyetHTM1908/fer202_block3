// import axios from 'axios';

// // Nếu bạn dùng proxy trong package.json, để baseURL rỗng ('') để gọi tương đối.
// // Nếu bạn dùng ENV, nó sẽ ưu tiên REACT_APP_API_URL.
// const baseURL =
//   process.env.REACT_APP_API_URL?.trim() || '';

// const api = axios.create({ baseURL }); // '' + '/products' => qua proxy

// export default api;
import axios from 'axios';
const api = axios.create({ baseURL: '' }); // gọi '/products' sẽ được proxy sang 3001
export default api;