# REMINDER TIL SELV
1. Fjern image + container i portainer
2. Åben terminal i directory
5. docker build . -t xkowxyz-frontpage
6. docker container run -d -p 9696:80 --name xkowxy-frontpage xkowxyz-frontpage
7. docker image ls
## Opret dockerfile med følgende kode:
1. FROM nginx:latest
2. COPY . /usr/share/nginx/html
