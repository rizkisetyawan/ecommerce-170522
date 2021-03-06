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
export const getProducts = (type) => GET(`/api/product?type=${type}`);
export const getProductsWishlist = () => GET('/api/product/wishlist');
export const getProductsCategory = (name) => GET(`/api/product/category/${name}`);
export const getProductsToko = (idUmkm) => GET(`/api/product/toko/${idUmkm}`);
export const getProductsUmkm = () => GET('/api/product/umkm');
export const getDetailProduct = (id, idUser = '') => GET(`/api/product/detail/${id}${idUser ? `?id_user=${idUser}` : ''}`);
export const getProductsSearch = (name) => GET(`/api/product/search/${name}`);
export const getCategory = () => GET('/api/product/category');
export const getCart = () => GET('/api/cart');
export const getTrx = () => GET('/api/trx');
export const getWithdrawUmkm = (idUmkm) => GET(`/api/withdraw/umkm/${idUmkm}`);
export const getTrxStatistics = (day, idUmkm) => GET(`/api/trx/statistics/${day}/${idUmkm}`);
export const getTrxStatistics2 = (idUmkm, startDate, endDate) => GET(`/api/trx/statistics2/${idUmkm}?startDate=${startDate}&endDate=${endDate}`);
export const getTrxToko = (idToko) => GET(`/api/trx/toko/${idToko}`);
export const getUserReviews = () => GET('/api/user/reviews');
export const getAllUsersWithPageLimit = ({ limit, page, search = '' }) => GET(`/api/user/all?limit=${limit}&page=${page}&search=${search}`);
export const getAllUsers = () => GET('/api/user/all');
export const getAllWithdraw = () => GET('/api/withdraw/all');
export const getDashboard = () => GET('/api/user/dashboard');
export const getAllProduct = () => GET('/api/product/all');
export const getAllTrx = () => GET('/api/trx/all');
export const getBank = () => GET('/api/trx/bank');
export const getInvoice = (noInvoice) => GET(`/api/trx/invoice/${noInvoice}`);

export const postLogin = (body) => POST('/api/auth', { body, requireToken: false });
export const postRegister = (body) => POST('/api/user', { body, requireToken: false });
export const postFoto = (body) => POST('/', { body, isFormData: true });
export const postToko = (body) => POST('/api/umkm', { body });
export const postProduct = (body) => POST('/api/product', { body });
export const postTrx = (body) => POST('/api/trx', { body });
export const postCheckStock = (body) => POST('/api/trx/check-stock', { body });
export const postTrxMulti = (body) => POST('/api/trx/multi', { body });
export const postCart = (body) => POST('/api/cart', { body });
export const postWishlist = (body) => POST('/api/product/wishlist', { body });
export const postItemStock = (body) => POST('/api/product/stock', { body });
export const postCategory = (body) => POST('/api/product/category', { body });
export const postWithdraw = (body) => POST('/api/withdraw', { body });

export const putUserDetail = (body) => PUT('/api/user/detail', { body });
export const putProduct = (id, body) => PUT(`/api/product/${id}`, { body });
export const putStatusProduct = (id, body) => PUT(`/api/product/status/${id}`, { body });
export const putCategory = (name, body) => PUT(`/api/product/category/${name}`, { body });
export const putStatusUser = (id, body) => PUT(`/api/user/status/${id}`, { body });
export const putRoleUser = (id, body) => PUT(`/api/user/role/${id}`, { body });
export const putReview = (idItemOrder, body) => PUT(`/api/trx/review/${idItemOrder}`, { body });
export const putToko = (idUmkm, body) => PUT(`/api/umkm/${idUmkm}`, { body });
export const putTrxFoto = (idItemOrder, body) => PUT(`/api/trx/foto-trx/${idItemOrder}`, { body });
export const putTrxStatus = (idItemOrder, body) => PUT(`/api/trx/status/${idItemOrder}`, { body });
export const putTrxStatusAll = (idItemOrder, body) => PUT(`/api/trx/status-all/${idItemOrder}`, { body });
export const putWithrawDone = (idHistory) => PUT(`/api/withdraw/status/${idHistory}`);

export const deleteCart = (idItem) => DELETE(`/api/cart/${idItem}`);
export const deleteUser = (idUser) => DELETE(`/api/user/${idUser}`);
export const deleteProduct = (idItem) => DELETE(`/api/product/${idItem}`);
export const deleteCategory = (name) => DELETE(`/api/product/category/${name}`);
