
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

variable "global_domain" {
  type        = string
  description = "The global domain name"
  default     = "shared"
}

variable "ciam_login_redirect_uri" {
  type = string
}

variable "ciam_tenant_id" {
  type        = string
  description = "The ciam tenant id for this environment"
}

variable "ciam_tenant_name" {
  type        = string
  description = "The ciam tenant name (typeically the first part of the hostname)"
}

variable "ciam_signin_policy" {
  type        = string
  description = "The main signin policy for the cocktails webapp"
  default     = "sisu-p"
}

variable "ciam_resetpassword_policy" {
  type        = string
  description = "The main password reset for the cocktails webapp"
  default     = "rp-p"
}


variable "ciam_resetpassword_redirect_uri" {
  type        = string
  description = "The redirect uri  to use when returning from the reset password user flow"
}

variable "ciam_tenant_domain_name" {
  type        = string
  description = "The ciam tenant domain name for this environment"
}

variable "ciam_terraform_app_registration_client_id" {
  type = string
}

variable "ciam_terraform_app_registration_client_secret" {
  type = string
}

variable "image_tag" {
  type = string
}

variable "webapp_redirect_uris" {
  type        = list(string)
  description = "The redirect uris available for the web app registration and ciam integration"
}

variable "webapp_logout_url" {
  type        = string
  description = "The logout url for the website used by the front channel logout process"
}

variable "webapp_homepage_url" {
  type        = string
  description = "The homepage url for the website"
}

variable "cezzis_site_subdomain" {
  type        = string
  description = "The subdomain to create dns records for (ex. www or dev)"
}

variable "cocktails_api_scope_account_read" {
  type = string
}

variable "cocktails_api_scope_account_write" {
  type = string
}

variable "cocktails_api_client_id" {
  type = string
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

variable "cezzis_cdn_subdomain" {
  type = string
}

variable "cocktail_images_cdn_default_hostname" {
  type = string
}

variable "cezzis_cdn_custom_domain_verification_name" {
  type = string
}

variable "cezzis_cdn_custom_domain_verification_id" {
  type = string
}

variable "include_google_verification_txt_record" {
  type    = bool
  default = false
}

variable "login_subdomain" {
  type = string
}
