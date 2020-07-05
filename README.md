# msg-webhook
**Bot Facebook**

# Ejecutar 
**npm run start**

# Prueba la aplicacion con cURL
## Metodo Post
    curl -H "Content-Type: application/json" -X POST "localhost:1337/webhook" -d {\"object\":\"page\",\"entry\":[{\"messaging\":[{\"message\":\"TEST_MESSAGE\"}]}]}

## Metodo GET 
    curl -X GET "localhost:1337/webhook?hub.verify_token=<YOUR_VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"