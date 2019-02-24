export default (state, { type, payload }) => {
  switch (type) {
    case 'USER_NAVIGATION':
      return payload.newLocation
  }
  return state
}
