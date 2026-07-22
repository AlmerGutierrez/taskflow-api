# TaskFlow API

API REST CRUD de tareas construida con Node.js y Express.
Proyecto desarrollado aplicando **Git Flow** para la Tarea 3 de Programación III.

## Ramas
- `main`: producción
- `develop`: integración
- `qa`: control de calidad
- `feature/*` y `hotfix/*`: ramas de trabajo (ver historial de PRs cerrados)

## Endpoints
- `GET    /tasks`        lista tareas (soporta ?completed=true|false y ?search=texto)
- `GET    /tasks/:id`    obtiene una tarea
- `POST   /tasks`        crea una tarea `{ "title": "..." }`
- `PUT    /tasks/:id`    actualiza una tarea
- `DELETE /tasks/:id`    elimina una tarea

## Instalación
\`\`\`bash
npm install
npm start
\`\`\`
