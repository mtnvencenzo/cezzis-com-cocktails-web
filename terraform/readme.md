# Setup with Azure Pipelines
To run dev locally

``` bash
az login --tenant abc490e5-395b-4db1-9d9f-18434a45263d
az account set --subscription 1d9ecc00-242a-460d-8b08-b71db19f094e

terraform init \
 	-backend-config=storage_account_name=stveceusterraformstat001 \
 	-backend-config=container_name=terraform-cocktails \
 	-backend-config=key=cocktails/prd-cocktails-api.tfstate \
 	-backend-config=resource_group_name=rg-vec-eus-administration-001 \
 	-backend-config=subscription_id=1d9ecc00-242a-460d-8b08-b71db19f094e \
 	-backend-config=tenant_id=abc490e5-395b-4db1-9d9f-18434a45263d

# to validate the current config
terraform validate

terraform plan -var "ciam_terraform_app_registration_client_id=--get-clientid--" -var "ciam_terraform_app_registration_client_secret=--get-secret--" -var="image_tag=abc" -var-file="environment_vars/prd.tfvars"

# terraform import -var-file="environment_vars/prd.tfvars" azurerm_container_app_custom_domain.cocktails_web_container_app_custom_domain_www_cezzis_com "/subscriptions/1d9ecc00-242a-460d-8b08-b71db19f094e/resourceGroups/rg-vec-eus-prd-cocktails-001/providers/Microsoft.App/containerApps/aca-vec-eus-prd-cocktailsweb-001/customDomainName/www.cezzis.com"
```

# Example terraform import
``` terraform
import {
  to = azurerm_dns_txt_record.cezzis_domain_zoho_txt_dkim_record
  id = "/subscriptions/1d9ecc00-242a-460d-8b08-b71db19f094e/resourceGroups/rg-vec-eus-glo-cocktails-001/providers/Microsoft.Network/dnsZones/cezzis.com/TXT/zmail._domainkey"
}

resource "azurerm_dns_txt_record" "cezzis_domain_zoho_txt_dkim_record" {
  name                = "zmail._domainkey"
}
```