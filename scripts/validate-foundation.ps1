[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$requiredPaths = @(
    'apps/web', 'apps/mobile', 'apps/api',
    'packages/shared', 'packages/contracts',
    'infra/docker', 'docs/architecture', 'docs/scopes',
    'public/inspiration', '.env.example', '.gitignore', 'README.md', 'compose.yaml'
)

foreach ($path in $requiredPaths) {
    if (-not (Test-Path $path)) {
        throw "Required foundation path is missing: $path"
    }
}

$compose = Get-Content -Raw 'compose.yaml'
if ($compose -match '(?m)^\s*ports\s*:') {
    throw 'compose.yaml must not publish private service ports in this scope.'
}
if ($compose -notmatch 'profiles: \["ollama"\]') {
    throw 'Ollama must be isolated in its optional Compose profile.'
}

Write-Host 'Foundation structural validation passed.'
