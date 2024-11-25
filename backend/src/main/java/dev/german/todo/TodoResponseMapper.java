package dev.german.todo;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TodoResponseMapper {

    TodoResponse todoToTodoResponse(Todo todo);

    Todo todoResponseToTodo(TodoResponse todoResponse);
}
