
export const initialStore = () => {
  return {
    message: null,
    disabled: true,
    visibilityAgenda: "visible",
    visibilityContacs: "hidden",
    agenda: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    todos: [
      /* {
         id: 1,
         title: "Make the bed",
         background: null,
       },
       {
         id: 2,
         title: "Do my homework",
         background: null,
       },
       {
         id: 3,
         title: "Do BED",
         background: null,
       }*/
    ]
  }
}


export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'inputAble':
      return {
        ...store,
        disabled: action.value
      };
    case 'visibilityAgenda':
      return {
        ...store,
        visibilityAgenda: action.value
      };
    case 'visibilityContacts':
      return {
        ...store,
        visibilityContacs: action.value
      };
    case 'addAgenda':
      return {
        ...store,
        agenda: action.value,

      };
    case 'addName':
      return {
        ...store,
        name: action.value,
      };
    case 'addPhone':
      return {
        ...store,
        phone: action.value,
      };
    case 'addEmail':
      return {
        ...store,
        email: action.value,
      };
    case 'addAddress':
      return {
        ...store,
        address: action.value
      };
    default:
      throw Error('Unknown action.');
  }

}
