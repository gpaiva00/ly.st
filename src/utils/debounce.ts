export const debounce = (fn: (() => void), delay: number = 1000) => {
  let timer = null

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
