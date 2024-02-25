# CardNames

## Nginx

```shell
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate         /etc/letsencrypt/live/paxa.dev/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/paxa.dev/privkey.pem;

    server_name paxa.dev;
    root /var/www/paxa.dev/apps/site/dist;
    
    include conf.d/cache.conf;
    include conf.d/paxa-errors.conf;
    include conf.d/vite.conf;
}
``` 