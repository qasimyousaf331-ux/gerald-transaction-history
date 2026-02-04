# Transactions Feature

This feature implements the transaction history functionality following **Feature-Driven Design** principles.

## Architecture

### Feature-Driven Design (FDD)
This feature is self-contained with all related code organized together by functionality rather than technical layers. Each feature exports a public API through its `index.ts`, hiding implementation details.

### Structure

```
transactions/
├── components/          # UI components
│   ├── TransactionItem.tsx
│   ├── FilterButtons.tsx
│   ├── SearchBar.tsx
│   └── TransactionListScreen.tsx (main screen)
├── hooks/              # Business logic
│   ├── useTransactions.ts
│   └── useDebounce.ts
├── types/              # TypeScript definitions
│   └── index.ts
├── utils/              # Helper functions
│   └── index.ts
├── data/               # Mock data
│   └── index.ts
└── index.ts            # Public API
```

### Public API (`index.ts`)

The feature exposes only what's needed by external consumers:

- **Screen**: `TransactionListScreen` - Main entry point
- **Types**: `Transaction`, `TransactionType`, `TransactionFilter`
- **Hook**: `useTransactions` - For feature composition
- **Components**: Individual UI components (if reusable)

### Usage

```tsx
// Import only from the feature root
import { TransactionListScreen } from './features/transactions';

// Never import from internal paths
// ❌ import { useTransactions } from './features/transactions/hooks/useTransactions';
```

## Benefits of This Pattern

### 1. **Encapsulation**
- Implementation details are hidden
- Only public API is accessible
- Easy to refactor internals without affecting consumers

### 2. **Scalability**
- Add new features without affecting existing ones
- Clear feature boundaries
- Easy to understand codebase structure

### 3. **Reusability**
- Features can be extracted into packages
- Easy to share between projects
- Clear dependencies

### 4. **Maintainability**
- All related code in one place
- Easy to locate and modify feature code
- Reduced cognitive load

### 5. **Team Collaboration**
- Features can be owned by different teams
- Reduced merge conflicts
- Clear ownership boundaries

## Adding New Features

When adding a new feature (e.g., `budgets`):

```
src/features/budgets/
├── components/
├── hooks/
├── types/
├── utils/
├── data/
└── index.ts  # Public API
```

Features can depend on each other through public APIs:

```tsx
// budgets feature can import from transactions
import { Transaction } from '../transactions';
```

## Testing

Tests should also follow the feature structure:

```
__tests__/
└── features/
    └── transactions/
        ├── formatters.test.ts
        ├── useTransactions.test.ts
        └── TransactionItem.test.tsx
```

## Migration Notes

### Before (Technical Layers)
```
src/
├── components/     # All components mixed
├── hooks/          # All hooks mixed
├── screens/        # All screens mixed
├── types/          # All types mixed
└── utils/          # All utils mixed
```

### After (Feature-Driven)
```
src/features/
└── transactions/   # Everything transactions-related
    ├── components/
    ├── hooks/
    ├── types/
    ├── utils/
    ├── data/
    └── index.ts
```

## Future Enhancements

Potential feature expansions:
- `features/auth` - Authentication
- `features/budgets` - Budget tracking
- `features/insights` - Analytics and charts
- `features/receipts` - Receipt scanning
- `shared/` - Shared utilities across features
