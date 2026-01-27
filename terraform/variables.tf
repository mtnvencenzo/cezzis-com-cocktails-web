
variable "domain" {
  type        = string
  description = "Domain name. Use only lowercase letters and numbers"
  default     = "cocktails"
}

variable "shortdomain" {
  type        = string
  description = "Short domain name. Use only lowercase letters and numbers"
  default     = "cockti"
}

variable "owner" {
  type    = string
  default = "cocktails.web"
}

variable "product" {
  type    = string
  default = "cezzis"
}

variable "environment" {
  type        = string
  description = "Environment name, e.g. 'dev' or 'stage' or 'prod'"
}

variable "vite_node_environment" {
  type        = string
  description = "Environment name for the vite node server, e.g. 'production' or 'development'"
}

variable "location" {
  type        = string
  description = "Azure region where to create resources."
  default     = "East US"
}

variable "region" {
  type    = string
  default = "eus"
}

variable "sub" {
  type        = string
  description = "Subscription short identitifer to be used in resource naming"
  default     = "vec"
}

variable "sequence" {
  type        = string
  description = "The sequence number of the resource typically starting with 001"
  default     = "001"
}
variable "short_sequence" {
  type        = string
  description = "The short sequence number of the resource typically starting with 1"
  default     = "1"
}

variable "global_environment" {
  type        = string
  description = "The global environment name"
  default     = "glo"
}

variable "auth0_client_id" {
  type = string
}

variable "auth0_redirect_uri" {
  type = string
}

variable "auth0_domain" {
  type = string
}

variable "auth0_cocktails_api_audience" {
  type = string
}

variable "auth0_accounts_api_audience" {
  type = string
}

variable "image_tag" {
  type = string
}

variable "cezzis_site_subdomain" {
  type        = string
  description = "The subdomain to create dns records for (ex. www or dev)"
}

variable "cocktails_api_hostname" {
  type = string
}

variable "include_zoho_mx_dns_records" {
  type    = bool
  default = false
}

variable "include_apex_domain_records" {
  type    = bool
  default = false
}

variable "cocktail_images_route_hostname" {
  type = string
}

variable "include_google_verification_txt_record" {
  type    = bool
  default = false
}
