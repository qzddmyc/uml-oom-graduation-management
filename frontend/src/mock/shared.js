const DEFAULT_DELAY = 160

function cloneData(data) {
  if (typeof structuredClone === 'function') {
    return structuredClone(data)
  }

  return JSON.parse(JSON.stringify(data))
}

export function resolveMock(data, delay = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(cloneData(data))
    }, delay)
  })
}
