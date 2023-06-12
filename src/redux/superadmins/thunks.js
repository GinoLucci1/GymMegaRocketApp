import {
  getSuperAdminsError,
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  deleteSuperAdminsError,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsPending,
  postSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  putSuperAdminsError,
  putSuperAdminsSuccess,
  putSuperAdminsPending,
  getByIdSuperAdminsError,
  getByIdSuperAdminsSuccess,
  getByIdSuperAdminsPending
} from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin`);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getSuperAdminsSuccess(responseJson.data));
    } catch (error) {
      dispatch(getSuperAdminsError(error));
    }
  };
};
export const deleteSuperAdmins = (_id, setModalText) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin${_id}`, {
        method: 'DELETE'
      });
      const responseJson = await response.json();

      if (response.ok) {
        dispatch(deleteSuperAdminsSuccess(_id));
        setModalText(responseJson.message);
      } else {
        throw new Error('Error deleting superAdmin');
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error));
      setModalText('Error deleting superAdmin: ' + error);
    }
  };
};

export const addSuperAdmins = (formData, setModalText, setShowModal) => {
  return async (dispatch) => {
    try {
      const { name, description } = formData;
      dispatch(postSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
      });
      const responseData = await response.json();

      if (response.ok) {
        const newSuperAdmin = responseData.data;
        dispatch(postSuperAdminsSuccess(newSuperAdmin));
        setModalText(responseData.message);
        setShowModal(true);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(postSuperAdminsError(error));
      setModalText('There was an error' + error);
      setShowModal(true);
    }
  };
};
export const editSuperAdmins = (updatedSuperAdmin, id, setModalText, setShowModal) => {
  return async (dispatch) => {
    try {
      dispatch(putSuperAdminsPending);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSuperAdmin)
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.data;
        dispatch(putSuperAdminsSuccess(updatedData, id));
        setShowModal(true);
        setModalText(responseData.message);
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(putSuperAdminsError(error));
      setShowModal(true);
      setModalText('There was an error' + error);
    }
  };
};

export const getByIdSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getByIdSuperAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdmin${id}`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getByIdSuperAdminsError(data));
    } catch (error) {
      dispatch(getByIdSuperAdminsSuccess(error));
    }
  };
};
