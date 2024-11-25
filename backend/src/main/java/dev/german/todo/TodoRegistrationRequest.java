package dev.german.todo;

public record TodoRegistrationRequest(
    String email,
    Category category,
    Priority priority,
    String description
) {
}
