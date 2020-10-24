export default function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        ...state,
        showDrawer: true,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        showDrawer: false,
        buttonDisabled: false,
        photo: null,
        uploadProgress: 0,
      };
    case 'ADD_INPUT':
      return {
        ...state,
        photo: action.photo,
      };
    case 'buttonDisabled':
      return {
        ...state,
        buttonDisabled: action.buttonDisabled,
      };
    case 'uploadProgress':
      return {
        ...state,
        uploadProgress: action.uploadProgress,
      };
    default:
      throw new Error();
  }
}
