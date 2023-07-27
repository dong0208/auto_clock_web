// 系统加载
const initialState = true

function pageLoadingReducer (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case "showPageLoading":
      return true;
    case "hidePageLoading":
      return false;
    default:
      return state;
  }
}

export default pageLoadingReducer