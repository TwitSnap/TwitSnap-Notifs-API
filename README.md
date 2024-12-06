# Servicio De notificaciones para la app TwitSnap

Para empezar a correr esta api se necesitara tener docker instalado en su maquina. Para correr el proyecto ejecutar el comando:
` docker-compose up -d --build` y dirigirse a [Api-docs](http://localhost:5000/api-docs).

## Environment variables
- PORT= Puerto donde escucha solicitudes HTTP

- EMAIL_SERVICE= Servicio de correo
- EMAIL_USER= Correo de la cuenta de correo
- EMAIL_PASSWORD= Contraseña de la cuenta de correo

- RESET_PASSWORD_URL= URL para resetear la contraseña que luego se insertara en el mail a enviar
- FIREBASE_JSON_PATH= Path del archivo json de firebase auth

## Endpoints
- **POST /v1/eventNotification**:
1. **Funcion**: Envia una notificacion a los usuarios que se encuentran en el body.
2. **Body push notification**:
```json
{
    "type": "push",
    "params": {
        "title": "notificacion Push random",
        "body": "body de la notif."
    },
    "notifications": {
      "type": "push",
      "destinations": [
        "fePmwmSsRiaJ_Sn-cD8AEh:APA91bHnnofO7HCK2Qqf9Jiy0ddRnouGj7y12uIXeJz7rDLEVoNrt_YaYav5SXrVB2RCbsjRmNaU8CCeuI5hx6lh5rSjA-Hg8yXzfM07fM81dzaGh7I7xeo"
      ]
    }
}
```
3. **Reset password notification**:
```json
{
    "type": "reset-password",
    "params": {
        "token": "token"
    },
    "notifications": {
        "type": "email",
        "destinations": ["hola@gmail.com", "hola1@gmail.com"],
        "sender": "grupo8memo2@gmail.com"
    }
}
```
4. **Verify account notification**:
```json
{
    "type": "reset-password",
    "params": {
        "token": "token"
    },
    "notifications": {
        "type": "email",
        "destinations": ["hola@gmail.com", "hola1@gmail.com"],
        "sender": "grupo8memo2@gmail.com"
    }
}
```