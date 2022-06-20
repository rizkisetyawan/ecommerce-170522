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

const PUT = async (endpoint, options = {}) => {
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

const DELETE = async (endpoint, options = {}) => {
  const { body, requireToken = true } = options;
  const token = await localStorage.getItem('token');
  const option = {
    method: 'DELETE',
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

export const getIdentity = () => GET('/api/auth');
export const getImageAuth = () => GET('/api/image/auth');
export const getProducts = () => GET('/api/product');
export const getProductsUmkm = () => GET('/api/product/umkm');
export const getDetailProduct = (id) => GET(`/api/product/detail/${id}`);
export const getCategory = () => GET('/api/product/category');
export const getCart = () => GET('/api/cart');
export const getTrx = () => GET('/api/trx');
export const getBank = () => GET('/api/trx/bank');
export const getInvoice = (noInvoice) => GET(`/api/trx/invoice/${noInvoice}`);

export const postLogin = (body) => POST('/api/auth', { body, requireToken: false });
export const postRegister = (body) => POST('/api/user', { body, requireToken: false });
export const postFoto = (body) => POST('/', { body, isFormData: true });
export const postToko = (body) => POST('/api/umkm', { body });
export const postProduct = (body) => POST('/api/product', { body });
export const postTrx = (body) => POST('/api/trx', { body });
export const postCart = (body) => POST('/api/cart', { body });

export const putUserDetail = (body) => PUT('/api/user/detail', { body });
export const putProduct = (id, body) => PUT(`/api/product/${id}`, { body });
export const putStatusProduct = (id, body) => PUT(`/api/product/status/${id}`, { body });
export const putReview = (idItemOrder, idItem, body) => PUT(`/api/trx/review/${idItemOrder}/${idItem}`, { body });

export const deleteCart = (idItem) => DELETE(`/api/cart/${idItem}`);
