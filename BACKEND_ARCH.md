# Backend Architecture Blueprint: "The Being Coach" API

## Overview
This document outlines the architecture for the .NET Core 8 Web API that powers the "Being Coach" application. The system is designed to handle high-concurrency mental state tracking, coaching session logs, and identity management with a clean, domain-driven design approach.

## Tech Stack
*   **Framework:** .NET 8 (Core)
*   **Database:** PostgreSQL (Production) / SQL Server (Enterprise Option)
*   **ORM:** Entity Framework Core 8
*   **Auth:** JWT (JSON Web Tokens) with Refresh Tokens
*   **Caching:** Redis (for real-time "Being" state and leaderboards)
*   **Validation:** FluentValidation

## Project Structure (Clean Architecture)

```
src/
├── BeingCoach.Api            # Entry point, Controllers, Middleware
├── BeingCoach.Application    # DTOs, Interfaces, Services, CQRS Handlers
├── BeingCoach.Domain         # Entities, Value Objects, Domain Events
└── BeingCoach.Infrastructure # EF Core, Repositories, External Services
```

## Domain Models (Entity Framework Core)

### 1. User
Represents the trainee/coachee.
```csharp
public class User : BaseEntity {
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public ICollection<DailyLog> DailyLogs { get; set; }
    public UserSettings Settings { get; set; }
}
```

### 2. ActionArea (The "Azaria" Methodology Core)
Represents a category of practice (e.g., "Meditation", "Sales Calls", "Family Time").
```csharp
public class ActionArea : BaseEntity {
    public string Name { get; set; } // e.g., "Minutes of Meditation"
    public string Description { get; set; }
    public int SliderMin { get; set; } // e.g., 0
    public int SliderMax { get; set; } // e.g., 60
    public int SliderStep { get; set; } // e.g., 5
    public bool IsTarget { get; set; } // Is this a goal-setting area?
    public int Order { get; set; }
    public ICollection<SubArea> SubAreas { get; set; } // Specific tasks
}
```

### 3. DailyLog
Tracks the specific input for a day.
```csharp
public class DailyLog : BaseEntity {
    public Guid UserId { get; set; }
    public DateTime Date { get; set; }
    public string IdentityDeclared { get; set; } // e.g., "Energetic", "Focused"
    public ICollection<ActionEntry> Entries { get; set; }
}
```

### 4. ActionEntry
The actual value recorded for an area.
```csharp
public class ActionEntry : BaseEntity {
    public Guid DailyLogId { get; set; }
    public Guid ActionAreaId { get; set; }
    public int PlannedValue { get; set; } // Target set in morning
    public int ActualValue { get; set; }  // Actual achieved in evening
    public string ReflectionNotes { get; set; }
}
```

## API Endpoints

### Authentication
*   `POST /api/auth/login`: Returns JWT + Refresh Token.
*   `POST /api/auth/register`: Onboards new trainee.

### Dashboard & State ("Being")
*   `GET /api/dashboard/summary`: Aggregates current day's progress and streaks.
*   `GET /api/being/identity`: Gets the user's declared identity for the day.
*   `POST /api/being/identity`: Sets the "Being" state (e.g., "I am a Winner").

### Coaching Actions (The Methodology)
*   `GET /api/actions`: Returns the hierarchy of ActionAreas and SubAreas (cached).
*   `POST /api/actions/log`: Submits a value for a specific slider/area.
    *   *Request DTO:* `{ actionAreaId: Guid, value: int, type: 'Plan' | 'Actual' }`
*   `GET /api/actions/history`: Returns chart data for specific areas over time.

## Middleware Pipeline
1.  **Global Exception Handler:** Standardizes error responses (RFC 7807).
2.  **Rate Limiting:** Protects against abuse.
3.  **JwtMiddleware:** Validates tokens and injects `UserContext`.
4.  **LoggingMiddleware:** Serilog integration for tracing coaching sessions.

## Security
*   All IDs are UUIDs (Guids) to prevent enumeration.
*   Passwords hashed using Argon2.
*   CORS policies restricted to the React Frontend domain.
