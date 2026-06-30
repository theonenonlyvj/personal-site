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
  cta: string
  /** Game is a clone of a trademarked title; rename before public deploy. */
  renamePending?: boolean
  /** CSS object-position for the cover-cropped thumbnail (default centered) */
  thumbPosition?: string
  /** CSS object-fit for the thumbnail (default cover) */
  thumbFit?: 'cover' | 'contain'
}
