type CalFunction = ((...args: unknown[]) => void) & {
  config?: { forwardQueryParams?: boolean }
  loaded?: boolean
  ns?: Record<string, CalFunction>
  q?: unknown[]
}

declare global {
  interface Window {
    Cal?: CalFunction
  }
}

let calLoadPromise: Promise<void> | undefined
let calReady = false

function loadCal() {
  if (calLoadPromise) return calLoadPromise

  calLoadPromise = new Promise((resolve, reject) => {
    const cal = ((...args: unknown[]) => {
      cal.q ??= []

      if (args[0] === 'init' && typeof args[1] === 'string') {
        cal.ns ??= {}
        const namespace = args[1]
        const api = cal.ns[namespace] ?? (((...apiArgs: unknown[]) => {
          api.q ??= []
          api.q.push(apiArgs)
        }) as CalFunction)
        api.q ??= []
        cal.ns[namespace] = api
        api.q.push(args)
        cal.q.push(['initNamespace', namespace])
      } else {
        cal.q.push(args)
      }
    }) as CalFunction

    cal.q = []
    cal.ns = {}
    window.Cal = cal
    cal('init', '20min', { origin: 'https://app.cal.com' })
    cal.config = { forwardQueryParams: true }
    cal.ns['20min']?.('ui', { hideEventTypeDetails: false, layout: 'month_view' })

    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.onload = () => {
      calReady = true
      resolve()
    }
    script.onerror = () => {
      calLoadPromise = undefined
      reject(new Error('Cal.com failed to load'))
    }
    document.head.appendChild(script)
  })

  return calLoadPromise
}

export function useCalBooking() {
  async function handleBookingClick(event: MouseEvent) {
    if (calReady) return

    event.preventDefault()
    const link = event.currentTarget as HTMLAnchorElement

    try {
      await loadCal()
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    } catch {
      window.location.assign(link.href)
    }
  }

  return { handleBookingClick }
}
