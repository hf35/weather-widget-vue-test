export const Pages = {
  Weather: 'weather',
  Settings: 'settings',
} as const

export type Page = typeof Pages[keyof typeof Pages]

