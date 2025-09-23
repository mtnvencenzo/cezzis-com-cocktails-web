environment           = "prd"
vite_node_environment = "production"

b2c_login_redirect_uri         = "https://www.cezzis.com/"
b2c_tenant_id                  = "fb512a9c-5b44-41ab-8042-6465769f16c9"
b2c_tenant_name                = "cezzis"
b2c_tenant_domain_name         = "cezzis.onmicrosoft.com"
b2c_resetpassword_redirect_uri = "https://www.cezzis.com/account/profile-center/"

# Entra External Identities
entra_login_redirect_uri         = "https://www.cezzis.com/"
entra_tenant_id                  = "e4ea5dbf-d3fc-4991-888c-2b2f7c6b3b45"
entra_tenant_name                = "cezziscom"
entra_tenant_domain_name         = "cezziscom.onmicrosoft.com"
entra_resetpassword_redirect_uri = "https://www.cezzis.com/account/profile-center/"


webapp_redirect_uris = [
  "https://cezzis.com/",
  "https://www.cezzis.com/",
  "https://www.cezzis.com/account/profile-center/",
  "https://api.cezzis.com/prd/cocktails/api-docs/v1/scalar/v1",
  "https://localhost:4001/",
  "https://localhost:4001/account/profile-center/",
  "https://localhost:7176/scalar/v1"
]

webapp_logout_url                      = "https://www.cezzis.com/signout"
webapp_homepage_url                    = "https://www.cezzis.com"
cezzis_site_subdomain                  = "www"
cezzis_cdn_subdomain                   = "cdn"
cocktails_api_scope_account_read       = "771e9640-5432-2f31-d214-15c9206a8665"
cocktails_api_scope_account_write      = "6898f74f-921d-18da-e885-920448ff1914"
cocktails_api_client_id                = "8f42e92c-e1ed-40f2-be13-3335af105d36"
cocktails_api_hostname                 = "api.cezzis.com"
include_zoho_mx_dns_records            = true
include_apex_domain_records            = true
include_google_verification_txt_record = true

cocktail_images_route_hostname             = "https://cdn.cezzis.com"
cocktail_images_cdn_default_hostname       = "afde-vec-eus-prd-cocktails-001-f3byc0hucse0escw.z02.azurefd.net"
cezzis_cdn_custom_domain_verification_name = "_dnsauth.cdn"
cezzis_cdn_custom_domain_verification_id   = "_z3zmtvfitsahmnzxz3ecspvxlszfot7"

login_subdomain = "login"