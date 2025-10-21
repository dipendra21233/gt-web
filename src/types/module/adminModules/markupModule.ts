export interface Markup {
  category: string
  carrier: string
  airlineType: string
  flat: number
  markup: number
  createdById?: string
  createdBy?: string
  markupId?: string
  createdAt?: string
  updatedAt?: string
  _id?: string
  tax?: number
  yq?: number
}

export interface AddMarkupFormValues {
  category: string
  carrier: string
  airlineType: string
  flat: string // keeping as string for form input
  yq?: string // optional for conditional validation
  tax?: string // optional for conditional validation
}
