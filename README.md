<div align="center">

<img src="./icon-192.png" alt="Emblema de Loss Reckon Services" width="86" height="86">

# LRS Tech Hub

**Centro de operaciones de campo del Departamento Técnico de Loss Reckon Services**

[**Abrir LRS Tech Hub**](https://lrsbyor.github.io/LRS-hub/) · **PWA** · **ES / EN** · **Claro / Oscuro** · **Local-first**

[**POWERED BY OPTIMUS REFRAME**](https://www.optimusreframe.com/)

</div>

---

## Qué es

**LRS Tech Hub** reúne en un solo lugar la guía de campo, las herramientas de reporte, el registro de trabajos y la preparación de facturas del equipo técnico de LRS. Está pensado para técnicos principales (**TP**) y auxiliares (**TA**) que usan su propio teléfono o computadora.

El flujo empieza en **Inicio**. Desde ahí puedes aprender un procedimiento, abrir una herramienta de campo, preparar un reporte, registrar el trabajo o armar una factura. No tienes que empezar siempre por el mismo módulo ni volver a escribir los datos de un trabajo que ya registraste en el Hub.

## Módulos

| Módulo | Qué hace |
| :--- | :--- |
| **Inicio** | Muestra el saludo con tu nombre, la fecha y la hora del dispositivo, y una tarjeta de clima con ciudad, condiciones, temperatura y humedad. Diez accesos directos en dos columnas. |
| **Wiki** | Guía ilustrada de Xactimate, códigos y actividades, correo a Monitoring y hoja de trabajo. Incluye ejemplos y capturas en orden, desde crear el proyecto hasta revisar el envío. |
| **Xactimate** | Abre las opciones oficiales de acceso a Xactimate. El Hub también genera nombres para copiar, como `MTK_NOMBRECLIENTE` y `MTW_NOMBRECLIENTE`; no crea ni carga proyectos dentro de Xactimate. |
| **Correo** | Genera la ficha de Monitoring con actividad, caso, técnico, fechas, código y notas. Prepara un borrador para revisar, adjuntar la captura de **Local** y enviar desde tu correo. |
| **Jotform** | Abre la hoja de trabajo oficial para registrar cuadrilla, zonas, equipos, materiales y plan de trabajo. Se completa por separado del correo. |
| **Pagos / Calculadora** | Consulta las tarifas por actividad, caso, rol y tipo de pago. Permite armar una selección con varios trabajos, completar datos y estimar cuánto corresponde antes de llevarlos a Factura. |
| **Factura** | Empieza con lo confirmado en Calculadora o agrega conceptos directamente desde el tabulador o de forma manual. Permite validar, previsualizar y generar el PDF, además de consultar facturas guardadas en el dispositivo. |
| **Calendario** | Calendario interno para trabajos registrados desde Correo o Factura. Vistas de día, semana, mes y año, filtros y ficha de cada trabajo. No sincroniza con Apple Calendar ni Google Calendar. |
| **Insta360 / Matterport** | Accesos oficiales a las herramientas de captura. El destino depende del dispositivo: web o tienda de aplicaciones. El Hub no controla las cámaras ni inicia una captura. |
| **Ajustes** | Perfil local (nombre, apellido, teléfono, correo y nombre opcional del dispositivo), idioma, apariencia, duración del periodo de factura, personalización y copias de seguridad. |

En móvil, la barra inferior se oculta en Inicio. En los demás módulos da acceso a **Inicio, Wiki, Correo, Factura y Calendario**, además del menú lateral. En escritorio se usa una barra lateral organizada por secciones.

## Cómo funciona el flujo de trabajo

### 1. Documentar y reportar

1. Crea **un proyecto por caso**, no por cliente. Si una persona tiene un caso de Kitchen y otro de Wind Damage, crea dos proyectos y prepara **un correo por caso**.
2. Organiza las fotos por área en Xactimate. Guarda el proyecto, captura el nombre exacto que aparece en **Local** (incluido cualquier sufijo) y verifica la carga a la nube desde Xactimate.
3. En **Correo**, completa la ficha. Para lona, elige **TARP** como actividad y **DETACH**, **RESET**, **ADJUSTMENT**, **REMOVE** o **REPLACEMENT** como caso. El tipo de daño y el alcance con o sin equipos se indican por separado. Usa **NOTAS** para señalar qué falta completar en el Pickup.
4. Revisa el borrador, adjunta la captura y envíalo desde tu correo **dentro de las 24 horas siguientes a la finalización del trabajo**. Completa también la hoja de trabajo en Jotform.

### 2. Registrar una vez y reutilizar los datos

Al generar la ficha, **Tu nombre** permite asociar el trabajo contigo según la cuadrilla seleccionada. Si apareces en más de un rol, el Hub pide confirmación. Con **Agregar a Calendario y Factura** puedes reutilizar cliente, actividad, caso, fecha y rol. Esta acción **no envía el correo ni confirma un pago**.

Calendario y Factura comparten el mismo registro local. Un duplicado exacto no se agrega otra vez; si dos registros se parecen pero difieren en una fecha u otro dato, el Hub pide confirmar si se trata de un trabajo distinto o de una actualización.

### 3. Calcular y emitir

- **Pagos estima; Factura documenta.** El tabulador es una referencia. No calcula pagos aprobados ni reemplaza la revisión del Departamento Técnico.
- Los **Pickups** aparecen como trabajos independientes y usan su tarifa fija del tabulador cuando existe. El sistema no inventa un monto si falta la tarifa.
- Los trabajos **FIRE** admiten fecha de inicio y fin, extras por cantidad de zonas **DEMO+CLEAN** y **SOLO CLEAN**, y horas de viaje cuando corresponden. Las jornadas por hora no descuentan descansos pagados; los viajes pueden tener otra tarifa.
- Factura permite documentar un día o un periodo. El correlativo automático empieza en **0001** y admite numeración manual. La vista previa no consume un número.
- El PDF es **Carta vertical**, de fondo blanco, con **inglés** como idioma predeterminado y salida opcional en español. Omite los campos opcionales vacíos y no impone el logo de LRS. El técnico puede usar su propia marca. El Hub no envía el PDF ni ejecuta pagos.

## Arquitectura y conectividad

| Capa | Comportamiento |
| :--- | :--- |
| **Aplicación web** | HTML, CSS y JavaScript del lado del cliente. Las vistas comparten estado sin depender de un servidor propio para guardar borradores, trabajos o facturas. |
| **Navegación** | Rutas con hash, por ejemplo `#home`, `#inicio` (Wiki), `#correo-ficha`, `#pagos`, `#factura`, `#calendario` y `#ajustes`. |
| **PWA** | Un manifiesto define los iconos, el alcance y la ventana independiente. En HTTPS, el service worker guarda los archivos base para volver a abrir el Hub sin conexión después de una primera carga exitosa. |
| **Almacenamiento local** | Las facturas, trabajos, perfil e historial se guardan en IndexedDB, con respaldo en localStorage si IndexedDB no está disponible. El PDF se genera en el dispositivo. No hay una base de datos compartida entre técnicos. |
| **Tarifas y técnicos** | El Hub consulta los orígenes que alimentan [Dashboard LRS](https://lrsbyor.github.io/Dashboard-LRS/). Consulta tarifas y la lista de nombres que usa el selector, sin enviarle datos de tus trabajos o facturas. Si falla la conexión, mantiene la última copia válida disponible; el indicador de conexión muestra cuándo se actualizó. |
| **Clima** | Inicio pide permiso del navegador para usar ubicación aproximada. La búsqueda manual de ciudades de EE. UU. funciona en el dispositivo con el [Gazetteer del Censo de EE. UU.](https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.2026.html). Solo se consulta una coordenada aproximada o el centro de la ciudad elegida con el [Servicio Meteorológico Nacional de EE. UU.](https://www.weather.gov/documentation/services-web-api). No se guarda la coordenada GPS original ni se comparte el perfil con el proveedor. |
| **Servicios externos** | Xactimate, Jotform, correo, Insta360 y Matterport operan fuera del Hub. Están sujetos a sus propios permisos, conexión y disponibilidad. |

### Privacidad y copias de seguridad

- **Local no significa sincronizado.** El almacenamiento depende del dispositivo, del navegador y de la dirección de la aplicación. No des por hecho que Safari y la PWA instalada comparten el mismo historial, aunque estén en el mismo iPhone.
- Desde **Ajustes**, puedes exportar un archivo **JSON** e importarlo en el dispositivo de destino. El Hub puede crear puntos de restauración al volver a usarlo después de cinco días; **no descarga respaldos mientras está cerrado**.
- Restaurar un archivo reemplaza los datos locales que abarca la copia. Exporta primero el estado actual si necesitas conservarlo. Los respaldos pueden contener datos de trabajo y deben mantenerse en un lugar privado.
- Sin conexión puedes trabajar con lo que ya está guardado. El clima en vivo, la actualización de tarifas y el envío de reportes requieren conexión.

## Evolución del producto

Estos son los hitos funcionales del Hub, no números de versión de GitHub ni etiquetas de publicación.

| Etapa | Qué se incorporó |
| :--- | :--- |
| **Guía técnica** | Flujo ilustrado para crear proyectos en Xactimate, tomar la captura, enviar el reporte y completar la hoja de trabajo. |
| **Guía interactiva** | Generadores de nombres y fichas, navegación móvil, modo claro/oscuro e interfaz bilingüe. |
| **Operaciones y facturación** | Tabulador, calculadora, PDF local, historial, respaldos y Calendario interno conectado a Correo y Factura. |
| **Mejoras de campo** | Selectores de actividad, caso y rol separados; TARP agrupado por operación en Correo; mejoras de contraste y mensajes que indican qué impide avanzar. |
| **Inicio operativo** | Inicio de diez accesos, fecha y hora, clima, saludo según perfil, módulos en pantallas propias y emblema vigente de LRS en el control de scroll. |

**Nota operativa:** las estimaciones del Hub no son una aprobación de nómina, una constancia de recepción del correo ni una confirmación de pago. Verifica siempre los datos, los adjuntos y las tarifas aplicables antes de enviar.

---

<div align="center">

**LOSS RECKON SERVICES · DEPARTAMENTO TÉCNICO**

<a href="https://www.optimusreframe.com/"><strong>POWERED BY OPTIMUS REFRAME</strong></a>

</div>
