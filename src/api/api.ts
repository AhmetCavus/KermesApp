import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}`;
const REACT_ACT = process.env.REACT_APP_ACT;

const api = axios.create({
  baseURL: BASE_URL,
});


export const fetchCollection = async (
  collectionId: string,
): Promise<any> => {
  const response = await api.get(`/collection/${collectionId}`, {
    headers: { Authorization: `Bearer ${REACT_ACT}` },
    params: { withSchema: true },
  });
  return response.data;
};

export const addItemToCollection = async (
  collectionId: string,
  data: Record<string, any>
): Promise<any> => {
  const response = await api.post(`/collection/${collectionId}`, data, {
    headers: { Authorization: `Bearer ${REACT_ACT}` },
  });
  return response.data;
};

export const deleteItemFromCollection = async (
  collectionId: string,
  itemId: string
): Promise<void> => {
  await api.delete(`/collection/${collectionId}/${itemId}`, {
    headers: { Authorization: `Bearer ${REACT_ACT}` },
  });
};

export const updateItem = async (id: string, itemId: string, item: any) => {
  await api.put(`/collection/${id}/${itemId}`, item, {
    headers: { Authorization: `Bearer ${REACT_ACT}` },
  });
}

export default api;