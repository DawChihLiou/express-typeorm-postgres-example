import debug from 'debug'

export function createLogger(...namespaces: string[]) {
  const path = namespaces.join(':')
  return debug(`app:${path}`)
}
