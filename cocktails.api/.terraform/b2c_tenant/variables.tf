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

variable "tags" {
  type    = map(string)
  default = {}
}
