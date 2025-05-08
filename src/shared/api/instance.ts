import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { CONFIG } from "@/shared/model/config";
import type { ApiPaths } from "./schema";

// Создание клиента для выполнения HTTP-запросов с использованием библиотеки `openapi-fetch`.
// `ApiPaths` - это тип, который генерируется на основе OpenAPI спецификации, и он определяет доступные пути и их параметры.
export const fetchClient = createFetchClient<ApiPaths>({
  // Устанавливаем базовый URL для всех запросов. Это значение извлекается из конфигурации (например, из `.env`).
  baseUrl: CONFIG.API_BASE_URL,
});

// Создание клиента для работы с React Query, используя вышеупомянутый `fetchClient`.
// `createClient` создает клиент, который будет работать с запросами через OpenAPI и React Query,
// предоставляя типизированные запросы для разных API-путей, описанных в OpenAPI.
export const rqClient = createClient(fetchClient);
