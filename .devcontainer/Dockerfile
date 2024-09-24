# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=20
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:1-${VARIANT}

RUN wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add - \
    && echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends cf8-cli

# [Optional] Uncommenaptt if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
RUN su node -c "npm install -g nx @sap/cds-dk @sap/eslint-plugin-cds"

RUN curl -LJO https://tools.hana.ondemand.com/additional/btp-cli-linux-amd64-latest.tar.gz --cookie "eula_3_2_agreed=tools.hana.ondemand.com/developer-license-3_2.txt" \
    && tar -xzf btp-cli-linux-amd64-latest.tar.gz \
    && rm btp-cli-linux-amd64-latest.tar.gz \
    && mv linux-amd64/btp /usr/local/bin/