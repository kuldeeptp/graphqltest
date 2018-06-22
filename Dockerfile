FROM node:9
LABEL maintainer kuldeep <kuldeep.paltp@gmail.com>
# Set the work directory
WORKDIR /var/www/app

# Good to have stuff
RUN npm install pm2 -g
RUN npm install babel-cli -g
#ADD https://dl.yarnpkg.com/debian/pubkey.gpg /tmp/yarn-pubkey.gpg
# RUN echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# RUN apt-get update && apt-get install -qq -y --no-install-recommends \
#       build-essential libpq-dev curl

# RUN apt-get update && apt-get install -y nano 
# Use Cache please
ADD . /var/www/app
RUN yarn install
RUN yarn test-server
# Add application files

# Expose the port
EXPOSE 5000:5000