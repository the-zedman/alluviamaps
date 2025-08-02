# GitHub Issues Setup Guide

## Step 1: Create Labels

Go to your repository → Settings → Labels → New label

Create these labels:

### Phase Labels:
- `phase-1` (Core Infrastructure) - Color: #0366d6
- `phase-2` (Premium Features) - Color: #28a745  
- `phase-3` (Community Features) - Color: #ffc107
- `phase-4` (Advanced Features) - Color: #dc3545

### Component Labels:
- `frontend` - Color: #6f42c1
- `backend` - Color: #fd7e14
- `mapping` - Color: #20c997
- `auth` - Color: #17a2b8
- `premium` - Color: #ffc107
- `mobile` - Color: #6c757d
- `performance` - Color: #e83e8c

### Priority Labels:
- `high-priority` - Color: #dc3545
- `medium-priority` - Color: #fd7e14
- `low-priority` - Color: #6c757d

### Type Labels:
- `bug` - Color: #d73a4a
- `feature` - Color: #28a745
- `enhancement` - Color: #0366d6
- `documentation` - Color: #0075ca
- `testing` - Color: #fef2c0

## Step 2: Create Milestones

Go to Issues → Milestones → New milestone

Create these milestones:
1. **Phase 1: Core Infrastructure** (Due: 4 weeks from now)
2. **Phase 2: Premium Features** (Due: 8 weeks from now)
3. **Phase 3: Community Features** (Due: 12 weeks from now)
4. **Phase 4: Advanced Features** (Due: 16 weeks from now)

## Step 3: Create Issues

### Phase 1 Issues (High Priority)

**Issue 1: Project Setup & Configuration**
- Title: "Set up GitHub repository with proper structure"
- Labels: `phase-1`, `frontend`, `high-priority`, `feature`
- Milestone: Phase 1: Core Infrastructure
- Description:
```
## User Story
As a developer, I want to set up the GitHub repository with proper structure

## Tasks
- [ ] Initialize SvelteKit project
- [ ] Configure Tailwind CSS
- [ ] Set up TypeScript configuration
- [ ] Configure ESLint and Prettier
- [ ] Set up Vercel deployment
- [ ] Create initial README and documentation

## Acceptance Criteria
- [ ] Project builds successfully
- [ ] All configuration files are in place
- [ ] Development environment is ready
```

**Issue 2: Supabase Backend Configuration**
- Title: "Configure Supabase backend"
- Labels: `phase-1`, `backend`, `high-priority`, `feature`
- Milestone: Phase 1: Core Infrastructure
- Description:
```
## User Story
As a developer, I want to configure Supabase backend

## Tasks
- [ ] Set up Supabase project
- [ ] Configure authentication
- [ ] Set up database schema
- [ ] Configure Row Level Security (RLS)
- [ ] Set up real-time subscriptions

## Acceptance Criteria
- [ ] Authentication works
- [ ] Database schema is created
- [ ] RLS policies are in place
```

**Issue 3: Mapbox Integration**
- Title: "Integrate Mapbox mapping"
- Labels: `phase-1`, `mapping`, `high-priority`, `feature`
- Milestone: Phase 1: Core Infrastructure
- Description:
```
## User Story
As a developer, I want to integrate Mapbox mapping

## Tasks
- [ ] Set up Mapbox account and API keys
- [ ] Configure basic map component
- [ ] Implement street and terrain layers
- [ ] Set up layer controls

## Acceptance Criteria
- [ ] Map displays correctly
- [ ] Basic layers work
- [ ] Layer controls function
```

**Issue 4: User Authentication**
- Title: "Implement user authentication system"
- Labels: `phase-1`, `auth`, `high-priority`, `feature`
- Milestone: Phase 1: Core Infrastructure
- Description:
```
## User Story
As a user, I want to sign up for an account

## Tasks
- [ ] Create signup form
- [ ] Implement email verification
- [ ] Set up user profile creation
- [ ] Handle signup errors

## Acceptance Criteria
- [ ] Users can sign up
- [ ] Email verification works
- [ ] User profiles are created
```

