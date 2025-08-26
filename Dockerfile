FROM alpine

RUN apk add nodejs
RUN adduser --disabled-password user 
RUN echo user:user | chpasswd

USER user
WORKDIR /home/user/
COPY . .

CMD node main $(cat ns-secret.txt) $(cat ig-secret.txt)