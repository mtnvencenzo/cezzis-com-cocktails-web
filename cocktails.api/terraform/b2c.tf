module "api_b2c_tenant" {
  source             = "./b2c_tenant"
  environment        = var.environment
  region             = var.region
  domain             = var.domain
  tenant_id          = var.b2c_tenant_id
  tenant_domain_name = var.b2c_tenant_domain_name
  sub                = var.sub
  sequence           = var.sequence

  tags = local.tags

  providers = {
    azuread = azuread
  }
}