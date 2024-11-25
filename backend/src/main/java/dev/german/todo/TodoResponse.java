package dev.german.todo;

import java.time.LocalDateTime;

public record TodoResponse(
        Integer id,
        String email,
        Category category,
        Priority priority,
        String description,
        Boolean isCompleted,
        LocalDateTime createdAt
) {
}
