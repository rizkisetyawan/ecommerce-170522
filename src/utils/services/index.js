const GET = async (endpoint, options) => {
  const token = localStorage.getItem('token');
  const option = {};
  if (options.requireToken) {
    option.headers = { Authorization: token };
  }
  const res = await fetch(`${process.env.REACT_APP_URL}${endpoint}`, option);
  return res.json();
};

const POST = async (endpoint, options) => {
  const { body, requireToken = true, isFormData = false } = options;
  const token = await localStorage.getItem('token');
  let option;
  if (isFormData) {
    const headers = new Headers();
    const bodyFormData = new FormData();
    if (requireToken) {
      headers.append('Authorization', token);
    }
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
  const res = await fetch(`${isFormData ? process.env.REACT_APP_STORAGE : process.env.REACT_APP_URL}${endpoint}`, option);
  return res.json();
};

export const getIdentity = async () => GET('/api/auth', { requireToken: true });

export const postLogin = async (body) => POST('/api/auth', { body, requireToken: false });
export const postRegister = async (body) => POST('/api/user', { body, requireToken: false });
export const postToko = async (body) => POST('/api/umkm', { body });
export const postFoto = async (body) => POST('/image', { body, requireToken: false, isFormData: true });
