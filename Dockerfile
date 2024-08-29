FROM node:lts

WORKDIR /workspace
RUN npm link dist/packages/hana2cds



