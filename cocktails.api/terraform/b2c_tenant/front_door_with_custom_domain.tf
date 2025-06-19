module "frontdoor_endpoint_to_b2c_tenant" {
  source = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/frontdoor-cdn-endpoint-with-origin"

  sub                      = var.sub
  region                   = var.region
  environment              = var.environment
  domain                   = "${var.domain}login"
  sequence                 = var.sequence
  cdn_frontdoor_profile_id = var.cdn_frontdoor_profile_id
  origin_host_name         = "${var.tenant_domain_name}.b2clogin.com"

  tags = local.tags

  custom_domain = {
    dns_zone_id             = var.dns_zone_id
    dns_zone_name           = "cezzis.com"
    dns_zone_resource_group = var.dns_zone_resource_group
    sub_domain              = var.login_subdomain
    host_name               = "${var.login_subdomain}.cezzis.com"
  }

  allowed_origins = var.allowed_origins

  providers = {
    azurerm = azurerm
  }
}