<p align="center">
  <a href="https://www.planck.biz/" target="blank"><img src="https://play-lh.googleusercontent.com/d__eJWphVBKSH5WvOumfF7GrEnn0MkIshq0CbCAhezMKHsk0-Qnf4HuQ6aPYcEPD8GQ=w480-h960-rw" width="200" alt="Planck Logo" /></a>
</p>

# James Server Lili

### [Demo Play Store](https://play.google.com/store/apps/details?id=com.ivc.lili)

1. Instalar PM2
  ```
  sudo npm install pm2 -g
  ```

2. Instalar NestJS
  > npm i -g @nestjs/cli

3. Instalar las dependencias
  > npm install

4. Levantar la base de datos
  ```
  docker-compose up -d
  ```

3. Compilar el source
  > npm run build

4. Ejecutar el main
  ```
  pm2 start dist/main.js --name JAMES
  ```

##### [Powered by Juan Pablo Guamán Rodríguez (Planck)](https://www.planck.biz/)