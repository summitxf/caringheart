export const getHeader = needAuth => {
  let token = localStorage.getItem('userToken') || null

  if (needAuth && token) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  } else {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}
