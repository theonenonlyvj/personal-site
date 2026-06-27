export type ProjectStatus = 'live' | 'coming-soon'

export interface Project {
  slug: string
  name: string
  blurb: string
  repo: string | null
  liveUrl: string | null
  status: ProjectStatus
  thumbnail: string
  featured: boolean
  /** Game is a clone of a trademarked title; rename before public deploy. */
  renamePending?: boolean
}
