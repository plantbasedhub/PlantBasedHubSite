# Dockerfile
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Servir o aplicativo
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expor a porta usada pelo frontend
EXPOSE 3000
