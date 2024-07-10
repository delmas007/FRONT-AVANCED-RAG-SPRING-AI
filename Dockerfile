FROM node:20.15.1-alpine3.20
LABEL maintainer="angamancedrick@gmail.com"

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port 4200
EXPOSE 4200

# Commande pour démarrer l'application Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
