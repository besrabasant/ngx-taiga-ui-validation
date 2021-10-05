export type ValidationErrorConfig = {
  defaultValidationContext: string
  useFieldContext: boolean
}

export type ValidationErrorConfigParams = {
  defaultValidationContext?: string
  useFieldContext?: boolean
}

export const DefaultConfig: ValidationErrorConfig = {
  defaultValidationContext: "general",
  useFieldContext: true
}
