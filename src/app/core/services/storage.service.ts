import { Injectable } from '@angular/core'

const KEY_FOR_SAVE_TO_LOCALSTORAGE = 'localStorage'

type StateField = Record<string, string>

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private fields: Record<string, string> = {}

  setField(name: string, value: unknown): void {
    localStorage.setItem(name, JSON.stringify(value))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getField<T>(name: string): T | undefined {
    const parsed = localStorage.getItem(name)

    if (parsed) {
      return JSON.parse(parsed) as T
    }

    return undefined
  }
}
