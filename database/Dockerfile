FROM mongo

RUN mkdir -p /database
WORKDIR /database
COPY . .
RUN cat import.sh | tr -d '\r' > import.fixed.sh && mv -v  import.fixed.sh import.sh
CMD [ "bash", "/database/import.sh", "database" ]