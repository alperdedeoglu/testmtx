FROM sapse/html5-app-deployer:4.2.4

# RUN sed -i -E 's/(CipherString\s*=\s*DEFAULT@SECLEVEL=)2/\11/' /etc/ssl/openssl.cnf && \
RUN mkdir -p /app && \ 
chown node.node /app

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .



EXPOSE 5000
CMD [ "npm", "start" ]