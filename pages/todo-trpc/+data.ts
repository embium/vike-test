// https://vike.dev/data
import prisma from '../../utils/db';

export default async function data() {
  const todoItemsInitial = await prisma.todo.findMany({});
  return todoItemsInitial;
}
