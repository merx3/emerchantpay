FROM php:7.4-apache

RUN apt-get update \
     && DEBIAN_FRONTEND=noninteractive apt-get install -y ssl-cert \
     && rm -r /var/lib/apt/lists/* \
     && docker-php-ext-install mysqli pdo pdo_mysql \
     && docker-php-ext-enable pdo_mysql

RUN a2enmod ssl \
 && a2enmod rewrite \
 && a2ensite default-ssl
