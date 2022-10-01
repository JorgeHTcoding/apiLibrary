Breve guía de descarga y conexión para la prueba de nivel de Jorge Holgado Torres.

1º. Clonar los dos repositorios de gitHub de las siguientes direcciones:

App Angular - https://github.com/JorgeHTcoding/angularLibrary

API - https://github.com/JorgeHTcoding/apiLibrary

Han sido divididas para mayor claridad a la hora de trabajar.

2º Guardar ambos clones en la misma carpeta. 3º Ejecutar Visual Studio Code (preferiblemente ya que se desarrolló en el mismo pero puede usarse cualquier editor de código) y abrir la carpeta raiz donde están los dos archivos descargados. 5º Abril terminal integrado en: /apiLibrary/src/apiRest.js (botón derecho y abrir terminal integrado en VS Code) y ejecutar el comando node apiRest.js (Esto nos ejecutara la API para la comunicación con el servidor) 4º Abril terminal integrado en: /angularLibrary/src/app (botón derecho y abrir terminal integrado en VS Code) y ejecutar el comando ng serve --open (Esto nos ejecutara la app de angular en nuestro explorador)

La app está lista para desplegar en heroku pero debido a unos problemas con la política de origen cruzado de CORS no ha sido posible un despliegue efectivo con respecto a la comunicación con el servidor y sigo investigando para solucionarlo.

Muchas gracias por la oportunidad y el tiempo dedicado.
