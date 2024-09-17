# Use an official PHP image as a base
FROM php:8.1-apache

RUN a2enmod rewrite

RUN docker-php-ext-install mysqli


# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the backend directory to /var/www/html
COPY . /var/www/html

# Optionally, you can set file permissions if needed
# RUN chown -R www-data:www-data /var/www/html

# Expose port 80 to access the Apache server
EXPOSE 80
