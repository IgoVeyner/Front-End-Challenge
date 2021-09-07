const updateInterval = (interval, callback, time) => {
  interval.current = setInterval(callback, time)
}

export const onNextClick = (total, offset, counterRef, interval, dispatchCallback) => {
  const nextPage = () => {
    const calulateMaxNumber = () => {
      return total - total % 10
    }

    const newOffset = Math.min(calulateMaxNumber() - offset, counterRef.current * 10)
    dispatchCallback(newOffset)
    counterRef.current = 0
  }

  clearInterval(interval.current)
  counterRef.current += 1
  updateInterval(interval, nextPage, 500)
}

export const onPrevClick = (offset, counterRef, interval, dispatchCallback) => {
  const prevPage = () => {
    const newOffset = Math.max(0 - offset, counterRef.current * -10)
    dispatchCallback(newOffset)
    counterRef.current = 0
  }

  clearInterval(interval.current)
  counterRef.current += 1
  updateInterval(interval, prevPage, 500)
}