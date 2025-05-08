import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";
import { boardsHandlers } from "./handlers/boards";

// Инициализация Mock Service Worker (MSW) на стороне клиента (в браузере).
// `setupWorker` создает сервис-воркер, который будет перехватывать сетевые запросы (fetch/xhr)
// и возвращать мок-ответы, определённые в массиве `handlers``.
export const worker = setupWorker(...authHandlers, ...boardsHandlers);