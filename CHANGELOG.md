# Changelog

## [Unreleased]

## [1.1.9] - 2025-03-11
### Changed
- Migration of comentario-override.css changes to [crunchytario](https://github.com/martian0x80/crunchytario) for easier maintenance and QOL improvements.
- Update max comment nesting to 10 levels.
- Timestamps are now not parsed from the `[res]` block.

### Removed
- Forced 'en' language setting in comentario UI. Now defaults to i18n supported languages.

### Fixed
- Resolve race condition with page state change (credits: @derpondus)

### Added
- CHANGELOG.md for tracking changes to the extension.
- Multi-line spoiler support in comments.

## [1.1.8] - 2025-02-28
### Fixed
- Webhook comment path and avatar URL issues.

## [1.1.6] - 2025-02-22
### Fixed
- Missing fonts in comentario-override.css
- Remove redundant host_permissions in manifest.json

## [1.1.4] - 2025-01-24
### Fixed
- Improve comment injection on route changes
  - Inject patch.js to detect client-side navigation by monkey-patching push and replace state
  - Simplify checkAndInject to always re-inject comments
  - Add delays to ensure elements are loaded
  - Remove large body-wide MutationObserver for better performance

