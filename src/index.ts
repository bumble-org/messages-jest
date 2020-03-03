import { Observable, Subject } from 'rxjs'
import { first } from 'rxjs/operators'

export type AsyncMockWrappedMessage<T, R> = [
  jest.MockedFunction<(value: T, options?: { tabId: number }) => Promise<R>> & {
    toTab: jest.MockedFunction<(options: { tabId: number }) => Promise<R>>
  },
  Subject<[T, chrome.runtime.MessageSender, (response: R) => void]>,
  (predicate?: (value: T) => boolean) => Promise<T>,
]

export type MockWrappedMessage<T> = [
  jest.MockedFunction<
    (value: T, options?: { tabId: number }) => Promise<void>
  > & {
    toTab: jest.MockedFunction<(options: { tabId: number }) => Promise<void>>
  },
  Subject<[T, chrome.runtime.MessageSender]>,
  (predicate?: (value: T) => boolean) => Promise<T>,
]

export const setupWaitForFirst = <T>(stream: Observable<T>) => (
  predicate = (() => true) as (x: T) => boolean,
) => stream.pipe(first(predicate)).toPromise()

export function getMessage<T, R>(
  greeting: string,
  options: { async: true },
): AsyncMockWrappedMessage<T, R>
export function getMessage<T>(greeting: string): MockWrappedMessage<T>
export function getMessage<T, R>() {
  const send = jest.fn() as any
  send.toTab = jest.fn()

  const subject = new Subject()

  return [send, subject, setupWaitForFirst(subject)] as
    | AsyncMockWrappedMessage<T, R>
    | MockWrappedMessage<T>
}
