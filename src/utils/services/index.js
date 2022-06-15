const GET = async (endpoint, options = {}) => {
  const { requireToken = true } = options;
  const token = localStorage.getItem('token');
  const option = {};
  if (requireToken) {
    option.headers = { Authorization: token };
  }
  const res = await fetch(`${process.env.REACT_APP_URL}${endpoint}`, option);
  return res.json();
};

const POST = async (endpoint, options = {}) => {
  const { body, requireToken = true, isFormData = false } = options;
  const token = await localStorage.getItem('token');
  let option;
  if (isFormData) {
    const headers = new Headers();
    const bodyFormData = new FormData();
    bodyFormData.append('publicKey', process.env.REACT_APP_IK_PUBLIC);
    Object.entries(body).forEach(
      ([key, value]) => {
        bodyFormData.append(key, value);
      },
    );
    option = {
      method: 'POST',
      headers,
      body: bodyFormData,
    };
  } else {
    option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    if (requireToken) {
      option.headers.Authorization = token;
    }
  }
  const res = await fetch(`${isFormData ? process.env.REACT_APP_IK_UPLOAD : process.env.REACT_APP_URL}${endpoint}`, option);
  return res.json();
};

const PUT = async (endpoint, options) => {
  const { body, requireToken = true } = options;
  const token = await localStorage.getItem('token');
  const option = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  if (requireToken) {
    option.headers.Authorization = token;
  }
  const res = await fetch(`${process.env.REACT_APP_URL}${endpoint}`, option);
  return res.json();
};

export const getIdentity = async () => GET('/api/auth');
export const getImageAuth = async () => GET('/api/image/auth');
export const getProducts = async () => GET('/api/product');
export const getCategory = async () => GET('/api/product/category');

export const postLogin = async (body) => POST('/api/auth', { body, requireToken: false });
export const postRegister = async (body) => POST('/api/user', { body, requireToken: false });
export const postFoto = async (body) => POST('/', { body, isFormData: true });
export const postToko = async (body) => POST('/api/umkm', { body });
export const postProduct = async (body) => POST('/api/product', { body });

export const putUserDetail = async (body) => PUT('/api/user/detail', { body });
