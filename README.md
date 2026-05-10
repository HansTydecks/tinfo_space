# Tinfo.Space in Vitepress
The idea behind this website is to create a fast, simple, and good-looking website for students and teachers alike. Learners can find reliable sources and information while teachers get the opportunity to quickly change and update the website on GitHub to add missing but important information. Though some may be unfamiliar with markdown, the format is quickly understood and people of all walks of life are able to jump in and co-edit the sites.

## Deployment

This site is hosted on GitHub Pages. Pushes to `main` trigger the workflow in `.github/workflows/deploy.yml` and publish the generated VitePress site.

- `npm run build`: build locally for verification
- `npm run build-and-push`: build, commit pending changes if needed, and push to `main`
- `npm run deploy`: alias for the GitHub Pages workflow above
