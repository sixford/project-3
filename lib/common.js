
//Handle Unauthorized
export const sendUnauthorized = (res) => {
  return res.status(401).json({ message: 'Unauthorized' })
}