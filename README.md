# Walmart challenge backend

Aplicación de node - Typescript para funcionar como API conectado a MongoDB.

# Configuraciones

Para poder ejecutar correctamente el Backend de manera local es necesario un archivo .env que contenga:
- NODE_ENV=development
- PORT=3001
- DB_URI=mongodb://localhost:27017/promotions
- DB_USER=productListUser
- DB_PASS=productListPassword

# Comandos

Antes de comenzar se necesita isntalar node_modules, para ello usar `npm install`
Para ejecutar el API con nodemon usar `npm run dev`
Para ejecutar el API con node usar `npm start`
Para ejecutar los test unitarios del API usar `npm run test`
Para revisar lint usar `npm run lint`
Si se desea saber más revisar *package.json*