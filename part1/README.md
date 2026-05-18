# Parte 1: Fundamentos de React

Ejercicios correspondientes a la [Parte 1](https://fullstackopen.com/es/part1) del curso Full Stack Open.

## Objetivo

Fortalecer la comprensión de los fundamentos de React: componentes, props, estado (hooks) y el flujo de datos en aplicaciones modernas.

---

## Ejercicios

### [courseinfo](./courseinfo/)
**Ejercicios 1.1 – 1.5**

Aplicación que muestra información de un curso con sus partes y número de ejercicios.

- Refactorización progresiva en componentes (`Header`, `Content`, `Part`, `Total`)
- Paso de datos mediante props
- Evolución de variables sueltas → objetos → arrays → objeto único `course`

---

### [unicafe](./unicafe/)
**Ejercicios 1.6 – 1.11**

Aplicación de feedback para la cafetería universitaria Unicafe.

- Manejo de estado con `useState`
- Cálculo de estadísticas: promedio, porcentaje positivo
- Componentes `Statistics`, `StatisticLine` y `Button`
- Renderizado condicional (no mostrar stats si no hay feedback)
- Presentación de estadísticas en tabla HTML

---

### [anecdotes](./anecdotes/)
**Ejercicios 1.12 – 1.14**

Aplicación que muestra anécdotas aleatorias de ingeniería de software con sistema de votación.

- Generación de índice aleatorio
- Votación por anécdota usando arrays de estado
- Detección y muestra de la anécdota más votada

---

## Lo aprendido

Trabajar con esta parte me permitió entender cómo React estructura las interfaces en componentes reutilizables y cómo el estado (`useState`) hace que la UI reaccione a las interacciones del usuario. El mayor desafío fue interiorizar que el estado no se muta directamente, sino que siempre se reemplaza con un nuevo valor, especialmente al trabajar con arrays.

También fue clave entender el flujo unidireccional de datos: el componente padre gestiona el estado y lo pasa hacia abajo mediante props, mientras que los hijos comunican eventos hacia arriba mediante funciones.

---

## Desafíos técnicos superados

- Entender por qué `useState` es asíncrono y cómo eso afecta cálculos inmediatos tras una actualización
- Manejar correctamente arrays en el estado sin mutarlos (uso de spread `[...arr]`)
- Organizar la lógica en componentes pequeños y bien definidos