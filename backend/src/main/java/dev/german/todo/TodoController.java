package dev.german.todo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@Slf4j
@RestController
@RequestMapping("/api/v1/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoResponse> getTodosByEmail(@RequestParam String email) {
        log.info("Getting todos for email {}", email);
        return todoService.getTodosByEmail(email);
    }

    @PostMapping
    public ResponseEntity<TodoResponse> registerTodo(@RequestBody TodoRegistrationRequest todoRegistrationRequest) {
        log.info("Registering todo {}", todoRegistrationRequest);
        TodoResponse todoCreated = todoService.createTodo(todoRegistrationRequest);
        return ResponseEntity.status(CREATED).body(todoCreated);
    }

    @PutMapping("{id}")
    public void updateTodo(@RequestBody TodoUpdateRequest todoUpdateRequest, @PathVariable Integer id) {
        log.info("Updating todo {}", todoUpdateRequest);
        todoService.updateTodo(todoUpdateRequest, id);
    }

    @DeleteMapping("{id}")
    public void deleteTodo(@PathVariable Integer id) {
        log.info("Deleting todo {}", id);
        todoService.deleteTodo(id);
    }
}
