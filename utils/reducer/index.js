export default function reducer(state, action) {
  switch (action.type) {
    case 'contactList':
      return {
        ...state,
        data: action.data,
      };
    case 'showModal':
      return {
        ...state,
        showModal: action.showModal,
        dataModal: action.dataModal,
      };
    case 'uploadProgress':
      return {
        ...state,
        uploadProgress: action.uploadProgress,
      };
    case 'filterList':
      return {
        ...state,
        shownContact: action.shownContact,
      };
    case 'searchList':
      return {
        ...state,
        search: action.search,
      };
    case 'commitEdit':
      return {
        ...state,
        commitEdit: true,
      };
    case 'buttonDisabled':
      return {
        ...state,
        buttonDisabled: action.buttonDisabled,
      };
    case 'refetch':
      return {
        ...state,
        refetch: action.refetch,
      };
    case 'editInput':
      return {
        ...state,
        id: action.id ? action.id : state.id,
        firstName: action.firstName ? action.firstName : state.firstName,
        lastName: action.lastName ? action.lastName : state.lastName,
        age: action.age ? action.age : state.age,
        photo: action.photo ? action.photo : state.photo,
      };
    case 'resetEditInput':
      return {
        ...state,
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        photo: '',
        commitEdit: false,
        showModal: false,
        dataModal: [],
      };
    default:
      throw new Error();
  }
}
