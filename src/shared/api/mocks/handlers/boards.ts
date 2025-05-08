import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

// Массив "моков" досок, который будет использоваться как in-memory база данных
const boards: ApiSchemas["Board"][] = [
  {
    id: "board-1",
    name: "Marketing Campaign",
  },
  {
    id: "board-2",
    name: "Product Roadmap",
  },
];

// Экспортируем массив обработчиков (handlers) для Mock Service Worker
export const boardsHandlers = [
  // Обработчик GET-запроса на "/boards"
  // Возвращает текущий список досок из массива `boards`
  http.get("/boards", () => {
    return HttpResponse.json(boards);
  }),

  // Обработчик POST-запроса на "/boards"
  // Получает новое имя доски из тела запроса, генерирует случайный ID,
  // добавляет доску в массив `boards` и возвращает её
  http.post("/boards", async (ctx) => {
    const data = await ctx.request.json();
    const board = {
      id: crypto.randomUUID(), // генерация уникального ID
      name: data.name,
    };
    boards.push(board); // добавление в массив
    return HttpResponse.json(board);
  }),

  // Обработчик DELETE-запроса на "/boards/:boardId"
  // Удаляет доску с указанным ID, если она существует
  http.delete("/boards/{boardId}", ({ params }) => {
    const { boardId } = params;

    const index = boards.findIndex((board) => board.id === boardId);
    if (index === -1) {
      // Если доска не найдена — вернуть 404
      return HttpResponse.json(
        { message: "Board not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    // Удаление доски из массива
    boards.splice(index, 1);

    // Возврат успешного ответа со статусом 204 (без тела)
    return HttpResponse.json(
      { message: "Board deleted successfully", code: "OK" },
      { status: 204 },
    );
  }),
];