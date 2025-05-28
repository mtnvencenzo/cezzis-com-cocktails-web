resource "azurerm_key_vault_secret" "cocktails_web_recaptcha_cezzi_site_key" {
  name         = "recaptcha-cezzi-site-key"
  value        = "n/a"
  key_vault_id = data.azurerm_key_vault.cocktails_keyvault.id

  lifecycle {
    ignore_changes = [value]
  }

  tags = local.tags
}

resource "azurerm_key_vault_secret" "cocktails_web_e2e_cypress_user_password" {
  name         = "e2e-cypress-user-password"
  value        = "n/a"
  key_vault_id = data.azurerm_key_vault.cocktails_keyvault.id

  lifecycle {
    ignore_changes = [value]
  }

  tags = local.tags
}
