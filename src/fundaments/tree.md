# Basic Angular Project Structure

portfolio-angular/
├── src/
│ ├── app/
│ │ ├── core/
│ │ │ ├── models/
│ │ │ │ ├── project.model.ts
│ │ │ │ ├── endpoint.model.ts
│ │ │ │ ├── code-snippet.model.ts
│ │ │ │ ├── feature.model.ts
│ │ │ │ └── index.ts
│ │ │ ├── services/
│ │ │ │ ├── projects.service.ts
│ │ │ │ ├── theme.service.ts
│ │ │ │ ├── navigation.service.ts
│ │ │ │ ├── github.service.ts
│ │ │ │ └── index.ts
│ │ │ ├── guards/
│ │ │ │ ├── project-exists.guard.ts
│ │ │ │ └── index.ts
│ │ │ ├── interceptors/
│ │ │ │ ├── api.interceptor.ts
│ │ │ │ └── index.ts
│ │ │ └── constants/
│ │ │ ├── projects-data.ts
│ │ │ ├── tech-stack.ts
│ │ │ └── index.ts
│ │ │
│ │ ├── shared/
│ │ │ ├── components/
│ │ │ │ ├── code-block/
│ │ │ │ │ ├── code-block.component.ts
│ │ │ │ │ ├── code-block.component.html
│ │ │ │ │ └── code-block.component.scss
│ │ │ │ ├── tech-badge/
│ │ │ │ │ ├── tech-badge.component.ts
│ │ │ │ │ ├── tech-badge.component.html
│ │ │ │ │ └── tech-badge.component.scss
│ │ │ │ ├── sidebar-nav/
│ │ │ │ │ ├── sidebar-nav.component.ts
│ │ │ │ │ ├── sidebar-nav.component.html
│ │ │ │ │ └── sidebar-nav.component.scss
│ │ │ │ ├── table-of-contents/
│ │ │ │ │ ├── table-of-contents.component.ts
│ │ │ │ │ ├── table-of-contents.component.html
│ │ │ │ │ └── table-of-contents.component.scss
│ │ │ │ ├── breadcrumb/
│ │ │ │ │ ├── breadcrumb.component.ts
│ │ │ │ │ ├── breadcrumb.component.html
│ │ │ │ │ └── breadcrumb.component.scss
│ │ │ │ ├── theme-toggle/
│ │ │ │ │ ├── theme-toggle.component.ts
│ │ │ │ │ ├── theme-toggle.component.html
│ │ │ │ │ └── theme-toggle.component.scss
│ │ │ │ ├── search-bar/
│ │ │ │ │ ├── search-bar.component.ts
│ │ │ │ │ ├── search-bar.component.html
│ │ │ │ │ └── search-bar.component.scss
│ │ │ │ └── index.ts
│ │ │ ├── directives/
│ │ │ │ ├── highlight-code.directive.ts
│ │ │ │ ├── scroll-spy.directive.ts
│ │ │ │ ├── lazy-load-image.directive.ts
│ │ │ │ └── index.ts
│ │ │ ├── pipes/
│ │ │ │ ├── safe-html.pipe.ts
│ │ │ │ ├── filter.pipe.ts
│ │ │ │ ├── truncate.pipe.ts
│ │ │ │ └── index.ts
│ │ │ └── utils/
│ │ │ ├── animations.ts
│ │ │ ├── validators.ts
│ │ │ └── index.ts
│ │ │
│ │ ├── pages/
│ │ │ ├── home/
│ │ │ │ ├── home.component.ts
│ │ │ │ ├── home.component.html
│ │ │ │ ├── home.component.scss
│ │ │ │ ├── components/
│ │ │ │ │ ├── hero/
│ │ │ │ │ │ ├── hero.component.ts
│ │ │ │ │ │ ├── hero.component.html
│ │ │ │ │ │ └── hero.component.scss
│ │ │ │ │ ├── projects-grid/
│ │ │ │ │ │ ├── projects-grid.component.ts
│ │ │ │ │ │ ├── projects-grid.component.html
│ │ │ │ │ │ └── projects-grid.component.scss
│ │ │ │ │ ├── project-card/
│ │ │ │ │ │ ├── project-card.component.ts
│ │ │ │ │ │ ├── project-card.component.html
│ │ │ │ │ │ └── project-card.component.scss
│ │ │ │ │ └── index.ts
│ │ │ │ └── home.routes.ts
│ │ │ │
│ │ │ └── project-docs/
│ │ │ ├── project-docs.component.ts
│ │ │ ├── project-docs.component.html
│ │ │ ├── project-docs.component.scss
│ │ │ ├── project-docs.routes.ts
│ │ │ └── sections/
│ │ │ ├── overview/
│ │ │ │ ├── overview.component.ts
│ │ │ │ ├── overview.component.html
│ │ │ │ ├── overview.component.scss
│ │ │ │ ├── components/
│ │ │ │ │ ├── project-header/
│ │ │ │ │ │ ├── project-header.component.ts
│ │ │ │ │ │ ├── project-header.component.html
│ │ │ │ │ │ └── project-header.component.scss
│ │ │ │ │ ├── tech-stack-showcase/
│ │ │ │ │ │ ├── tech-stack-showcase.component.ts
│ │ │ │ │ │ ├── tech-stack-showcase.component.html
│ │ │ │ │ │ └── tech-stack-showcase.component.scss
│ │ │ │ │ ├── media-gallery/
│ │ │ │ │ │ ├── media-gallery.component.ts
│ │ │ │ │ │ ├── media-gallery.component.html
│ │ │ │ │ │ └── media-gallery.component.scss
│ │ │ │ │ ├── quick-links/
│ │ │ │ │ │ ├── quick-links.component.ts
│ │ │ │ │ │ ├── quick-links.component.html
│ │ │ │ │ │ └── quick-links.component.scss
│ │ │ │ │ └── index.ts
│ │ │ │ └── overview.routes.ts
│ │ │ │
│ │ │ ├── architecture/
│ │ │ │ ├── architecture.component.ts
│ │ │ │ ├── architecture.component.html
│ │ │ │ ├── architecture.component.scss
│ │ │ │ ├── components/
│ │ │ │ │ ├── architecture-diagram/
│ │ │ │ │ │ ├── architecture-diagram.component.ts
│ │ │ │ │ │ ├── architecture-diagram.component.html
│ │ │ │ │ │ └── architecture-diagram.component.scss
│ │ │ │ │ ├── tech-decisions/
│ │ │ │ │ │ ├── tech-decisions.component.ts
│ │ │ │ │ │ ├── tech-decisions.component.html
│ │ │ │ │ │ └── tech-decisions.component.scss
│ │ │ │ │ ├── data-flow/
│ │ │ │ │ │ ├── data-flow.component.ts
│ │ │ │ │ │ ├── data-flow.component.html
│ │ │ │ │ │ └── data-flow.component.scss
│ │ │ │ │ └── index.ts
│ │ │ │ └── architecture.routes.ts
│ │ │ │
│ │ │ ├── code-showcase/
│ │ │ │ ├── code-showcase.component.ts
│ │ │ │ ├── code-showcase.component.html
│ │ │ │ ├── code-showcase.component.scss
│ │ │ │ ├── components/
│ │ │ │ │ ├── code-viewer/
│ │ │ │ │ │ ├── code-viewer.component.ts
│ │ │ │ │ │ ├── code-viewer.component.html
│ │ │ │ │ │ └── code-viewer.component.scss
│ │ │ │ │ ├── file-tree/
│ │ │ │ │ │ ├── file-tree.component.ts
│ │ │ │ │ │ ├── file-tree.component.html
│ │ │ │ │ │ └── file-tree.component.scss
│ │ │ │ │ ├── code-tabs/
│ │ │ │ │ │ ├── code-tabs.component.ts
│ │ │ │ │ │ ├── code-tabs.component.html
│ │ │ │ │ │ └── code-tabs.component.scss
│ │ │ │ │ └── index.ts
│ │ │ │ └── code-showcase.routes.ts
│ │ │ │
│ │ │ ├── api-explorer/
│ │ │ │ ├── api-explorer.component.ts
│ │ │ │ ├── api-explorer.component.html
│ │ │ │ ├── api-explorer.component.scss
│ │ │ │ ├── components/
│ │ │ │ │ ├── endpoint-list/
│ │ │ │ │ │ ├── endpoint-list.component.ts
│ │ │ │ │ │ ├── endpoint-list.component.html
│ │ │ │ │ │ └── endpoint-list.component.scss
│ │ │ │ │ ├── endpoint-detail/
│ │ │ │ │ │ ├── endpoint-detail.component.ts
│ │ │ │ │ │ ├── endpoint-detail.component.html
│ │ │ │ │ │ └── endpoint-detail.component.scss
│ │ │ │ │ ├── request-builder/
│ │ │ │ │ │ ├── request-builder.component.ts
│ │ │ │ │ │ ├── request-builder.component.html
│ │ │ │ │ │ └── request-builder.component.scss
│ │ │ │ │ ├── response-viewer/
│ │ │ │ │ │ ├── response-viewer.component.ts
│ │ │ │ │ │ ├── response-viewer.component.html
│ │ │ │ │ │ └── response-viewer.component.scss
│ │ │ │ │ ├── schema-visualizer/
│ │ │ │ │ │ ├── schema-visualizer.component.ts
│ │ │ │ │ │ ├── schema-visualizer.component.html
│ │ │ │ │ │ └── schema-visualizer.component.scss
│ │ │ │ │ └── index.ts
│ │ │ │ └── api-explorer.routes.ts
│ │ │ │
│ │ │ ├── features/
│ │ │ │ ├── features.component.ts
│ │ │ │ ├── features.component.html
│ │ │ │ ├── features.component.scss
│ │ │ │ ├── components/
│ │ │ │ │ ├── feature-card/
│ │ │ │ │ │ ├── feature-card.component.ts
│ │ │ │ │ │ ├── feature-card.component.html
│ │ │ │ │ │ └── feature-card.component.scss
│ │ │ │ │ ├── feature-demo/
│ │ │ │ │ │ ├── feature-demo.component.ts
│ │ │ │ │ │ ├── feature-demo.component.html
│ │ │ │ │ │ └── feature-demo.component.scss
│ │ │ │ │ ├── feature-filters/
│ │ │ │ │ │ ├── feature-filters.component.ts
│ │ │ │ │ │ ├── feature-filters.component.html
│ │ │ │ │ │ └── feature-filters.component.scss
│ │ │ │ │ └── index.ts
│ │ │ │ └── features.routes.ts
│ │ │ │
│ │ │ └── infrastructure/
│ │ │ ├── infrastructure.component.ts
│ │ │ ├── infrastructure.component.html
│ │ │ ├── infrastructure.component.scss
│ │ │ ├── components/
│ │ │ │ ├── deployment-diagram/
│ │ │ │ │ ├── deployment-diagram.component.ts
│ │ │ │ │ ├── deployment-diagram.component.html
│ │ │ │ │ └── deployment-diagram.component.scss
│ │ │ │ ├── docker-config/
│ │ │ │ │ ├── docker-config.component.ts
│ │ │ │ │ ├── docker-config.component.html
│ │ │ │ │ └── docker-config.component.scss
│ │ │ │ ├── cicd-pipeline/
│ │ │ │ │ ├── cicd-pipeline.component.ts
│ │ │ │ │ ├── cicd-pipeline.component.html
│ │ │ │ │ └── cicd-pipeline.component.scss
│ │ │ │ └── index.ts
│ │ │ └── infrastructure.routes.ts
│ │ │
│ │ ├── layout/
│ │ │ ├── header/
│ │ │ │ ├── header.component.ts
│ │ │ │ ├── header.component.html
│ │ │ │ └── header.component.scss
│ │ │ ├── footer/
│ │ │ │ ├── footer.component.ts
│ │ │ │ ├── footer.component.html
│ │ │ │ └── footer.component.scss
│ │ │ ├── main-layout/
│ │ │ │ ├── main-layout.component.ts
│ │ │ │ ├── main-layout.component.html
│ │ │ │ └── main-layout.component.scss
│ │ │ └── index.ts
│ │ │
│ │ ├── app.component.ts
│ │ ├── app.component.html
│ │ ├── app.component.scss
│ │ ├── app.config.ts
│ │ └── app.routes.ts
│ │
│ ├── assets/
│ │ ├── data/
│ │ │ ├── projects/
│ │ │ │ ├── project-1.json
│ │ │ │ ├── project-2.json
│ │ │ │ └── project-3.json
│ │ │ └── endpoints/
│ │ │ ├── project-1-endpoints.json
│ │ │ └── project-2-endpoints.json
│ │ ├── images/
│ │ │ ├── projects/
│ │ │ │ ├── project-1/
│ │ │ │ │ ├── hero.jpg
│ │ │ │ │ ├── screenshot-1.png
│ │ │ │ │ └── architecture-diagram.svg
│ │ │ │ └── project-2/
│ │ │ ├── tech-icons/
│ │ │ │ ├── angular.svg
│ │ │ │ ├── docker.svg
│ │ │ │ └── typescript.svg
│ │ │ └── general/
│ │ │ └── avatar.jpg
│ │ ├── icons/
│ │ │ └── custom-icons.svg
│ │ └── videos/
│ │ └── project-demos/
│ │
│ ├── styles/
│ │ ├── abstracts/
│ │ │ ├── \_variables.scss
│ │ │ ├── \_mixins.scss
│ │ │ └── \_functions.scss
│ │ ├── base/
│ │ │ ├── \_reset.scss
│ │ │ ├── \_typography.scss
│ │ │ └── \_utilities.scss
│ │ ├── themes/
│ │ │ ├── \_dark.scss
│ │ │ ├── \_light.scss
│ │ │ └── \_themes.scss
│ │ ├── components/
│ │ │ ├── \_buttons.scss
│ │ │ ├── \_cards.scss
│ │ │ ├── \_code-blocks.scss
│ │ │ └── \_forms.scss
│ │ └── styles.scss
│ │
│ ├── environments/
│ │ ├── environment.ts
│ │ └── environment.development.ts
│ │
│ ├── index.html
│ └── main.ts
│
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
