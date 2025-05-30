# Table of Contents
1. [Cocktails website Git repository](#cocktails-website-git-repository)
2. [Environment Setup](#environment-setup)
3. [Application Deployment (Build / Terraform) Runbook](#application-deployment)
    1. [Run the various piplines and tenant setup](#run-pipelines-and-tenant)
    2. [Setup Cypress in the Cocktails.Frontend pipeline](#setup-cypress)

# 

# Cocktails website Git repository <a name="cocktails-website-git-repository"></a>
Repository for all artifacts, solutions and projects for the cocktails website.
<br />


# Environment Setup <a name="environment-setup"></a>
- Install Visual Studio
- Install VS Code
- Install Chocolatey
    - https://chocolatey.org/install
- Install Terraform
    - choco install terraform
- Install Git
    - Make sure core.autocrlf-true
- Set Git Config
``` shell
    $ git config --global core.autocrlf true
    $ git config --global user.name "John Doe"
    $ git config --global user.email "johndoe@mailinator.com"
```
- Install nvm (https://github.com/nvm-sh/nvm#install--update-script)
    - Create ``.bash_profile`` file in your home directory (Typcally `C:\Users\YourUserName`)
    - Open Git Bash and run this line: 
        - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash`
            - If you see an error about bash being not recognized, you may need to add `C:\Program Files\Git\bin` (or whatever your path is) to your emvironment variables.
        - Once install is complete run this line to start using nvm

        -   >export NVM_DIR="$HOME/.nvm"
            >[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
            >[ -s "$NVM_DIR/bash_completion.sh" ] && \. "$NVM_DIR/bash_completion.sh"

        - Verify that nvm is installed by running this command:
            - `nvm -v`
        - Install Node
            - Open Git Bash and run: `nvm install node # "node is an alias for the latest version"`
        - Verify Installation: `node -v`
        - Setup SSH key for Git (optional)
            - https://learn.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops
        - Docker
            - Make sure virtualization is enabled
                - Task manager > Performance tab > You should see 'Virtualization: Enabled'
            - Install WSL
                - Open PowerShell or Windows Command Prompt in administrator mode and run: `wsl --install` (https://learn.microsoft.com/en-us/windows/wsl/install)
                - Open windows features and enable:
                    - Virtual Machine Platform
                    - Windows Hypervisor Platform
                    - Windows Subsystem for Linux
                - From PowerShell enable WSL-1 by running the following command:
                    - `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
                - Download the Linux Kernel installer from MS (https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4--download-the-linux-kernel-update-package)
                - Run the Linux Kernel Installer
                - From PowerShell set WSL version to 2:
                    - `wsl --set-default-version 2`
            - Download and run docker desktop for windows (https://docs.docker.com/desktop/install/windows-install/)
            - Add docker-user to your non-admin login (only needed if having a separate admin account to install stuff)
                - Open in PowerShell as admin
                - Run this command:
                    - `net localgroup docker-users "domain\YourUserName" /ADD`
                - Restart your computer.
            - If any UIs need to access Devops Artifacts for internal npm packages you need to setup `vsts-npm-auth`
                -   > npm install -g vsts-npm-auth
                    > vsts-npm-auth -config .npmrc
                - Login prompt should open up and you should login with your credentials.
            - Install Yarn:
                - `npm install -g yarn`
            - Install Azure CLI
                - Can be done by command line or via an installer.
                    - Installer can be found on the Azure CLI website: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli
                - Alternately, Open PowerShell as an Admin and run this:
                    - `$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; Remove-Item .\AzureCLI.msi`
            - Install Azure Functions Core Tools
                - `choco install azure-functions-core-tools -y`
		      - After install open Visual Studio and navigate to the Tools > Options > Projects and Solutions > Azure Functions option and click 'Check for updates'

- Git Bash Integration in Visual Studio
  - Add Git Bash to Visual Studio Terminal
    - Open the Tools > Options > Environment > Terminal Menu option and add a new terminal pointing to the git sh.exe cli
      ![Adding](./.readme-assets/adding-git-bash-to-visualstudio-terminal.png)
    - Then select the View > Terminal menu and pick your new Git Bash terminal.
      ![Adding](./.readme-assets/using-git-bash-in-visualstudio-terminal.png)

  - Add Git Bash to Visual Studio External Tools
    - Open the Tools > External Tools Menu option and add a new terminal pointing to the git git-bash.exe cli
      ![Adding](./.readme-assets/adding-git-bash-to-visualstudio-external-tools.png)

- Install Dapr
    - https://docs.dapr.io/getting-started/install-dapr-selfhost/
        - Download the latest msi for windows @ https://github.com/dapr/cli/releases and run it
        - Start docker desktop (if not already)
        - In Git Bash run ``` dapr init ```
            ![dapr init](./.readme-assets/dapr-init-gitbash.png)
        - Verify the dapr version ``` dapr --version ```
        - verify containers were setup and running ``` docker ps ```
            ![dapr docker desktop](./.readme-assets/dapr-init-dockerdesktop.png)


# Application Deployment (Build / Terraform) Runbook <a name="application-deployment"></a>

## Run the various piplines and tenant setup <a name="run-pipelines-and-tenant"></a>
- Navigate to the ADO project `ADO Terraform`
  This project is responsible for setting up resource groups and service principals for other projects to use.  Essentially, it's the security gate keeper.

  > If you need a new resource group to deploy into, you should add it to this projects terraform files.

  Run the project build pipline to setup your resource group (if needed)

- Next Manually setup the b2c tenant in the environments (if not already there)
  See the [B2c setup guide](./Readme-b2c.md)

- Next run the Latest Project `Shared Infrastructure` repo pipeline to create the shared resources as well as the DNS Zone for cezzis.com.  The DNS one is shared across all enivronments and the other shared resources are shared across the entire organization.

- Next run the Latest Project `Cocktails.SharedInfrastructure` pipeline.  This will set up the keyvault for each environment and grant the appropriate subnet access for the container app environment.
  > A keyvault secret is also established for the container registry password that can be used in other pipelines to push and pull images.

- Run the Latest Project `Cocktails.Api` pipeline.  **First** verify the terraform environment variable files for the correct settings.  This will create the api and the app registration and variaous other resources needed for the api to function correctly.
  > The first time it runs the warmup request stage will fail due to the pipeline not being configured with the newly created resources.  If you know the apim url and the keyvault secret these can be setup ahead of time.
  - **Manual Setup**
    - A keyvault secret was created for the `google recaptchas site secret`  The value is defaulted to 'na' and needs to be manually applied.
    - Update the pipeline warmup stage with the correct url and keyvault secret if not already done.
    - You need to navigate the the B2C tenant and the api's app registration and `Grant Admin Consent` to the API Permissions.  Also take note of the Api's app registration `client_id` as well as the api permission scopes created.  These will need to be applied to the coctkails.frontend terraform configuration later
    
      > (Note: the api permission scope ids are guids and can only be found in azure by viewing the api app registration's manifest)

- Run the Latest Project `Cocktails.Frontend` pipline.  **First** verify the terraform environment variable files for the correct settings.
  > Note that the first time it runs,  the e2e tests will fail.  This is because the B2c app registration needs to be created first via the pipeline and the values then added to the e2e test run variables.  (_Chicken or egg problem_)
  - A keyvault secret was created for the `google recaptcha cezzi site key`  The value is defaulted to 'na' and needs to be manually applied.
  - A keyvault secret was created for the `zoho email cezzi app password`  The value is defaulted to 'na' and needs to be manually applied.
  - Navigate the the newly created container app's custom domains. YOu will need to manually create the bindings as terraform does not have the capabilities to.  Make sure to use a `Managed Certificate`.  If one already was existing just go ahead and use it.
  - Navigate to the newly created b2c app registration for the frontend and `Grant Admin Consent` to the API Permissions.
    > Take note of the app registration's client id.  This will need to be applied to the pipeline / cypress so that everything is configured correctly.  Update the pipline's `ui-cypress.yml` parameters and set the `b2cClientId` parameter correctly to the app registrations client id

- Run the Latest Project `Cocktails.Images` pipline.  **First** verify the terraform environment variable files for the correct settings.  Special consideration if you want to add more allowed origins to the storage account and frontdoor cdn

- **At this point the web site should be fully functional**
  


## Setup Cypress in the Cocktails.Frontend pipeline <a name="setup-cypress"></a>
  - Navigate the the website and register a new account.  The username and password will need to be stored so take note of what you setup the account with.
  - Navigate the the keyvault and apply the password to the `e2e-cypress-user-password` secret.
  - Navigate the the cocktails.frontend yaml pipeline and update the b2c information.
  ``` yaml
  - template: ui-cypress.yml
      parameters:
        baseUrl: 'https://www.cezzis.com'
        b2cUrl: 'https://cezzis.b2clogin.com/'
        b2cTenantId: 'fb512a9c-5b44-41ab-8042-6465769f16c9'
        b2cClientId: '84744194-da27-410f-ae0e-74f5589d4c96'
        b2cUserObjectId: '41598664-1466-4e3e-b28c-dfe9837e462e'
        b2cUserEmail: 'rvecchi+cypress@gmail.com'
        b2cUserPassword: '$(e2e-cypress-user-password)'
  ``` 
  > Note you will need to login to the azure tenant and find the user to object the `object_id` for that user.

  > The client_id is the frontend's app registration client_id  
  
## Success
You should now be able to run the pipeline and have cypress succeed.