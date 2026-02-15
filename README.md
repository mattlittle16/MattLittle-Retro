# Matthew Little - Memorial Portfolio Site

This is an archived memorial version of Matthew Little's portfolio website, migrated from ASP.NET to a simple static HTML site running in Docker with nginx.

## About

Originally built as an ASP.NET Web Forms application, this site has been preserved as a memorial with the contact form disabled. The site showcases Matthew's portfolio, experience, and background as it existed at the time.

## Architecture

- **Frontend**: Static HTML/CSS/JS with Bootstrap, jQuery, and fullPage.js
- **Server**: nginx (Alpine-based)
- **Deployment**: Docker with docker-compose
- **CI/CD**: GitHub Actions for automated deployment to homelab

## Local Development

### Using Docker Compose

```bash
# Build and run
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The site will be available at `http://localhost:8080`

### Using Docker directly

```bash
# Build the image
docker build -t mattlittle-memorial:latest .

# Run the container
docker run -d \
  --name mattlittle-memorial-app \
  --restart unless-stopped \
  -p 8080:80 \
  mattlittle-memorial:latest

# Check health
curl http://localhost:8080/health
```

## Project Structure

```
docker-app/
├── index.html              # Main portfolio page
├── content/                # Static assets
│   ├── css/               # Stylesheets
│   ├── scripts/           # JavaScript files
│   ├── images/            # Images and graphics
│   └── fonts/             # Web fonts
├── Dockerfile             # Container build instructions
├── docker-compose.yml     # Container orchestration
├── nginx.conf             # nginx server configuration
└── .dockerignore          # Files to exclude from build
```

## Health Check

The nginx configuration includes a health check endpoint:

```bash
curl http://localhost:8080/health
# Response: healthy
```

## Deployment

Deployment is automated via GitHub Actions. Pushing to the `main` or `master` branch will:

1. Build a new Docker image
2. Stop and remove the old container
3. Start a new container with the updated image
4. Clean up unused images
5. Verify the deployment

## Migration Notes

This site was migrated from an ASP.NET application to static HTML:

- **Removed**: ASP.NET backend, Send.aspx email handler
- **Disabled**: Contact form (now read-only for memorial purposes)
- **Preserved**: Original HTML structure, styling, and JavaScript functionality
- **Security**: Removed hardcoded AWS credentials that existed in the original codebase

## License

This is a personal memorial site.
