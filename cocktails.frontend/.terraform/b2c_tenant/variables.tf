variable "tenant_id" {
  type = string
}

variable "tenant_domain_name" {
  type = string
}

variable "domain" {
  type        = string
  description = "Domain name. Use only lowercase letters and numbers"
}

variable "environment" {
  type        = string
  description = "Environment name, e.g. 'dev' or 'stage' or 'prod'"
}

variable "region" {
  type = string
}

variable "sub" {
  type        = string
  description = "Subscription short identitifer to be used in resource naming"
}

variable "sequence" {
  type        = string
  description = "The sequence number of the resource typically starting with 001"
}

variable "webapp_redirect_uris" {
  type        = list(string)
  description = "The redirect uris available for the web app registration and b2c integration"
}

variable "webapp_logout_url" {
  type        = string
  description = "The logout url for the website used by the front channel logout process"
}

variable "webapp_homepage_url" {
  type        = string
  description = "The homepage url for the website"
}

variable "cocktails_api_client_id" {
  type = string
}

variable "cocktails_api_scope_account_read" {
  type = string
}

variable "cocktails_api_scope_account_write" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}