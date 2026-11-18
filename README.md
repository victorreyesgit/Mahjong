# Mahjong

Mahjong solitario pensado para que sea facil de usar en el movil: fichas grandes, pista, mezclar y niveles que suben poco a poco.

## Publicar en GitHub Pages
1. Sube todos estos archivos a la raiz de un repositorio de GitHub.
2. Settings -> Pages -> Source: "Deploy from a branch" -> branch `main` y carpeta `/ (root)`.
3. Abre la direccion que te da GitHub (https://TU_USUARIO.github.io/NOMBRE_DEL_REPOSITORIO/).
4. En el movil: menu del navegador -> "Anadir a pantalla de inicio".

## Si cambias el juego
Sube el numero de `VERSION` en `service-worker.js` (por ejemplo `vr-mahjong-v4`) para que los moviles carguen la version nueva.

## Personalizar
- En `script.js`, al principio, puedes cambiar `NOMBRE` (sale en los mensajes de felicitacion), `FAVORITOS` (emoticonos que siempre salen en el tablero) y `DESCANSO_MIN` (cada cuantos minutos se le sugiere descansar).
- `FICHAS` puede ser `"emoji"` (dibujos: sol, luna, barco, cerveza...) o `"chino"` (puntos tipo domino y simbolos chinos). Tambien se puede probar abriendo el juego con `?fichas=chino` al final de la direccion.
- Si subes una foto llamada `fondo.jpg` a la raiz del repositorio, se usa de fondo del juego.

App ID: `/vr-mahjong` (manifest id, never change it)
