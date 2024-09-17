# Use an official PHP image as a base
FROM php:8.1-apache

# Install necessary PHP extensions
RUN a2enmod rewrite
RUN docker-php-ext-install mysqli

# Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

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
