package dev.german.todo;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final TodoResponseMapper todoResponseMapper;

    public TodoService(TodoRepository todoRepository, TodoResponseMapper todoResponseMapper) {
        this.todoRepository = todoRepository;
        this.todoResponseMapper = todoResponseMapper;
    }

    public TodoResponse createTodo(TodoRegistrationRequest request) {
        Todo todo = Todo.builder()
                .email(request.email())
                .category(request.category())
                .priority(request.priority())
                .description(request.description())
                .isCompleted(false)
                .createdAt(LocalDateTime.now())
                .build();

        Todo todoCreated = todoRepository.save(todo);

        return todoResponseMapper.todoToTodoResponse(todoCreated);


    }

    public List<TodoResponse> getTodosByEmail(String email) {
        return todoRepository.findByEmail(email)
                .stream()
                .map(todoResponseMapper::todoToTodoResponse)
                .collect(Collectors.toList());
    }

    public void updateTodo(TodoUpdateRequest todoUpdateRequest, Integer id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Todo not found"));

        if(todoUpdateRequest.category() != null &&
                !todoUpdateRequest.category().equals(todo.getCategory())){
            todo.setCategory(todoUpdateRequest.category());
        }

        if(todoUpdateRequest.priority() != null &&
                !todoUpdateRequest.priority().equals(todo.getPriority())){
            todo.setPriority(todoUpdateRequest.priority());
        }

        if(todoUpdateRequest.description() != null &&
                !todoUpdateRequest.description().equals(todo.getDescription())){
            todo.setDescription(todoUpdateRequest.description());
        }

        if(todoUpdateRequest.isCompleted() != null &&
                !todoUpdateRequest.isCompleted().equals(todo.getIsCompleted())){
            todo.setIsCompleted(todoUpdateRequest.isCompleted());
        }

        todoRepository.save(todo);
    }

    public void deleteTodo(Integer id) {
        if(todoRepository.existsById(id)){
            todoRepository.deleteById(id);
        }
    }
}
