# Use an official PHP image as a base
FROM php:8.3-apache

# Install necessary PHP extensions
RUN a2enmod rewrite
RUN docker-php-ext-install mysqli

COPY php.ini /usr/local/etc/php/

RUN apt-get update && apt-get install -y git libzip-dev unzip && \
    docker-php-ext-install zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the composer files
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install

# Copy the rest of the application code
COPY . /var/www/html

# Expose port 80 to access the Apache server
EXPOSE 80
