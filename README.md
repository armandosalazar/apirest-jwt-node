- En caso de que deseemos transpilar el código para entornos más antiguos, hay que utilizar `babel-node`:  
   `npm install --save-dev @babel/core @babel/node`
  > Sin embargo, a partir de la versión 13.2.0, Node.js tiene soporte estable de módulos ES.
  > https://blog.logrocket.com/commonjs-vs-es-modules-node-js/
- Analizar estos paquetes:  
  `@babel/cli @babel/preset-env`
- scripts:  
  `"start": "babel-node src/index.js"`  
  `"start": "nodemon src/index.js --exec babel-node"`
