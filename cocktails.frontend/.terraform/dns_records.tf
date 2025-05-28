# ================================
# APEX DOMAIN
# ================================
module "cocktails_dns_apex_domain_record" {
  source                        = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/dns-apex-domain-record"
  count                         = var.include_apex_domain_records == true ? 1 : 0
  custom_domain_verification_id = module.aca_cocktails_web.custom_domain_verification_id
  host_ip_address               = data.azurerm_container_app_environment.cae_shared.static_ip_address

  dns_zone = {
    name                = data.azurerm_dns_zone.cezzis_dns_zone.name
    resource_group_name = data.azurerm_dns_zone.cezzis_dns_zone.resource_group_name
  }

  tags = local.tags

  providers = {
    azurerm = azurerm
  }
}

module "aca_cocktails_custom_apex_domain" {
  source           = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/container-app-custom-domain"
  count            = var.include_apex_domain_records == true ? 1 : 0
  name             = "cezzis.com"
  container_app_id = module.aca_cocktails_web.id
  depends_on       = [module.cocktails_dns_apex_domain_record, module.aca_cocktails_web]

  tags = local.tags
}


# ================================
# SUB DOMAIN
# ================================
module "cocktails_dns_sub_domain_record" {
  source                        = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/dns-sub-domain-record"
  custom_domain_verification_id = lower(module.aca_cocktails_web.custom_domain_verification_id)
  sub_domain                    = var.cezzis_site_subdomain
  record_fqdn                   = module.aca_cocktails_web.ingress_fqdn

  dns_zone = {
    name                = data.azurerm_dns_zone.cezzis_dns_zone.name
    resource_group_name = data.azurerm_dns_zone.cezzis_dns_zone.resource_group_name
  }

  tags = local.tags

  providers = {
    azurerm = azurerm
  }
}

module "aca_cocktails_custom_sub_domain" {
  source           = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/container-app-custom-domain"
  name             = "${var.cezzis_site_subdomain}.cezzis.com"
  container_app_id = module.aca_cocktails_web.id
  depends_on       = [module.cocktails_dns_sub_domain_record, module.aca_cocktails_web]

  tags = local.tags
}


# ================================
# MX MAIL RECORD
# ================================
module "cocktails_dns_zoho_mx_record" {
  source             = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/dns-mx-record"
  count              = var.include_zoho_mx_dns_records == true ? 1 : 0
  spf_include_domain = "zohomail.com"

  tags = local.tags

  providers = {
    azurerm = azurerm
  }

  dns_zone = {
    name                = data.azurerm_dns_zone.cezzis_dns_zone.name
    resource_group_name = data.azurerm_dns_zone.cezzis_dns_zone.resource_group_name
  }

  dkim_record = {
    name  = "zmail._domainkey"
    value = "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTnZHS1lvmFKKGwS+Aba20XZqeZM+STKdyRTltks2qvVRhNop4GeCdcXr8lc/cue3mV/48CchHQxqX30y3glRhB5z0xQOB4+dOl3z4buJa0fvqYxjOrurNn2yF06zx5hSB02eO9Q82p4AMT6BG0ApDGMxxhQ4sGl99A251eFMcgQIDAQAB"
  }

  record_exchanges = [
    {
      preference = 10
      exchange   = "mx.zoho.com"
    },
    {
      preference = 20
      exchange   = "mx2.zoho.com"
    },
    {
      preference = 50
      exchange   = "mx3.zoho.com"
    }
  ]
}

# ================================
# Google Site Verification
# ================================
module "cocktails_dns_google_site_verification_txt" {
  source = "git::ssh://git@github.com/mtnvencenzo/Terraform-Modules.git//modules/dns-txt-record"
  count  = var.include_google_verification_txt_record == true ? 1 : 0
  name   = "google-site-verification"
  value  = "google-site-verification=w4YM0OPjGK14u7y6xPLc4w5TW6k3U2V3YLsY5cI0paQ"

  tags = local.tags

  dns_zone = {
    name                = data.azurerm_dns_zone.cezzis_dns_zone.name
    resource_group_name = data.azurerm_dns_zone.cezzis_dns_zone.resource_group_name
  }

  providers = {
    azurerm = azurerm
  }
}
