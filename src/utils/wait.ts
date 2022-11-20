export const wait = (timeout = 2000) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
