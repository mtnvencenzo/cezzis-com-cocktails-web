### Azurite should use a cert
https://github.com/Azure/Azurite/blob/main/README.md#https-setup
https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio%2Cblob-storage

**Generate Certificate and Key with mkcert**
1. Install mkcert: https://github.com/FiloSottile/mkcert#installation. We like to use choco choco install mkcert, but you can install with any mechanism you'd like.
2. Run the following commands to install the Root CA and generate a cert for Azurite.

``` bash
mkcert -install
mkcert 127.0.0.1
```

That will create two files. A certificate file: 127.0.0.1.pem and a key file: 127.0.0.1-key.pem.

**Start Azurite with HTTPS and PEM**

USE POWERSHELL! GIT BASH HAD ISSUES WITH VOLUMN MAPPING

docker run --restart=always -d --name azurite-cocktails -p 10000:10000 -v D:/Github/Cocktails/.azurite:/workspace mcr.microsoft.com/azure-storage/azurite azurite-blob --blobHost 0.0.0.0 --cert /workspace/127.0.0.1.pem --key /workspace/127.0.0.1-key.pem


### Well-known storage account and key
Azurite accepts the same well-known account and key used by the legacy Azure Storage Emulator.

```bash
Account name: devstoreaccount1
Account key: Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==
```

You will need to set the blob container public access since it's private by default
This can be done via downloading the Azure Storage Explorer and connecting to the local azurite instance

https://azure.microsoft.com/en-us/products/storage/storage-explorer