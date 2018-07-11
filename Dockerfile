FROM node:9
LABEL maintainer kuldeep <kuldeep.paltp@gmail.com>
# Set the work directory
WORKDIR /var/www/app

# Good to have stuff
COPY package.json /var/www/app
RUN npm install babel-cli -g
#ADD https://dl.yarnpkg.com/debian/pubkey.gpg /tmp/yarn-pubkey.gpg
# RUN echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# RUN apt-get update && apt-get install -qq -y --no-install-recommends \
#       build-essential libpq-dev curl

# Use Cache please
ADD . /var/www/app
RUN yarn install
CMD yarn test-server
# Add application files

# Expose the port
EXPOSE 8090