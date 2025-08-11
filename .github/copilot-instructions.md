# Student Association Management System (Centrale UCL)

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information in these instructions is incomplete or found to be in error.**

This repository contains the design and future implementation of a comprehensive management tool for the Centrale UCL student association (150 members). The system aims to centralize member management, event organization, communication, accounting, and administrative tasks.

## Current Project State

- **Phase**: Design and planning stage
- **Current Content**: Only contains `instruction.pdf` (French) with comprehensive requirements and architecture specifications
- **Code Status**: No implementation code exists yet - this is a greenfield project
- **Language**: Requirements document is in French, implementation language TBD

## Working Effectively

### Initial Setup and Understanding
- **ALWAYS start by reading the requirements**: Extract text from PDF with `pdftotext instruction.pdf instruction.txt` and review the complete requirements
- **Install PDF tools if needed**: `sudo apt update && sudo apt install -y poppler-utils`
- The PDF contains detailed specifications for 12 major modules:
  1. Member Management and CRM
  2. Role-Based Access Control (RBAC)
  3. Event Management and Ticketing
  4. Internal/External Communication
  5. Accounting and Financial Management
  6. Subscription/Donation Collection
  7. Online Shop
  8. Document Management
  9. Administrative/Logistics Management
  10. Analytics and Reporting
  11. Security and GDPR Compliance
  12. External Integrations

### Technology Stack Recommendations (from requirements analysis)
Based on the PDF specifications, implement using:

**Backend Framework Options**:
- Django (Python) - Recommended for rapid development and built-in admin
- Laravel (PHP) - Good for traditional web applications
- Node.js/Express - For JavaScript-based development

**Database**: 
- PostgreSQL (explicitly mentioned in requirements)

**Authentication/Authorization**:
- Keycloak (recommended in PDF) - Full-featured identity management
- Casbin (mentioned in PDF) - Policy-based access control
- Custom RBAC implementation

**Frontend Framework Options**:
- React - Modern, component-based UI
- Vue.js - Progressive framework, good for gradual adoption

**Integration Requirements**:
- Stripe API for payments (mentioned in PDF)
- HelloAsso API for donations (French non-profit payment platform)
- Email services (SMTP)
- Calendar synchronization (Google Calendar, Outlook)
- Communication tools (Slack, Zoom integration)

## Development Guidelines

### Project Structure (when code is added)
```
/
├── instruction.pdf          # Requirements document (French)
├── instruction.txt          # Extracted requirements text
├── backend/                 # API and business logic
├── frontend/                # User interface
├── database/               # Schema and migrations
├── docs/                   # Additional documentation
├── tests/                  # Test suites
└── deployment/             # Infrastructure and deployment configs
```

### Before Starting Development
1. **Read all requirements thoroughly**: The PDF contains detailed functional specifications
2. **Create data model**: Design database schema for Members, Roles, Groups, Events, Transactions, Documents
3. **Design API contracts**: RESTful endpoints for all modules
4. **Plan authentication**: Implement RBAC with hierarchical roles (President > Vice-President > Treasurer > Secretary > Members)
5. **GDPR compliance**: Plan data consent management, export capabilities, and privacy controls

### Build Process (when implemented)
The system will likely require:

**Development Environment**:
- `pip install -r requirements.txt` (if Python/Django)
- `npm install` (if Node.js or frontend)
- `composer install` (if PHP/Laravel)
- Database setup with migrations
- Environment configuration for external APIs

**Build Commands** (estimated based on technology choice):
- Backend: Framework-specific build/compilation
- Frontend: `npm run build` - **NEVER CANCEL**: May take 5-10 minutes for large applications. Set timeout to 15+ minutes.
- Database migrations: Framework-specific migration commands
- Static asset compilation

**Test Commands**:
- Unit tests: Framework-specific test runners
- Integration tests: API endpoint testing
- Frontend tests: Jest/Cypress for UI testing
- **NEVER CANCEL**: Full test suite may take 15-30 minutes for comprehensive coverage. Set timeout to 45+ minutes.

### Validation Requirements

**CRITICAL**: Always test complete user workflows after implementation:

**Core Scenarios to Validate**:
1. **Member Registration Flow**: Register new member, assign role, verify permissions
2. **Event Creation and Registration**: Create event, set up ticketing, process registration and payment
3. **Communication Workflow**: Send targeted emails to member segments, test chat functionality
4. **Financial Transaction**: Record donation, generate receipt, update accounting ledger
5. **Document Management**: Upload document, set role-based access, verify retrieval permissions
6. **Role Management**: Create custom role, assign permissions, test access controls
7. **GDPR Compliance**: Export member data, process consent withdrawal, verify data deletion

