import { Observable } from 'rxjs'
import { getMessage } from './index'

test('returns correct tuple for one-way message', () => {
  const wrappedMessage = getMessage<number>('MY_NUM')
  const [send, stream, waitFor] = wrappedMessage

  expect(wrappedMessage).toBeInstanceOf(Array)
  expect(wrappedMessage.length).toBe(3)

  expect(send.call).toBeDefined()

  expect(stream).toBeInstanceOf(Observable)

  expect(waitFor()).toBeInstanceOf(Promise)
  expect(waitFor(() => true)).toBeInstanceOf(Promise)
})

test('returns correct tuple', () => {
  const wrappedMessage = getMessage<number, string>('MY_NUM', { async: true })
  const [send, stream, waitFor] = wrappedMessage

  expect(wrappedMessage).toBeInstanceOf(Array)
  expect(wrappedMessage.length).toBe(3)

  expect(send.call).toBeDefined()

  expect(stream).toBeInstanceOf(Observable)

  expect(waitFor()).toBeInstanceOf(Promise)
  expect(waitFor(() => true)).toBeInstanceOf(Promise)
})
