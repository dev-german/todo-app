package dev.german.todo;

public record TodoUpdateRequest(
        String description,
        Priority priority,
        Category category,
        Boolean isCompleted
) {
}
