import TemplateCache from '../../../utils/templateCache';
import { MetaData } from '../../../interfaces/MetaData';

let _stylesInjected = false;

function injectPluginCardStyles(): void {
    if (_stylesInjected) return;
    _stylesInjected = true;

    const style = document.createElement('style');
    style.id = 'sxp-plugin-card-styles';
    style.textContent = `
.sxp-plugin-card {
    flex-direction: column !important;
    align-items: stretch !important;
    padding: 14px 16px 10px !important;
    border-radius: 12px !important;
    background: rgba(255,255,255,0.04) !important;
    border: 0.5px solid rgba(255,255,255,0.08) !important;
    gap: 0 !important;
    cursor: default !important;
}
.sxp-card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}
.sxp-avatar {
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, hsl(270 60% 28%), hsl(260 55% 18%));
    border: 0.5px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: rgba(255,255,255,0.80);
    letter-spacing: 0.5px;
    flex-shrink: 0;
    font-family: 'Inter', system-ui, sans-serif;
}
.sxp-card-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.sxp-name-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
}
.sxp-name {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.90);
}
.sxp-online-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px rgba(74,222,128,0.50);
    flex-shrink: 0;
}
.sxp-version-badge {
    font-size: 10px;
    font-weight: 500;
    color: rgba(255,255,255,0.40);
    background: rgba(255,255,255,0.06);
    border: 0.5px solid rgba(255,255,255,0.10);
    border-radius: 4px;
    padding: 1px 5px;
    font-family: monospace;
}
.sxp-storage-badge {
    font-size: 9px;
    font-weight: 700;
    color: hsl(270 75% 75%);
    background: hsla(270 75% 70% / 0.14);
    border: 0.5px solid hsla(270 75% 70% / 0.28);
    border-radius: 4px;
    padding: 1px 5px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
}
.sxp-desc {
    font-size: 11px;
    color: rgba(255,255,255,0.42);
    line-height: 1.45;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.sxp-meta-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 2px;
}
.sxp-author {
    font-size: 10px;
    color: rgba(255,255,255,0.30);
}
.sxp-stars {
    font-size: 10px;
    color: rgba(255,255,255,0.30);
}
.sxp-card-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;
}
.sxp-chevron {
    background: none;
    border: none;
    color: rgba(255,255,255,0.28);
    cursor: pointer;
    padding: 2px 6px;
    font-size: 16px;
    line-height: 1;
    border-radius: 4px;
    transition: color 0.15s, background 0.15s, transform 0.2s;
}
.sxp-chevron:hover {
    color: rgba(255,255,255,0.60);
    background: rgba(255,255,255,0.06);
}
.sxp-plugin-card.sxp-expanded .sxp-chevron {
    transform: rotate(180deg);
    color: rgba(255,255,255,0.50);
}
.sxp-stats-row {
    display: none;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 0.5px solid rgba(255,255,255,0.06);
}
.sxp-plugin-card.sxp-expanded .sxp-stats-row {
    display: grid;
}
.sxp-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.sxp-stat-label {
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: rgba(255,255,255,0.28);
}
.sxp-stat-value {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.72);
    font-family: monospace;
}
.sxp-sandbox-notice {
    margin-top: 8px;
    font-size: 10px;
    color: rgba(255,255,255,0.22);
}
`;
    document.head.appendChild(style);
}

function computeInitials(name: string): string {
    const parts = name.split(/[-_\s]+/).filter(Boolean);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

function readColdStart(baseName: string): string {
    const raw = localStorage.getItem(`sxp_coldstart_${baseName}`);
    return raw ? `${raw}ms` : '—';
}

function readErrorsWk(baseName: string): string {
    const raw = localStorage.getItem(`sxp_errors_${baseName}`);
    if (!raw) return '0';
    try {
        const times: number[] = JSON.parse(raw);
        const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
        return String(times.filter(t => t > cutoff).length);
    } catch {
        return '0';
    }
}

function readLastCrash(baseName: string): string {
    const raw = localStorage.getItem(`sxp_lastcrash_${baseName}`);
    if (!raw) return '—';
    const diff = Date.now() - Number(raw);
    if (diff < 60_000) return 'just now';
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return `${Math.floor(diff / 86_400_000)}d ago`;
}

export function getPluginItemTemplate(
    filename: string,
    metaData: MetaData,
    checked: boolean
): string {
    injectPluginCardStyles();

    let template = TemplateCache.load(__dirname, 'plugin-item');

    const baseName = filename.replace('.plugin.js', '');
    const initials = computeInitials(metaData.name || baseName);
    const hasStorage = Array.isArray(metaData.permissions) &&
        metaData.permissions.some(p => p.toLowerCase() === 'storage');
    const storageTag = hasStorage
        ? '<span class="sxp-storage-badge">STORAGE</span>'
        : '';

    const metaKeys = ['name', 'description', 'author', 'version'] as const;
    metaKeys.forEach(key => {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        template = template.replace(regex, metaData[key] || '');
    });

    return template
        .replace(/\{\{\s*initials\s*\}\}/g, initials)
        .replace(/\{\{\s*storageTag\s*\}\}/g, storageTag)
        .replace(/\{\{\s*github\s*\}\}/g, metaData.github || '')
        .replace(/\{\{\s*coldStart\s*\}\}/g, readColdStart(baseName))
        .replace(/\{\{\s*errorsWk\s*\}\}/g, readErrorsWk(baseName))
        .replace(/\{\{\s*lastCrash\s*\}\}/g, readLastCrash(baseName))
        .replace(/\{\{\s*checked\s*\}\}/g, checked ? 'checked' : '')
        .replace(/\{\{\s*fileName\s*\}\}/g, filename);
}
