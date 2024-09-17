# Use an official PHP image as a base
FROM php:8.1-apache

# Install necessary PHP extensions
RUN a2enmod rewrite
RUN docker-php-ext-install mysqli

# Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
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