**Issue 5: Basic Mapping Functionality**
- Title: "Implement basic mapping functionality"
- Labels: `phase-1`, `mapping`, `high-priority`, `feature`
- Milestone: Phase 1: Core Infrastructure
- Description:
```
## User Story
As a user, I want to view a map with basic layers

## Tasks
- [ ] Display street map layer
- [ ] Display terrain layer
- [ ] Implement basic zoom and pan controls
- [ ] Add location search functionality

## Acceptance Criteria
- [ ] Map displays street and terrain layers
- [ ] Zoom and pan work
- [ ] Search functionality works
```

### Phase 2 Issues (Medium Priority)

**Issue 6: LiDAR Data Integration**
- Title: "Integrate LiDAR data for premium users"
- Labels: `phase-2`, `mapping`, `premium`, `high-priority`, `feature`
- Milestone: Phase 2: Premium Features
- Description:
```
## User Story
As a premium user, I want to access LiDAR data

## Tasks
- [ ] Source LiDAR data providers
- [ ] Implement LiDAR layer rendering
- [ ] Add LiDAR-specific controls
- [ ] Optimize LiDAR data loading

## Acceptance Criteria
- [ ] LiDAR data displays correctly
- [ ] Performance is acceptable
- [ ] Controls work properly
```

**Issue 7: Gold Sites Database**
- Title: "Create gold sites database for premium users"
- Labels: `phase-2`, `backend`, `premium`, `high-priority`, `feature`
- Milestone: Phase 2: Premium Features
- Description:
```
## User Story
As a premium user, I want to view gold fossicking sites

## Tasks
- [ ] Create gold sites database schema
- [ ] Implement sites data import
- [ ] Add site markers on map
- [ ] Create site information cards

## Acceptance Criteria
- [ ] Sites display on map
- [ ] Site information is accurate
- [ ] Performance is good
```

### Phase 3 Issues (Medium Priority)

**Issue 8: User-Generated Content**
- Title: "Implement user-generated content system"
- Labels: `phase-3`, `frontend`, `backend`, `medium-priority`, `feature`
- Milestone: Phase 3: Community Features
- Description:
```
## User Story
As a user, I want to upload my tracks

## Tasks
- [ ] Create track upload interface
- [ ] Support GPX/KML file formats
- [ ] Add track metadata editing
- [ ] Implement track validation

## Acceptance Criteria
- [ ] Users can upload tracks
- [ ] File formats are supported
- [ ] Validation works correctly
```

**Issue 9: Mobile Optimization**
- Title: "Optimize for mobile devices"
- Labels: `phase-3`, `mobile`, `high-priority`, `enhancement`
- Milestone: Phase 3: Community Features
- Description:
```
## User Story
As a mobile user, I want a responsive interface

## Tasks
- [ ] Optimize for mobile screens
- [ ] Implement touch gestures
- [ ] Add mobile-specific controls
- [ ] Optimize mobile performance

## Acceptance Criteria
- [ ] Interface works on mobile
- [ ] Touch controls work
- [ ] Performance is good
```

## Step 4: Organize Your Project Board

1. Go to Projects tab
2. Create a new board called "AlluviaMaps Backlog"
3. Set up columns: Backlog, To Do, In Progress, Review, Done
4. Add issues to the appropriate columns

## Quick Copy-Paste Templates

### Issue Template:
```
## User Story
As a [user type], I want to [action] so that [benefit]

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

### Labels to Add:
- `phase-1`, `frontend`, `high-priority`, `feature`
- `phase-1`, `backend`, `high-priority`, `feature`
- `phase-1`, `mapping`, `high-priority`, `feature`
- `phase-1`, `auth`, `high-priority`, `feature`
- `phase-2`, `premium`, `high-priority`, `feature`
- `phase-3`, `community`, `medium-priority`, `feature` 