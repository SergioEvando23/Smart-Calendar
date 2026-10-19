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
$serviceSections = @{}
foreach ($service in @('postgres', 'api', 'web')) {
    $match = [regex]::Match($compose, "(?ms)^  ${service}:\r?\n(.*?)(?=^  [a-zA-Z][a-zA-Z0-9_-]*:|\z)")
    if ($match.Success) { $serviceSections[$service] = $match.Value }
}
if ($serviceSections['postgres'] -match '(?m)^    ports\s*:' -or $serviceSections['api'] -match '(?m)^    ports\s*:') {
    throw 'compose.yaml must not publish PostgreSQL or API ports.'
}
if ($serviceSections['web'] -notmatch '(?m)^    ports\s*:') {
    throw 'compose.yaml must publish the Web entrypoint.'
}
if ($compose -notmatch 'profiles: \["ollama"\]') {
    throw 'Ollama must be isolated in its optional Compose profile.'
}

Write-Host 'Foundation structural validation passed.'