**Security Testing**:
- Test role-based access controls thoroughly
- Verify data encryption in transit and at rest
- Validate GDPR compliance features
- Test API authentication and authorization

### French Context Considerations
- Member roles follow French student association structure (BDE - Bureau des Étudiants)
- Integration with French payment systems (HelloAsso, French banking)
- GDPR compliance is mandatory (European regulation)
- All user-facing text should support French language

### External Service Integrations
**Payment Systems**:
- HelloAsso API (free for French non-profits)
- Stripe (backup payment processor)
- French banking integrations

**Communication**:
- SMTP for email campaigns
- Slack/Discord integration for chat
- Zoom/Teams for video conferencing

**Productivity**:
- Google Workspace or Microsoft 365 integration
- Calendar synchronization
- File storage (Google Drive, Nextcloud)

## Key Project Requirements Summary

**Member Management**:
- 150+ member database with profile management
- Role-based permissions (President, Vice-President, Treasurer, Secretary, etc.)
- Group segmentation and filtering
- GDPR-compliant data handling

**Event Management**:
- Event creation and management
- Ticketing system with multiple pricing tiers
- Online registration and payment processing
- Capacity management and waitlists

**Financial Management**:
- Accounting module with French accounting standards
- Budget tracking and reporting
- Subscription and donation collection
- Expense management and reimbursements

**Communication**:
- Email campaigns and newsletters
- Internal messaging/chat system
- Website with public/private sections
- Document sharing and collaboration

**Analytics**:
- Member engagement tracking
- Financial reporting and dashboards
- Event participation analytics
- Communication effectiveness metrics

## Common Commands Reference

### Setup Commands (when code exists)
```bash
# Database setup
createdb gestion_centrale_ucl
# Run migrations (framework-specific)

# Install dependencies
pip install -r requirements.txt  # Python
npm install                      # Node.js
composer install               # PHP

# Environment setup
cp .env.example .env
# Configure database and API keys
```

### Development Commands (when implemented)
```bash
# Start development servers
python manage.py runserver    # Django
npm run dev                   # Node.js/frontend
php artisan serve            # Laravel

# Database operations
python manage.py migrate      # Django
npx prisma migrate           # Node.js with Prisma
php artisan migrate          # Laravel

# Testing
python manage.py test        # Django
npm test                     # Node.js
php artisan test            # Laravel
```

### Deployment Preparation
```bash
# Production builds - NEVER CANCEL: May take 15-30 minutes. Set timeout to 45+ minutes.
npm run build                 # Frontend assets
python manage.py collectstatic  # Django static files

# Database backup before deployment
pg_dump gestion_centrale_ucl > backup.sql

# Security checks
python manage.py check --deploy  # Django security check
npm audit                        # Node.js security audit
```

## Current Repository Validation

**Verify the current state**:
```bash
# Check repository contents
ls -la
# Should show: instruction.pdf and .github/ directory

# Extract requirements for analysis
pdftotext instruction.pdf requirements.txt
wc -l requirements.txt  # Should show ~435 lines

# Verify no code exists yet
find . -name "*.py" -o -name "*.js" -o -name "*.php" -o -name "*.java" | grep -v ".git"
# Should return no results (empty repository)

# Check git status
git status
# Should be clean after following instructions
```

## Documentation Structure

When adding code, maintain documentation for:
- API endpoints and schemas
- Database model relationships
- Role and permission definitions
- External service integration guides
- Deployment procedures
- User guides for association members

## Notes for Agents
- This is a comprehensive association management system - expect complex business logic
- French regulatory compliance (GDPR) is non-negotiable
- The system serves diverse user types (students, administrators, financial managers)
- Payment processing and financial data require extra security attention
- The association context means seasonal usage patterns (academic year cycles)
- Multi-language support (French primary) should be considered early in development

## Instruction Validation

**Test these instructions work by running**:
```bash
# Test PDF extraction
pdftotext instruction.pdf test_requirements.txt
echo "Extracted $(wc -l < test_requirements.txt) lines from PDF"

# Verify repository state
ls -la  # Should show instruction.pdf and .github/ directory
find . -name "*.py" -o -name "*.js" -o -name "*.php" | grep -v ".git" || echo "Greenfield project confirmed"

# Check instruction file exists
test -f .github/copilot-instructions.md && echo "Instructions file ready"

# Cleanup
rm test_requirements.txt
```

**Expected results**: All commands should complete successfully, confirming the instructions are accurate and the development environment is ready for implementation when code development begins.