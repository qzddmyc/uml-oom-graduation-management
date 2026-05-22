import NProgress from 'nprogress'

let pendingProgressCount = 0

NProgress.configure({
  minimum: 0.12,
  showSpinner: false,
  trickleSpeed: 100,
})

export function startProgress() {
  pendingProgressCount += 1

  if (pendingProgressCount === 1) {
    NProgress.start()
  }
}

export function doneProgress() {
  pendingProgressCount = Math.max(0, pendingProgressCount - 1)

  if (pendingProgressCount === 0) {
    NProgress.done()
  }
}

export function resetProgress() {
  pendingProgressCount = 0
  NProgress.done()
}
