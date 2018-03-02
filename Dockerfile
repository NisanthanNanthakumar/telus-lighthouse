
FROM node:8

# Install utilities
RUN apt-get update --fix-missing && apt-get -y upgrade

# Install latest chrome dev package.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

# Create app directory and install app dependencies.
# VOLUME "$PWD":/usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Add a chrome user
RUN groupadd -r chrome && useradd -r -m -g chrome -G audio,video chrome && \
    chown -R chrome:chrome /usr/src/app

USER chrome

EXPOSE 8080

CMD [ "npm", "start" ]
