import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private fields: Record<string, string> = {}

  setField(name: string, value: unknown): void {
    localStorage.setItem(name, JSON.stringify(value))
  }

  removeField(name: string): void {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
    }
  }

  getField<T>(name: string): T | undefined {
    const parsed = localStorage.getItem(name)

    if (parsed) {
      return JSON.parse(parsed) as T
    }

    return undefined
  }
}
