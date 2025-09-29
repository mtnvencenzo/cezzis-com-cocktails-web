terraform {
  required_providers {

    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=4.24.0"
    }
  }

  backend "azurerm" {}
}

provider "azurerm" {
  features {}
}