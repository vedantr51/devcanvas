# DevCanvas

DevCanvas is a one-click portfolio generator that transforms a GitHub profile into a clean, professional developer portfolio.

## Why DevCanvas
- Developers often neglect updating portfolios
- GitHub already contains the source of truth
- DevCanvas automates the transformation

## Key Features
- GitHub API integration with rate-limit handling
- Request deduplication & client-side caching
- Data normalization layer
- Conditional UI rendering
- SEO-ready dynamic portfolio pages

## Engineering Decisions
- No OAuth in MVP to reduce friction
- Client-side caching over backend simplicity
- Single data-fetching hook for debuggability

## Limitations
- GitHub API unauthenticated rate limits
- Public repositories only

## Future Enhancements
(list the post-MVP items)
