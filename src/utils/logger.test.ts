import { createLogger } from './logger'

describe('createLogger', () => {
  it('should create default namespace', () => {
    const logger = createLogger()
    expect(logger.namespace).toEqual('app:')
  })

  it('should append arguments to namespace', () => {
    const logger = createLogger('module', 'action')
    expect(logger.namespace).toEqual('app:module:action')
  })
})
