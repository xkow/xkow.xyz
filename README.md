# REMINDER TIL SELV
1. Fjern image + container i portainer
2. Åben terminal i directory
3. Opret dockerfile med følgende kode:
   FROM nginx:latest
   COPY . /usr/share/nginx/html
5. docker build . -t xkowxyz-frontpage
6. docker container run -d -p 9696:80 --name xkowxy-frontpage xkowxyz-frontpage
7. docker image ls
