(()=>{
    if (document.getElementById('__st_root__')) return;
    
    const root = document.createElement('div');
    root.id = '__st_root__';
    document.documentElement.appendChild(root);
    
    const style = document.createElement('style');
    style.textContent = `
        #__st_root__ { --st-accent: rgba(255,255,255,0.9); --st-accent-glow: rgba(255,255,255,0.08); }
        #__st_root__ * { box-sizing:border-box !important; font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif; }
        #__st_root__.compact .st-card-main { padding:7px 11px !important; }
        #__st_root__.compact .st-card-icon { width:28px !important; height:28px !important; font-size:13px !important; }
        #__st_root__.compact .st-card-name { font-size:12px !important; }
        #__st_root__.compact .st-card-desc { display:none !important; }
        #__st_root__.compact .st-card-meta { display:none !important; }
        #__st_root__.compact .st-list { max-height:420px !important; }
    
        #__st_overlay__ {
            all:initial !important; position:fixed !important; inset:0 !important; z-index:2147483646 !important;
            display:block !important; background:rgba(0,0,0,0) !important;
            opacity:0 !important; visibility:hidden !important; pointer-events:none !important;
            transition:opacity 0.28s cubic-bezier(0.22,1,0.36,1),visibility 0.28s,background 0.28s cubic-bezier(0.22,1,0.36,1) !important;
        }
        #__st_overlay__.open {
            opacity:1 !important; visibility:visible !important; pointer-events:auto !important;
            background:rgba(0,0,0,0.42) !important;
        }
        #__st_overlay__.closing #__st_panel__ {
            animation:st-panel-close 0.22s cubic-bezier(0.4,0,1,1) forwards !important;
        }
    
        #__st_panel__ {
            position:absolute !important; top:50% !important; left:50% !important;
            transform:translateX(-50%) translateY(calc(-50% - 20px)) scale(0.91) !important;
            width:min(580px, calc(100vw - 40px)) !important;
            background:rgba(20,20,24,0.88) !important;
            backdrop-filter:blur(40px) saturate(180%) !important; -webkit-backdrop-filter:blur(40px) saturate(180%) !important;
            border:0.5px solid rgba(255,255,255,0.11) !important; border-radius:16px !important;
            box-shadow:0 12px 48px rgba(0,0,0,0.55),0 4px 16px rgba(0,0,0,0.35),0 0 0 0.5px rgba(255,255,255,0.04) inset !important;
            opacity:0 !important;
            transition:opacity 0.34s cubic-bezier(0.22,1,0.36,1),transform 0.42s cubic-bezier(0.34,1.2,0.64,1),box-shadow 0.34s !important;
            pointer-events:none !important; will-change:transform,opacity !important;
        }
        #__st_overlay__.open #__st_panel__ {
            opacity:1 !important; transform:translateX(-50%) translateY(-50%) scale(1) !important;
            pointer-events:all !important; will-change:auto !important;
        }
    
        .st-search-row { display:flex !important; align-items:center !important; gap:10px !important; padding:13px 16px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important; }
        .st-search-icon { color:rgba(255,255,255,0.22) !important; flex-shrink:0 !important; }
        .st-search-wrap { position:relative !important; flex:1 !important; display:flex !important; align-items:center !important; }
        .st-search-input { all:unset !important; flex:1 !important; width:100% !important; font-size:12px !important; color:rgba(255,255,255,0.82) !important; caret-color:rgba(255,255,255,0.5) !important; position:relative !important; z-index:1 !important; background:transparent !important; }
        .st-search-input::placeholder { color:rgba(255,255,255,0.18) !important; }
        .st-search-ghost { position:absolute !important; left:0 !important; top:0 !important; bottom:0 !important; display:flex !important; align-items:center !important; font-size:12px !important; color:transparent !important; pointer-events:none !important; white-space:pre !important; z-index:0 !important; }
        .st-search-ghost::after { content:attr(data-suffix) !important; color:rgba(255,255,255,0.22) !important; }
        .st-sug-name { font-size:11px !important; color:rgba(255,255,255,0.6) !important; font-weight:500 !important; flex-shrink:0 !important; }
        .st-sug-desc { font-size:10px !important; color:rgba(255,255,255,0.22) !important; overflow:hidden !important; text-overflow:ellipsis !important; white-space:nowrap !important; flex:1 !important; min-width:0 !important; }
        .st-sug-tab { font-size:9px !important; color:rgba(255,255,255,0.15) !important; flex-shrink:0 !important; margin-left:auto !important; letter-spacing:0.02em !important; }
        .st-kbd { padding:2px 6px !important; background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:5px !important; font-size:10px !important; color:rgba(255,255,255,0.25) !important; }
    
        .st-tabs { display:flex !important; padding:0 10px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important; gap:2px !important; position:relative !important; }
        .st-tab-indicator { position:absolute !important; bottom:-1px !important; height:1.5px !important; background:var(--st-accent) !important; border-radius:2px !important; transition:left 0.32s cubic-bezier(0.34,1.15,0.64,1),width 0.32s cubic-bezier(0.34,1.15,0.64,1) !important; pointer-events:none !important; opacity:0.7 !important; }
        .st-tab { all:unset !important; padding:9px 12px !important; font-size:10px !important; font-weight:500 !important; color:rgba(255,255,255,0.28) !important; cursor:pointer !important; letter-spacing:0.04em !important; transition:color 0.22s ease,transform 0.2s !important; display:flex !important; align-items:center !important; gap:5px !important; position:relative !important; }
        .st-tab.st-tab-hidden { display:none !important; }
        .st-tab:active { transform:scale(0.96) !important; }
        .st-tab:hover { color:rgba(255,255,255,0.55) !important; }
        .st-tab.active { color:rgba(255,255,255,0.88) !important; }
        .st-tab-count { display:inline-flex !important; align-items:center !important; justify-content:center !important; min-width:16px !important; height:16px !important; padding:0 4px !important; background:rgba(255,255,255,0.07) !important; border-radius:8px !important; font-size:9px !important; color:rgba(255,255,255,0.3) !important; transition:transform 0.2s !important; }
        .st-tab-count.bump { animation:st-count-bump 0.3s cubic-bezier(0.34,1.4,0.64,1) !important; }
    
        .st-list { max-height:360px !important; overflow-y:auto !important; padding:6px !important; }
        .st-list::-webkit-scrollbar { width:3px !important; }
        .st-list::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09) !important; border-radius:2px !important; }
    
        /* ── Shimmer skeleton loader ── */
        .st-skeleton { border-radius:10px !important; padding:10px 11px !important; display:flex !important; align-items:center !important; gap:11px !important; margin-bottom:2px !important; }
        .st-skel-icon { width:34px !important; height:34px !important; border-radius:8px !important; flex-shrink:0 !important; background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%) !important; background-size:400px 100% !important; animation:st-shimmer 1.4s ease-in-out infinite !important; }
        .st-skel-body { flex:1 !important; display:flex !important; flex-direction:column !important; gap:7px !important; }
        .st-skel-line { height:10px !important; border-radius:5px !important; background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%) !important; background-size:400px 100% !important; animation:st-shimmer 1.4s ease-in-out infinite !important; }
    
        .st-empty { padding:48px 20px !important; text-align:center !important; color:rgba(255,255,255,0.18) !important; font-size:12px !important; animation:st-fade-up 0.45s cubic-bezier(0.22,1,0.36,1) both !important; }
        .st-empty-ico { font-size:26px !important; display:block !important; margin-bottom:10px !important; animation:st-pop 0.5s cubic-bezier(0.34,1.2,0.64,1) 0.08s both !important; }
        .st-empty-btn { all:unset !important; margin-top:14px !important; display:inline-flex !important; align-items:center !important; gap:5px !important; padding:6px 14px !important; background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.09) !important; border-radius:7px !important; color:rgba(255,255,255,0.4) !important; font-size:11px !important; cursor:pointer !important; transition:all 0.13s !important; }
        .st-empty-btn:hover { background:rgba(255,255,255,0.09) !important; color:rgba(255,255,255,0.65) !important; }
    
        @keyframes st-fade-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes st-pop { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        @keyframes st-card-in { from { opacity:0; transform:translateY(8px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes st-toggle-pulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.09);} }
        @keyframes st-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes st-toast-in { from{opacity:0;transform:translateX(20px) scale(0.95)} to{opacity:1;transform:none} }
        @keyframes st-toast-out { to{opacity:0;transform:translateX(20px) scale(0.93)} }
        @keyframes st-toast-progress { from{width:100%} to{width:0%} }
        @keyframes st-settings-drop { from{opacity:0;transform:translateY(-8px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes st-ripple { from{transform:scale(0);opacity:0.5} to{transform:scale(2.8);opacity:0} }
        @keyframes st-spin { to{transform:rotate(360deg)} }
        @keyframes st-count-bump { 0%,100%{transform:scale(1)} 40%{transform:scale(1.22)} }
        @keyframes st-panel-close { from{opacity:1;transform:translateX(-50%) translateY(-50%) scale(1)} to{opacity:0;transform:translateX(-50%) translateY(calc(-50% - 10px)) scale(0.95)} }
        @keyframes st-hint-pulse { 0%,100%{opacity:0.15} 50%{opacity:0.55} }
        @keyframes st-star-pop { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        @keyframes st-badge-in { from{opacity:0;transform:translateX(-4px)} to{opacity:1;transform:translateX(0)} }
    
        .st-card { border-radius:10px !important; cursor:pointer !important; transition:background 0.22s ease,border-color 0.28s ease,box-shadow 0.28s ease !important; margin-bottom:2px !important; border:0.5px solid transparent !important; }
        .st-card.st-card-enter { animation:st-card-in 0.4s cubic-bezier(0.22,1,0.36,1) both !important; }
        .st-card:hover { background:rgba(255,255,255,0.04) !important; }
        .st-card.expanded { background:rgba(255,255,255,0.045) !important; border-color:rgba(255,255,255,0.08) !important; box-shadow:0 2px 12px rgba(0,0,0,0.15) !important; }
        .st-card-main { display:flex !important; align-items:center !important; gap:11px !important; padding:10px 11px !important; }
        .st-card-icon { width:34px !important; height:34px !important; border-radius:8px !important; background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.08) !important; display:flex !important; align-items:center !important; justify-content:center !important; flex-shrink:0 !important; font-size:16px !important; }
        .st-card-body { flex:1 !important; min-width:0 !important; }
        .st-card-name { font-size:12px !important; font-weight:500 !important; color:rgba(255,255,255,0.82) !important; margin-bottom:2px !important; white-space:nowrap !important; overflow:hidden !important; text-overflow:ellipsis !important; }
        .st-card-meta { font-size:10px !important; color:rgba(255,255,255,0.22) !important; display:flex !important; align-items:center !important; gap:8px !important; }
        .st-card-meta span { display:flex !important; align-items:center !important; gap:3px !important; }
        @keyframes st-star-pop { 0%{opacity:0;transform:scale(0.7) translateX(-3px)} 60%{transform:scale(1.12) translateX(1px)} 100%{opacity:1;transform:scale(1) translateX(0)} }
        @keyframes st-badge-in { from{opacity:0;transform:scale(0.85) translateY(2px)} to{opacity:1;transform:scale(1) translateY(0)} }

        /* GitHub stars badge */
        .st-stars { display:inline-flex !important; align-items:center !important; gap:3px !important; font-size:10px !important; color:rgba(255,220,80,0.45) !important; transition:color 0.3s ease !important; }
        .st-stars.loading { animation:st-hint-pulse 1.2s ease-in-out infinite !important; }
        .st-stars.loaded { color:rgba(255,220,80,0.8) !important; animation:st-star-pop 0.4s cubic-bezier(0.34,1.2,0.64,1) both !important; }

        /* Permission badges */
        .st-perm-badge { display:inline-flex !important; align-items:center !important; gap:3px !important; padding:1px 6px !important; border-radius:4px !important; font-size:9px !important; font-weight:500 !important; letter-spacing:0.03em !important; animation:st-badge-in 0.28s cubic-bezier(0.34,1.1,0.64,1) both !important; }
        .st-perm-badge.network  { background:rgba(52,152,219,0.1)  !important; border:0.5px solid rgba(52,152,219,0.22)  !important; color:rgba(100,180,255,0.75) !important; }
        .st-perm-badge.storage  { background:rgba(155,89,182,0.1)  !important; border:0.5px solid rgba(155,89,182,0.22)  !important; color:rgba(190,140,255,0.75) !important; }
        .st-perm-badge.eval     { background:rgba(230,126,34,0.1)  !important; border:0.5px solid rgba(230,126,34,0.22)  !important; color:rgba(255,170,80,0.75)  !important; }
        /* isolated: tiny dot after the plugin name, not a badge row */
        .st-isolated-dot { display:inline-block !important; width:5px !important; height:5px !important; border-radius:50% !important; background:rgba(80,200,140,0.55) !important; margin-left:5px !important; flex-shrink:0 !important; position:relative !important; top:-1px !important; cursor:default !important; }

        .st-card-desc { font-size:10px !important; color:rgba(255,255,255,0.32) !important; margin-top:4px !important; line-height:1.55 !important; display:-webkit-box !important; -webkit-line-clamp:2 !important; -webkit-box-orient:vertical !important; overflow:hidden !important; }
        .st-card-right { display:flex !important; align-items:center !important; gap:7px !important; flex-shrink:0 !important; }

        /* Chevron — smooth CSS rotation, no JS class toggling needed */
        .st-chevron { color:rgba(255,255,255,0.18) !important; transition:transform 0.36s cubic-bezier(0.34,1.15,0.64,1),color 0.2s !important; flex-shrink:0 !important; }
        .st-card:hover .st-chevron { color:rgba(255,255,255,0.32) !important; }
        .st-card.expanded .st-chevron { transform:rotate(90deg) !important; color:rgba(255,255,255,0.45) !important; }
    
        .st-toggle { all:unset !important; width:30px !important; height:17px !important; background:rgba(255,255,255,0.09) !important; border-radius:9px !important; position:relative !important; cursor:pointer !important; transition:background 0.32s cubic-bezier(0.22,1,0.36,1),box-shadow 0.28s !important; flex-shrink:0 !important; box-shadow:0 0 0 0 rgba(255,255,255,0) !important; overflow:visible !important; }
        .st-toggle::after { content:'' !important; position:absolute !important; top:2px !important; left:2px !important; width:13px !important; height:13px !important; background:rgba(255,255,255,0.42) !important; border-radius:50% !important; transition:transform 0.34s cubic-bezier(0.34,1.35,0.64,1),background 0.28s ease !important; box-shadow:0 1px 3px rgba(0,0,0,0.2) !important; }
        .st-toggle.on { background:var(--st-accent) !important; box-shadow:0 0 0 3px var(--st-accent-glow),0 2px 8px rgba(0,0,0,0.2) !important; }
        .st-toggle.on::after { transform:translateX(13px) !important; background:#fff !important; }
        .st-toggle.st-toggle-anim { animation:st-toggle-pulse 0.38s cubic-bezier(0.34,1.2,0.64,1) !important; }
        /* ripple ring that expands outward on toggle click */
        .st-toggle-ripple { position:absolute !important; top:50% !important; left:50% !important; width:30px !important; height:30px !important; margin-top:-15px !important; margin-left:-15px !important; border-radius:50% !important; background:rgba(255,255,255,0.18) !important; pointer-events:none !important; animation:st-ripple 0.5s cubic-bezier(0.22,1,0.36,1) forwards !important; }
    
        .st-settings-panel {
            max-height:0 !important; opacity:0 !important; overflow:hidden !important;
            padding:0 !important; margin:0 !important;
            transition:max-height 0.42s cubic-bezier(0.34,1.1,0.64,1),opacity 0.28s ease !important;
            will-change:max-height,opacity !important;
        }
        .st-card.expanded .st-settings-panel {
            max-height:600px !important; opacity:1 !important;
        }
        .st-card.expanded .st-settings-inner {
            animation:st-settings-drop 0.36s cubic-bezier(0.34,1.15,0.64,1) both !important;
        }
        .st-settings-inner {
            margin:0 11px 11px 11px !important;
            background:rgba(255,255,255,0.03) !important;
            border:0.5px solid rgba(255,255,255,0.07) !important;
            border-radius:10px !important;
            overflow:hidden !important;
        }
        .st-sandbox-note {
            padding:7px 12px !important; font-size:10px !important; line-height:1.5 !important;
            border-bottom:0.5px solid rgba(255,255,255,0.05) !important;
        }
        .st-sandbox-note code { font-family:"SF Mono",ui-monospace,Menlo,monospace !important; font-size:9.5px !important; opacity:0.8 !important; }
        .st-sandbox-isolated { color:rgba(100,210,160,0.75) !important; background:rgba(100,210,160,0.04) !important; }
        .st-sandbox-trusted  { color:rgba(100,160,255,0.75) !important; background:rgba(100,160,255,0.04) !important; }
        .st-setting-row {
            display:flex !important; align-items:center !important; justify-content:space-between !important;
            padding:10px 14px !important; gap:16px !important;
            border-bottom:0.5px solid rgba(255,255,255,0.05) !important;
            transition:background 0.15s !important;
        }
        .st-setting-row:last-child { border-bottom:none !important; }
        .st-setting-row:hover { background:rgba(255,255,255,0.025) !important; }
        .st-setting-label { display:flex !important; flex-direction:column !important; gap:3px !important; min-width:0 !important; flex:1 !important; }
        .st-setting-name { font-size:11px !important; color:rgba(255,255,255,0.65) !important; font-weight:400 !important; }
        .st-setting-hint { font-size:10px !important; color:rgba(255,255,255,0.22) !important; line-height:1.4 !important; }
        .st-setting-ctrl { flex-shrink:0 !important; display:flex !important; align-items:center !important; gap:8px !important; }
    
        /* ── Toggle (setting kind) ── */
        .st-s-toggle {
            width:36px !important; height:20px !important; border-radius:10px !important;
            background:rgba(255,255,255,0.1) !important; position:relative !important;
            cursor:pointer !important; flex-shrink:0 !important;
            transition:background 0.28s cubic-bezier(0.22,1,0.36,1) !important;
            border:0.5px solid rgba(255,255,255,0.08) !important;
        }
        .st-s-toggle::after {
            content:'' !important; position:absolute !important;
            top:3px !important; left:3px !important;
            width:14px !important; height:14px !important;
            background:rgba(255,255,255,0.45) !important; border-radius:50% !important;
            transition:transform 0.32s cubic-bezier(0.34,1.4,0.64,1),background 0.25s !important;
        }
        .st-s-toggle.on { background:rgba(255,255,255,0.88) !important; border-color:rgba(255,255,255,0.2) !important; }
        .st-s-toggle.on::after { transform:translateX(16px) !important; background:#fff !important; }
    
        /* ── Custom color picker ── */
        .st-s-color-wrap { position:relative !important; display:inline-flex !important; }
        .st-s-swatch {
            width:28px !important; height:28px !important; border-radius:8px !important;
            border:0.5px solid rgba(255,255,255,0.2) !important; cursor:pointer !important;
            flex-shrink:0 !important; transition:transform 0.15s,box-shadow 0.15s !important;
        }
        .st-s-swatch:hover { transform:scale(1.08) !important; box-shadow:0 0 0 2px rgba(255,255,255,0.15) !important; }
        .st-cpick {
            position:fixed !important; z-index:2147483647 !important;
            background:rgba(26,26,30,0.97) !important; backdrop-filter:blur(20px) !important;
            -webkit-backdrop-filter:blur(20px) !important;
            border:0.5px solid rgba(255,255,255,0.12) !important; border-radius:12px !important;
            padding:10px !important; width:196px !important;
            box-shadow:0 8px 32px rgba(0,0,0,0.5),0 2px 8px rgba(0,0,0,0.3) !important;
            opacity:0 !important; transform:translateY(-4px) scale(0.97) !important;
            transition:opacity 0.15s,transform 0.15s cubic-bezier(0.34,1.2,0.64,1) !important;
            pointer-events:none !important;
        }
        .st-cpick.open { opacity:1 !important; transform:none !important; pointer-events:auto !important; }
        .st-cpick-grid { display:grid !important; grid-template-columns:repeat(8,1fr) !important; gap:4px !important; margin-bottom:8px !important; }
        .st-cpick-cell {
            width:18px !important; height:18px !important; border-radius:4px !important;
            cursor:pointer !important; border:0.5px solid rgba(255,255,255,0.08) !important;
            transition:transform 0.12s,box-shadow 0.12s !important; flex-shrink:0 !important;
        }
        .st-cpick-cell:hover { transform:scale(1.18) !important; box-shadow:0 0 0 1.5px rgba(255,255,255,0.3) !important; z-index:1 !important; position:relative !important; }
        .st-cpick-cell.active { box-shadow:0 0 0 2px rgba(255,255,255,0.55) !important; }
        .st-cpick-hex-row { display:flex !important; align-items:center !important; gap:6px !important; }
        .st-cpick-hex {
            all:unset !important; flex:1 !important;
            background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.1) !important;
            border-radius:6px !important; padding:4px 8px !important;
            font-size:11px !important; font-family:"SF Mono",ui-monospace,Menlo,monospace !important;
            color:rgba(255,255,255,0.65) !important; letter-spacing:0.04em !important;
            transition:border-color 0.15s !important;
        }
        .st-cpick-hex:focus { border-color:rgba(255,255,255,0.28) !important; color:rgba(255,255,255,0.88) !important; }
        .st-cpick-preview { width:22px !important; height:22px !important; border-radius:5px !important; flex-shrink:0 !important; border:0.5px solid rgba(255,255,255,0.15) !important; }
    
        /* ── Slider ── */
        .st-s-range-wrap { display:flex !important; align-items:center !important; gap:8px !important; }
        .st-s-range {
            -webkit-appearance:none !important; appearance:none !important;
            width:100px !important; height:4px !important; border-radius:2px !important;
            background:rgba(255,255,255,0.12) !important; outline:none !important; cursor:pointer !important;
        }
        .st-s-range::-webkit-slider-thumb {
            -webkit-appearance:none !important; appearance:none !important;
            width:16px !important; height:16px !important; border-radius:50% !important;
            background:#fff !important; cursor:pointer !important;
            box-shadow:0 1px 4px rgba(0,0,0,0.35) !important;
            transition:transform 0.15s !important;
        }
        .st-s-range::-webkit-slider-thumb:hover { transform:scale(1.15) !important; }
        .st-s-range-val {
            font-size:11px !important; color:rgba(255,255,255,0.3) !important;
            min-width:28px !important; text-align:right !important; font-variant-numeric:tabular-nums !important;
        }
    
        /* ── Text input ── */
        .st-s-text {
            all:unset !important;
            background:rgba(255,255,255,0.06) !important;
            border:0.5px solid rgba(255,255,255,0.1) !important;
            border-radius:7px !important; padding:5px 10px !important;
            font-size:12px !important; color:rgba(255,255,255,0.7) !important;
            width:130px !important; transition:border-color 0.15s,background 0.15s !important;
        }
        .st-s-text:focus { border-color:rgba(255,255,255,0.25) !important; background:rgba(255,255,255,0.09) !important; }
        .st-s-text::placeholder { color:rgba(255,255,255,0.2) !important; }
    
        /* ── Custom dropdown ── */
        /* ── Native select (replaces custom dropdown) ── */
        .st-s-select {
            -webkit-appearance:none !important; appearance:none !important;
            background:rgba(255,255,255,0.06) !important;
            border:0.5px solid rgba(255,255,255,0.1) !important;
            border-radius:7px !important; padding:5px 10px !important;
            font-size:12px !important; color:rgba(255,255,255,0.7) !important;
            cursor:pointer !important; outline:none !important;
            transition:border-color 0.15s,background 0.15s !important;
            min-width:100px !important;
        }
        .st-s-select:hover { border-color:rgba(255,255,255,0.22) !important; background:rgba(255,255,255,0.09) !important; }
        .st-s-select:focus { border-color:rgba(255,255,255,0.25) !important; background:rgba(255,255,255,0.09) !important; }
        .st-s-select option { background:#1a1a1e !important; color:rgba(255,255,255,0.8) !important; }
    
        /* ── Save button ── */
        /* autosave indicator */
        .st-autosave-dot {
            display:inline-block !important; width:5px !important; height:5px !important;
            border-radius:50% !important; background:rgba(130,210,150,0.7) !important;
            margin-left:6px !important; opacity:0 !important;
            transition:opacity 0.3s !important; vertical-align:middle !important;
        }
        .st-autosave-dot.show { opacity:1 !important; }
    
        .st-deps { margin-top:6px !important; display:flex !important; flex-wrap:wrap !important; gap:4px !important; }
        .st-dep { padding:2px 7px !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.07) !important; border-radius:4px !important; font-size:9px !important; color:rgba(255,255,255,0.25) !important; }
    
        .st-url-row { display:flex !important; gap:6px !important; padding:8px !important; border-top:0.5px solid rgba(255,255,255,0.06) !important; }
        .st-url-input { all:unset !important; flex:1 !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.09) !important; border-radius:7px !important; padding:6px 10px !important; font-size:11px !important; color:rgba(255,255,255,0.65) !important; }
        .st-url-input::placeholder { color:rgba(255,255,255,0.18) !important; }
        .st-url-input:focus { border-color:rgba(255,255,255,0.18) !important; }
        .st-url-btn { all:unset !important; padding:6px 13px !important; background:rgba(255,255,255,0.07) !important; border:0.5px solid rgba(255,255,255,0.11) !important; border-radius:7px !important; font-size:11px !important; color:rgba(255,255,255,0.45) !important; cursor:pointer !important; transition:all 0.13s !important; white-space:nowrap !important; }
        .st-url-btn:hover { background:rgba(255,255,255,0.11) !important; color:rgba(255,255,255,0.7) !important; }
        .st-url-btn:disabled { opacity:0.4 !important; cursor:default !important; }
    
        .st-footer { padding:9px 14px !important; border-top:0.5px solid rgba(255,255,255,0.06) !important; display:flex !important; align-items:center !important; justify-content:space-between !important; }
        .st-footer-hints { display:flex !important; align-items:center !important; gap:8px !important; }
        .st-hint { font-size:10px !important; color:rgba(255,255,255,0.15) !important; display:flex !important; align-items:center !important; gap:4px !important; }
        .st-folder-btn { all:unset !important; display:flex !important; align-items:center !important; gap:5px !important; padding:5px 10px !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.08) !important; border-radius:6px !important; font-size:10px !important; color:rgba(255,255,255,0.35) !important; cursor:pointer !important; transition:all 0.13s !important; }
        .st-folder-btn:hover { background:rgba(255,255,255,0.08) !important; color:rgba(255,255,255,0.6) !important; }
    

    
        /* ── About tab — appearance settings section ── */
        .st-about-accent-row { display:flex !important; align-items:center !important; padding:7px 16px !important; gap:12px !important; transition:background 0.12s !important; }
        .st-about-accent-row:hover { background:rgba(255,255,255,0.02) !important; }
        .st-accent-swatches { display:flex !important; gap:5px !important; align-items:center !important; flex-wrap:wrap !important; }
        .st-accent-swatch { width:16px !important; height:16px !important; border-radius:50% !important; cursor:pointer !important; transition:transform 0.15s,box-shadow 0.15s !important; border:1.5px solid transparent !important; flex-shrink:0 !important; }
        .st-accent-swatch:hover { transform:scale(1.18) !important; }
        .st-accent-swatch.active { border-color:rgba(255,255,255,0.5) !important; box-shadow:0 0 0 2px rgba(255,255,255,0.12) !important; }
        .st-accent-custom { all:unset !important; width:16px !important; height:16px !important; border-radius:50% !important; border:1.5px dashed rgba(255,255,255,0.2) !important; cursor:pointer !important; transition:border-color 0.13s,transform 0.15s !important; display:inline-flex !important; align-items:center !important; justify-content:center !important; font-size:10px !important; color:rgba(255,255,255,0.25) !important; }
        .st-accent-custom:hover { border-color:rgba(255,255,255,0.45) !important; transform:scale(1.18) !important; color:rgba(255,255,255,0.55) !important; }
        .st-compact-toggle { all:unset !important; width:28px !important; height:16px !important; background:rgba(255,255,255,0.09) !important; border-radius:8px !important; position:relative !important; cursor:pointer !important; transition:background 0.28s cubic-bezier(0.22,1,0.36,1) !important; flex-shrink:0 !important; }
        .st-compact-toggle::after { content:'' !important; position:absolute !important; top:2px !important; left:2px !important; width:12px !important; height:12px !important; background:rgba(255,255,255,0.42) !important; border-radius:50% !important; transition:transform 0.3s cubic-bezier(0.34,1.3,0.64,1),background 0.25s !important; }
        .st-compact-toggle.on { background:var(--st-accent) !important; }
        .st-compact-toggle.on::after { transform:translateX(12px) !important; background:#fff !important; }
        .st-editor-toolbar {
            display:flex !important; align-items:center !important; justify-content:space-between !important;
            padding:8px 12px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important;
            gap:8px !important;
        }
        .st-editor-title { font-size:11px !important; color:rgba(255,255,255,0.35) !important; flex:1 !important; }
        .st-editor-status { font-size:10px !important; color:rgba(130,210,150,0.7) !important; opacity:0 !important; transition:opacity 0.3s !important; }
        .st-editor-status.show { opacity:1 !important; }
        .st-editor-apply {
            all:unset !important; padding:4px 12px !important;
            background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important;
            border-radius:6px !important; font-size:11px !important; color:rgba(255,255,255,0.45) !important;
            cursor:pointer !important; transition:all 0.13s !important; white-space:nowrap !important;
        }
        .st-editor-apply:hover { background:rgba(255,255,255,0.1) !important; color:rgba(255,255,255,0.75) !important; }
        #__st_css_input__ {
            all:unset !important; flex:1 !important; display:block !important;
            width:100% !important; box-sizing:border-box !important;
            min-height:280px !important; max-height:400px !important;
            padding:12px 14px !important;
            font-family:"SF Mono",ui-monospace,Menlo,monospace !important;
            font-size:12px !important; line-height:1.6 !important;
            color:rgba(255,255,255,0.75) !important;
            background:rgba(0,0,0,0.25) !important;
            resize:vertical !important; outline:none !important;
            border-bottom:0.5px solid rgba(255,255,255,0.06) !important;
            caret-color:rgba(255,255,255,0.6) !important;
            tab-size:2 !important;
        }
        #__st_css_input__::placeholder { color:rgba(255,255,255,0.12) !important; }
        #__st_css_input__:focus { background:rgba(0,0,0,0.32) !important; }
        .st-editor-footer {
            display:flex !important; align-items:center !important; justify-content:space-between !important;
            padding:8px 12px !important; gap:8px !important;
        }
        .st-editor-hint { font-size:10px !important; color:rgba(255,255,255,0.18) !important; }
        .st-editor-clear {
            all:unset !important; font-size:10px !important; color:rgba(255,255,255,0.22) !important;
            cursor:pointer !important; padding:3px 8px !important;
            border:0.5px solid rgba(255,255,255,0.08) !important; border-radius:5px !important;
            transition:all 0.13s !important;
        }
        .st-editor-clear:hover { color:rgba(220,100,100,0.8) !important; border-color:rgba(220,100,100,0.3) !important; }
    
        /* ── Toast stack ── */
        #__st_toast_stack__ { position:fixed !important; bottom:20px !important; left:50% !important; transform:translateX(-50%) !important; z-index:2147483647 !important; display:flex !important; flex-direction:column !important; gap:7px !important; pointer-events:none !important; width:min(320px,calc(100vw - 32px)) !important; }
        .sp-toast { display:flex !important; flex-direction:column !important; background:rgba(22,20,28,0.97) !important; backdrop-filter:blur(40px) saturate(180%) !important; -webkit-backdrop-filter:blur(40px) saturate(180%) !important; border:0.5px solid rgba(255,255,255,0.12) !important; border-radius:15px !important; box-shadow:0 1px 0 rgba(255,255,255,0.08) inset,0 16px 48px rgba(0,0,0,0.6) !important; pointer-events:all !important; animation:st-toast-in 0.4s cubic-bezier(0.34,1.2,0.64,1) both !important; overflow:hidden !important; }
        .sp-toast.sp-toast-out { animation:st-toast-out 0.22s cubic-bezier(0.4,0,1,1) forwards !important; }
        /* top row: square icon + text */
        .sp-toast-head { display:flex !important; align-items:center !important; gap:11px !important; padding:12px 13px 10px !important; }
        .sp-toast-icon-sq { width:34px !important; height:34px !important; border-radius:9px !important; flex-shrink:0 !important; display:flex !important; align-items:center !important; justify-content:center !important; }
        .sp-toast-ok  .sp-toast-icon-sq { background:hsla(145,60%,45%,0.18) !important; color:hsl(145,65%,62%) !important; border:0.5px solid hsla(145,60%,45%,0.3) !important; }
        .sp-toast-err .sp-toast-icon-sq { background:hsla(35,90%,55%,0.18) !important; color:hsl(35,90%,65%) !important; border:0.5px solid hsla(35,90%,55%,0.32) !important; }
        .sp-toast-info .sp-toast-icon-sq { background:hsla(210,75%,55%,0.18) !important; color:hsl(210,85%,72%) !important; border:0.5px solid hsla(210,75%,55%,0.3) !important; }
        .sp-toast-text { flex:1 !important; min-width:0 !important; }
        .sp-toast-title { font-size:12px !important; font-weight:700 !important; color:rgba(255,255,255,0.96) !important; line-height:1.3 !important; letter-spacing:-0.01em !important; }
        .sp-toast-detail { font-size:11px !important; color:rgba(255,255,255,0.48) !important; margin-top:2px !important; line-height:1.4 !important; }
        /* footer: full-width button row */
        .sp-toast-footer { display:flex !important; gap:6px !important; padding:0 8px 8px !important; }
        .sp-toast-footer .sp-toast-btn { all:unset !important; flex:1 !important; text-align:center !important; padding:7px 10px !important; border-radius:8px !important; font-size:11.5px !important; font-weight:600 !important; cursor:pointer !important; transition:filter 0.15s,background 0.15s !important; font-family:inherit !important; box-sizing:border-box !important; }
        .sp-toast-footer .sp-toast-btn { background:rgba(255,255,255,0.09) !important; color:rgba(255,255,255,0.85) !important; border:0.5px solid rgba(255,255,255,0.1) !important; }
        .sp-toast-footer .sp-toast-btn:hover { background:rgba(255,255,255,0.14) !important; }
        .sp-toast-footer .sp-toast-btn.primary { background:rgba(255,255,255,0.92) !important; color:#15101a !important; border-color:transparent !important; }
        .sp-toast-footer .sp-toast-btn.primary:hover { background:#fff !important; }
        /* progress bar */
        .sp-toast-progress { height:2px !important; flex-shrink:0 !important; animation-name:st-toast-progress !important; animation-timing-function:linear !important; animation-fill-mode:both !important; }
        .sp-toast-ok  .sp-toast-progress { background:hsl(145,55%,48%) !important; }
        .sp-toast-err .sp-toast-progress { background:hsl(35,85%,52%) !important; }
        .sp-toast-info .sp-toast-progress { background:hsl(210,70%,58%) !important; }
        /* ── Install spinner ── */
        .st-spinner { display:inline-block !important; width:10px !important; height:10px !important; border:1.5px solid rgba(255,255,255,0.15) !important; border-top-color:rgba(255,255,255,0.55) !important; border-radius:50% !important; animation:st-spin 0.7s linear infinite !important; vertical-align:middle !important; margin-right:5px !important; }
    
        /* ── Marketplace tab ── */
        #__st_marketplace_wrap__ { display:none !important; flex-direction:column !important; }
        #__st_marketplace_wrap__.active { display:flex !important; }
        .st-mkt-coming { padding:36px 24px 32px !important; display:flex !important; flex-direction:column !important; align-items:center !important; text-align:center !important; gap:10px !important; animation:st-fade-up 0.4s cubic-bezier(0.22,1,0.36,1) both !important; }
        .st-mkt-ico { font-size:28px !important; animation:st-pop 0.5s cubic-bezier(0.34,1.2,0.64,1) 0.05s both !important; }
        .st-mkt-title { font-size:13px !important; font-weight:500 !important; color:rgba(255,255,255,0.72) !important; }
        .st-mkt-sub { font-size:11px !important; color:rgba(255,255,255,0.28) !important; line-height:1.65 !important; max-width:340px !important; }
        .st-mkt-actions { display:flex !important; gap:8px !important; margin-top:6px !important; }
        .st-mkt-link { all:unset !important; display:inline-flex !important; align-items:center !important; gap:5px !important; padding:6px 13px !important; background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.09) !important; border-radius:7px !important; font-size:11px !important; color:rgba(255,255,255,0.38) !important; cursor:pointer !important; transition:all 0.13s !important; }
        .st-mkt-link:hover { background:rgba(255,255,255,0.09) !important; color:rgba(255,255,255,0.65) !important; border-color:rgba(255,255,255,0.16) !important; }
        /* Live marketplace cards */
        .st-mkt-list { padding:6px !important; overflow-y:auto !important; max-height:340px !important; }
        .st-mkt-list::-webkit-scrollbar { width:3px !important; }
        .st-mkt-list::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09) !important; border-radius:2px !important; }
        .st-mkt-card { display:flex !important; align-items:center !important; gap:10px !important; padding:9px 11px !important; border-radius:9px !important; border:0.5px solid transparent !important; cursor:default !important; transition:background 0.18s,border-color 0.22s !important; margin-bottom:2px !important; animation:st-card-in 0.38s cubic-bezier(0.22,1,0.36,1) both !important; }
        .st-mkt-card:hover { background:rgba(255,255,255,0.035) !important; border-color:rgba(255,255,255,0.07) !important; }
        .st-mkt-card-icon { width:32px !important; height:32px !important; border-radius:8px !important; background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.08) !important; display:flex !important; align-items:center !important; justify-content:center !important; flex-shrink:0 !important; font-size:15px !important; }
        .st-mkt-card-body { flex:1 !important; min-width:0 !important; }
        .st-mkt-card-name { font-size:12px !important; font-weight:500 !important; color:rgba(255,255,255,0.78) !important; margin-bottom:2px !important; white-space:nowrap !important; overflow:hidden !important; text-overflow:ellipsis !important; }
        .st-mkt-card-meta { font-size:10px !important; color:rgba(255,255,255,0.22) !important; display:flex !important; align-items:center !important; gap:7px !important; }
        .st-mkt-card-desc { font-size:10px !important; color:rgba(255,255,255,0.28) !important; margin-top:3px !important; white-space:nowrap !important; overflow:hidden !important; text-overflow:ellipsis !important; }
        .st-mkt-stars { display:inline-flex !important; align-items:center !important; gap:2px !important; color:rgba(255,210,60,0.6) !important; }
        .st-mkt-install-btn { all:unset !important; padding:4px 11px !important; background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:6px !important; font-size:10px !important; color:rgba(255,255,255,0.42) !important; cursor:pointer !important; transition:all 0.13s !important; white-space:nowrap !important; flex-shrink:0 !important; }
        .st-mkt-install-btn:hover { background:rgba(255,255,255,0.1) !important; color:rgba(255,255,255,0.72) !important; border-color:rgba(255,255,255,0.18) !important; }
        .st-mkt-install-btn:disabled { opacity:0.35 !important; cursor:default !important; }
        .st-mkt-install-btn.installed { color:rgba(100,200,130,0.65) !important; border-color:rgba(100,200,130,0.2) !important; background:rgba(100,200,130,0.06) !important; cursor:default !important; }
        .st-mkt-filter-bar { display:flex !important; gap:4px !important; padding:6px 8px !important; border-bottom:0.5px solid rgba(255,255,255,0.05) !important; }
        .st-mkt-filter { all:unset !important; padding:3px 9px !important; border-radius:5px !important; font-size:10px !important; color:rgba(255,255,255,0.28) !important; cursor:pointer !important; transition:all 0.13s !important; }
        .st-mkt-filter:hover { background:rgba(255,255,255,0.05) !important; color:rgba(255,255,255,0.5) !important; }
        .st-mkt-filter.active { background:rgba(255,255,255,0.08) !important; color:rgba(255,255,255,0.72) !important; }
    
        /* ── Player Backend picker (About tab) ── */
        .st-be-grid { display:grid !important; grid-template-columns:1fr 1fr !important; gap:5px !important; padding:8px 14px !important; }
        .st-be-card {
            all:unset !important; display:flex !important; flex-direction:column !important; align-items:center !important;
            gap:4px !important; padding:8px 6px !important; border-radius:9px !important;
            border:0.5px solid rgba(255,255,255,0.07) !important; cursor:pointer !important;
            transition:background 0.16s,border-color 0.2s,box-shadow 0.2s !important;
            text-align:center !important;
        }
        .st-be-card:hover { background:rgba(255,255,255,0.04) !important; border-color:rgba(255,255,255,0.13) !important; }
        .st-be-card.active {
            background:rgba(255,255,255,0.06) !important; border-color:rgba(255,255,255,0.2) !important;
            box-shadow:0 0 0 1px rgba(255,255,255,0.1) inset !important;
        }
        .st-be-card-icon { font-size:17px !important; line-height:1 !important; }
        .st-be-card-name { font-size:10px !important; font-weight:500 !important; color:rgba(255,255,255,0.65) !important; line-height:1.3 !important; }
        .st-be-card-hint { font-size:9px !important; color:rgba(255,255,255,0.22) !important; line-height:1.35 !important; }
        .st-be-card.active .st-be-card-name { color:rgba(255,255,255,0.88) !important; }
        .st-svc-status-row { display:flex !important; align-items:center !important; gap:6px !important; padding:4px 14px 8px !important; }
        .st-svc-dot {
            width:6px !important; height:6px !important; border-radius:50% !important; flex-shrink:0 !important;
            background:rgba(255,255,255,0.15) !important; transition:background 0.35s !important;
        }
        .st-svc-dot.ok   { background:#4caf50 !important; }
        .st-svc-dot.fail { background:#e53935 !important; }
        .st-svc-dot.checking { animation:__st_blink__ 0.9s ease-in-out infinite !important; }
        @keyframes __st_blink__ { 0%,100%{opacity:.2} 50%{opacity:1} }
        .st-svc-status-txt { font-size:10px !important; color:rgba(255,255,255,0.28) !important; }
        /* MPV prefs rows (shown when mpv is active) */
        .st-mpv-prefs { padding:0 14px 10px !important; display:none !important; flex-direction:column !important; gap:6px !important; }
        .st-mpv-prefs.visible { display:flex !important; }
        .st-mpv-pref-row { display:flex !important; flex-direction:column !important; gap:3px !important; }
        .st-mpv-pref-label { font-size:9px !important; color:rgba(255,255,255,0.28) !important; text-transform:uppercase !important; letter-spacing:0.06em !important; font-weight:500 !important; }
        .st-mpv-pref-input {
            all:unset !important; background:rgba(255,255,255,0.04) !important;
            border:0.5px solid rgba(255,255,255,0.09) !important; border-radius:6px !important;
            padding:5px 9px !important; font-size:10px !important; color:rgba(255,255,255,0.6) !important;
            font-family:"SF Mono",ui-monospace,Menlo,monospace !important;
            transition:border-color 0.14s !important; width:100% !important; box-sizing:border-box !important;
        }
        .st-mpv-pref-input:focus { border-color:rgba(255,255,255,0.22) !important; color:rgba(255,255,255,0.85) !important; }
        .st-mpv-save-btn {
            all:unset !important; align-self:flex-start !important; padding:4px 11px !important;
            background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.1) !important;
            border-radius:6px !important; font-size:10px !important; color:rgba(255,255,255,0.4) !important;
            cursor:pointer !important; transition:all 0.13s !important; margin-top:2px !important;
        }
        .st-mpv-save-btn:hover { background:rgba(255,255,255,0.1) !important; color:rgba(255,255,255,0.78) !important; }

        /* ── About / Stremio+ tab ── */
        #__st_about_wrap__ { display:none !important; flex-direction:column !important; }
        #__st_about_wrap__.active { display:flex !important; animation:st-fade-up 0.35s cubic-bezier(0.22,1,0.36,1) both !important; }
        .st-about-hero { padding:22px 20px 16px !important; display:flex !important; align-items:center !important; gap:12px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important; }
        .st-about-logo { width:36px !important; height:36px !important; border-radius:10px !important; background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important; display:flex !important; align-items:center !important; justify-content:center !important; font-size:12px !important; font-weight:600 !important; color:rgba(255,255,255,0.7) !important; letter-spacing:-0.02em !important; flex-shrink:0 !important; }
        .st-about-name { font-size:14px !important; font-weight:500 !important; color:rgba(255,255,255,0.82) !important; }
        .st-about-version { font-size:11px !important; color:rgba(255,255,255,0.25) !important; margin-left:auto !important; background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.08) !important; border-radius:5px !important; padding:2px 8px !important; }
        .st-about-body { padding:8px 0 !important; overflow-y:auto !important; max-height:280px !important; }
        .st-about-body::-webkit-scrollbar { width:3px !important; }
        .st-about-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09) !important; border-radius:2px !important; }
        .st-about-section { padding:4px 0 !important; border-bottom:0.5px solid rgba(255,255,255,0.04) !important; }
        .st-about-section:last-child { border-bottom:none !important; }
        .st-about-section-title { padding:8px 16px 4px !important; font-size:9px !important; font-weight:500 !important; color:rgba(255,255,255,0.2) !important; letter-spacing:0.08em !important; text-transform:uppercase !important; }
        .st-about-row { display:flex !important; align-items:center !important; padding:7px 16px !important; gap:12px !important; transition:background 0.12s !important; }
        .st-about-row:hover { background:rgba(255,255,255,0.02) !important; }
        .st-about-label { font-size:11px !important; color:rgba(255,255,255,0.28) !important; min-width:110px !important; flex-shrink:0 !important; }
        .st-about-val { font-size:11px !important; color:rgba(255,255,255,0.6) !important; }
        .st-about-link { font-size:11px !important; color:rgba(255,255,255,0.38) !important; text-decoration:none !important; transition:color 0.13s !important; cursor:pointer !important; }
        .st-about-link:hover { color:rgba(255,255,255,0.7) !important; text-decoration:underline !important; }
        .st-about-path { cursor:pointer !important; font-family:"SF Mono",ui-monospace,Menlo,monospace !important; font-size:10px !important; color:rgba(255,255,255,0.35) !important; transition:color 0.13s !important; overflow:hidden !important; text-overflow:ellipsis !important; white-space:nowrap !important; max-width:280px !important; display:inline-block !important; }
        .st-about-path:hover { color:rgba(255,255,255,0.6) !important; }
        .st-about-path.copied { color:rgba(140,210,140,0.8) !important; }
        .st-about-footer { padding:10px 14px !important; border-top:0.5px solid rgba(255,255,255,0.06) !important; display:flex !important; gap:6px !important; }
        .st-about-btn { all:unset !important; display:inline-flex !important; align-items:center !important; gap:5px !important; padding:6px 12px !important; background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.09) !important; border-radius:7px !important; font-size:11px !important; color:rgba(255,255,255,0.38) !important; cursor:pointer !important; transition:all 0.13s !important; }
        .st-about-btn:hover { background:rgba(255,255,255,0.09) !important; color:rgba(255,255,255,0.65) !important; border-color:rgba(255,255,255,0.16) !important; }
        .st-about-btn:disabled { opacity:0.35 !important; cursor:default !important; }
        .st-about-btn svg { opacity:0.6 !important; }
        .st-about-btn:hover svg { opacity:1 !important; }
        .st-about-btn.spinning svg { animation:st-spin 0.8s linear infinite !important; }

        /* ── Safe mode banner ── */
        #__st_safemode_banner__ {
            display:none !important; align-items:center !important; gap:8px !important;
            padding:6px 14px !important; background:rgba(230,126,34,0.1) !important;
            border-bottom:0.5px solid rgba(230,126,34,0.2) !important;
            font-size:11px !important; color:rgba(255,170,80,0.85) !important;
        }
        #__st_safemode_banner__.active { display:flex !important; }
        .st-safemode-exit { all:unset !important; margin-left:auto !important; padding:2px 8px !important;
            background:rgba(230,126,34,0.12) !important; border:0.5px solid rgba(230,126,34,0.3) !important;
            border-radius:4px !important; font-size:10px !important; color:rgba(255,170,80,0.8) !important;
            cursor:pointer !important; transition:all 0.13s !important; }
        .st-safemode-exit:hover { background:rgba(230,126,34,0.2) !important; color:rgba(255,190,100,1) !important; }
        /* ── Error log panel ── */
        .st-errlog-panel { max-height:0 !important; overflow:hidden !important; opacity:0 !important;
            transition:max-height 0.35s cubic-bezier(0.34,1.1,0.64,1),opacity 0.25s !important; }
        .st-card.expanded .st-errlog-panel { max-height:200px !important; opacity:1 !important; }
        .st-errlog-inner { margin:0 11px 8px !important; background:rgba(200,60,60,0.06) !important;
            border:0.5px solid rgba(200,60,60,0.15) !important; border-radius:8px !important; overflow:hidden !important; }
        .st-errlog-title { padding:5px 10px !important; font-size:9px !important; font-weight:500 !important;
            color:rgba(220,120,120,0.7) !important; letter-spacing:0.06em !important; text-transform:uppercase !important;
            border-bottom:0.5px solid rgba(200,60,60,0.1) !important; display:flex !important; align-items:center !important;
            justify-content:space-between !important; }
        .st-errlog-clear { all:unset !important; font-size:9px !important; color:rgba(220,120,120,0.5) !important;
            cursor:pointer !important; transition:color 0.13s !important; }
        .st-errlog-clear:hover { color:rgba(220,120,120,0.9) !important; }
        .st-errlog-list { max-height:140px !important; overflow-y:auto !important; padding:4px 0 !important; }
        .st-errlog-list::-webkit-scrollbar { width:2px !important; }
        .st-errlog-list::-webkit-scrollbar-thumb { background:rgba(220,60,60,0.2) !important; }
        .st-errlog-entry { padding:4px 10px !important; font-size:10px !important; color:rgba(255,160,160,0.75) !important;
            font-family:"SF Mono",ui-monospace,Menlo,monospace !important; line-height:1.4 !important;
            border-bottom:0.5px solid rgba(200,60,60,0.07) !important; white-space:pre-wrap !important; word-break:break-all !important; }
        .st-errlog-entry:last-child { border-bottom:none !important; }
        .st-errlog-empty { padding:10px !important; font-size:10px !important; color:rgba(255,255,255,0.18) !important; text-align:center !important; }
        /* ── Plugin notes ── */
        .st-notes-row { border-top:0.5px solid rgba(255,255,255,0.05) !important; }
        .st-notes-header {
            display:flex !important; align-items:center !important; justify-content:space-between !important;
            padding:8px 11px 0 !important; cursor:pointer !important; user-select:none !important;
            transition:background 0.12s !important;
        }
        .st-notes-header:hover { background:rgba(255,255,255,0.02) !important; }
        .st-notes-label { font-size:9px !important; font-weight:500 !important; color:rgba(255,255,255,0.2) !important;
            letter-spacing:0.06em !important; text-transform:uppercase !important; display:flex !important; align-items:center !important; gap:5px !important; }
        .st-notes-chevron { color:rgba(255,255,255,0.15) !important; transition:transform 0.25s cubic-bezier(0.34,1.15,0.64,1) !important; font-size:8px !important; }
        .st-notes-body { overflow:hidden !important; max-height:0 !important; opacity:0 !important;
            transition:max-height 0.3s cubic-bezier(0.34,1.1,0.64,1),opacity 0.22s ease !important; }
        .st-notes-body.open { max-height:200px !important; opacity:1 !important; }
        .st-notes-chevron.open { transform:rotate(90deg) !important; color:rgba(255,255,255,0.3) !important; }
        .st-notes-dot { width:5px !important; height:5px !important; border-radius:50% !important;
            background:rgba(255,220,80,0.6) !important; flex-shrink:0 !important; }
        .st-notes-input { all:unset !important; display:block !important; width:100% !important; box-sizing:border-box !important;
            background:rgba(255,255,255,0.03) !important; border:0.5px solid rgba(255,255,255,0.07) !important;
            border-radius:7px !important; padding:6px 9px !important; font-size:11px !important;
            color:rgba(255,255,255,0.55) !important; line-height:1.45 !important; resize:none !important;
            min-height:52px !important; transition:border-color 0.15s,background 0.15s !important;
            margin:6px 11px 10px !important; width:calc(100% - 22px) !important; }
        .st-notes-input:focus { border-color:rgba(255,255,255,0.14) !important; background:rgba(255,255,255,0.05) !important; }
        .st-notes-input::placeholder { color:rgba(255,255,255,0.14) !important; }
        /* ── Keyboard nav ── */
        .st-card.kb-focused { background:rgba(255,255,255,0.055) !important; border-color:rgba(255,255,255,0.1) !important; }
        /* ── Live preview ── */
        .st-preview-btn { all:unset !important; padding:3px 8px !important; font-size:9px !important;
            background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.09) !important;
            border-radius:4px !important; color:rgba(255,255,255,0.32) !important; cursor:pointer !important;
            transition:all 0.13s !important; margin-right:4px !important; flex-shrink:0 !important; }
        .st-preview-btn:hover { background:rgba(255,255,255,0.09) !important; color:rgba(255,255,255,0.6) !important; }
        .st-preview-btn.active { background:rgba(100,200,150,0.1) !important; border-color:rgba(100,200,150,0.25) !important; color:rgba(100,210,160,0.8) !important; }
        /* ── Theme CSS var sliders ── */
        .st-themevar-section-title { padding:6px 14px 2px !important; font-size:9px !important; font-weight:500 !important;
            color:rgba(255,255,255,0.18) !important; letter-spacing:0.07em !important; text-transform:uppercase !important; }
        .st-themevar-row { display:flex !important; align-items:center !important; justify-content:space-between !important;
            padding:8px 14px !important; gap:12px !important; border-bottom:0.5px solid rgba(255,255,255,0.04) !important; }
        .st-themevar-row:last-child { border-bottom:none !important; }
        .st-themevar-name { font-size:10px !important; color:rgba(255,255,255,0.45) !important;
            font-family:"SF Mono",ui-monospace,Menlo,monospace !important; flex:1 !important; min-width:0 !important;
            overflow:hidden !important; text-overflow:ellipsis !important; white-space:nowrap !important; }
        /* ── Conflict badge ── */
        .st-conflict-badge { display:inline-flex !important; align-items:center !important; gap:3px !important;
            padding:1px 5px !important; border-radius:3px !important; font-size:9px !important; font-weight:500 !important;
            background:rgba(241,196,15,0.08) !important; border:0.5px solid rgba(241,196,15,0.2) !important;
            color:rgba(241,196,15,0.7) !important; margin-left:4px !important; cursor:default !important;
            animation:st-badge-in 0.25s both !important; }
        .st-conflict-note { padding:6px 12px !important; font-size:10px !important; line-height:1.45 !important;
            color:rgba(241,196,15,0.65) !important; background:rgba(241,196,15,0.04) !important;
            border-bottom:0.5px solid rgba(241,196,15,0.1) !important; }
        /* ── Changelog modal ── */
        #__st_changelog_modal__ { position:fixed !important; inset:0 !important; z-index:2147483647 !important;
            background:rgba(0,0,0,0.55) !important; display:none !important; align-items:center !important;
            justify-content:center !important; }
        #__st_changelog_modal__.open { display:flex !important; }
        .st-cl-panel { width:min(500px,calc(100vw - 40px)) !important; max-height:80vh !important;
            background:rgba(20,20,24,0.97) !important; backdrop-filter:blur(40px) !important;
            -webkit-backdrop-filter:blur(40px) !important;
            border:0.5px solid rgba(255,255,255,0.12) !important; border-radius:14px !important;
            box-shadow:0 12px 48px rgba(0,0,0,0.6) !important; display:flex !important; flex-direction:column !important;
            animation:st-card-in 0.32s cubic-bezier(0.34,1.15,0.64,1) both !important; }
        .st-cl-header { display:flex !important; align-items:center !important; padding:14px 16px !important;
            border-bottom:0.5px solid rgba(255,255,255,0.07) !important; gap:8px !important; }
        .st-cl-title { font-size:13px !important; font-weight:500 !important; color:rgba(255,255,255,0.8) !important; flex:1 !important; }
        .st-cl-sub { font-size:10px !important; color:rgba(255,255,255,0.25) !important; }
        .st-cl-close { all:unset !important; width:22px !important; height:22px !important; border-radius:6px !important;
            background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.08) !important;
            display:flex !important; align-items:center !important; justify-content:center !important;
            font-size:12px !important; color:rgba(255,255,255,0.35) !important; cursor:pointer !important; transition:all 0.13s !important; }
        .st-cl-close:hover { background:rgba(255,255,255,0.1) !important; color:rgba(255,255,255,0.7) !important; }
        .st-cl-body { overflow-y:auto !important; padding:14px 16px !important; flex:1 !important; }
        .st-cl-body::-webkit-scrollbar { width:3px !important; }
        .st-cl-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09) !important; border-radius:2px !important; }
        .st-cl-body p,.st-cl-body li { font-size:11px !important; color:rgba(255,255,255,0.42) !important; line-height:1.6 !important; margin-bottom:4px !important; }
        .st-cl-body h3 { font-size:12px !important; font-weight:500 !important; color:rgba(255,255,255,0.7) !important; margin:12px 0 5px !important; }
        .st-cl-body ul { padding-left:14px !important; margin-bottom:8px !important; }
        .st-cl-tag { display:inline-block !important; padding:1px 6px !important; background:rgba(255,255,255,0.06) !important;
            border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:4px !important;
            font-size:10px !important; color:rgba(255,255,255,0.35) !important; margin-bottom:10px !important; }
        .st-cl-loading { padding:32px !important; text-align:center !important; font-size:11px !important; color:rgba(255,255,255,0.22) !important; }
        /* ── Plugin wizard ── */
        /* ── Plugin wizard (now inside dev tab) ── */
        .st-wiz-form { padding:12px !important; display:flex !important; flex-direction:column !important; gap:8px !important; overflow-y:auto !important; max-height:320px !important; }
        .st-wiz-form::-webkit-scrollbar { width:3px !important; }
        .st-wiz-row { display:flex !important; flex-direction:column !important; gap:4px !important; }
        .st-wiz-label { font-size:10px !important; color:rgba(255,255,255,0.28) !important; }
        .st-wiz-input { all:unset !important; background:rgba(255,255,255,0.05) !important;
            border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:7px !important;
            padding:6px 10px !important; font-size:12px !important; color:rgba(255,255,255,0.7) !important;
            width:100% !important; box-sizing:border-box !important; transition:border-color 0.15s !important; }
        .st-wiz-input:focus { border-color:rgba(255,255,255,0.25) !important; }
        .st-wiz-row-h { display:flex !important; gap:8px !important; }
        .st-wiz-row-h .st-wiz-row { flex:1 !important; }
        .st-wiz-footer { display:flex !important; gap:6px !important; padding:8px 12px !important;
            border-top:0.5px solid rgba(255,255,255,0.06) !important; }
        .st-wiz-btn { all:unset !important; flex:1 !important; text-align:center !important; padding:7px !important;
            background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important;
            border-radius:7px !important; font-size:11px !important; color:rgba(255,255,255,0.45) !important;
            cursor:pointer !important; transition:all 0.13s !important; }
        .st-wiz-btn:hover { background:rgba(255,255,255,0.1) !important; color:rgba(255,255,255,0.75) !important; }
        .st-wiz-btn.primary { background:rgba(255,255,255,0.08) !important; color:rgba(255,255,255,0.7) !important;
            border-color:rgba(255,255,255,0.15) !important; }
        .st-wiz-btn.primary:hover { background:rgba(255,255,255,0.13) !important; color:rgba(255,255,255,0.9) !important; }
        .st-wiz-select { all:unset !important; background:rgba(255,255,255,0.05) !important;
            border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:7px !important;
            padding:6px 10px !important; font-size:12px !important; color:rgba(255,255,255,0.7) !important;
            width:100% !important; box-sizing:border-box !important; cursor:pointer !important; }
        /* ── Developer mode tab visibility ── */
        .st-tab[data-tab="developer"] { display:none !important; }
        #__st_root__.devmode .st-tab[data-tab="developer"] { display:flex !important; }

        /* ── Developer tab ── */
        #__st_dev_wrap__ { display:none !important; flex-direction:column !important; }
        #__st_dev_wrap__.active { display:flex !important; }
        .st-dev-subtabs { display:flex !important; gap:2px !important; padding:6px 10px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important; }
        .st-dev-subtab { all:unset !important; padding:5px 12px !important; font-size:10px !important; font-weight:500 !important; color:rgba(255,255,255,0.3) !important; cursor:pointer !important; border-radius:6px !important; transition:all 0.15s !important; letter-spacing:0.03em !important; }
        .st-dev-subtab:hover { color:rgba(255,255,255,0.55) !important; background:rgba(255,255,255,0.04) !important; }
        .st-dev-subtab.active { color:rgba(255,255,255,0.82) !important; background:rgba(255,255,255,0.07) !important; }
        .st-dev-panel { display:none !important; flex-direction:column !important; flex:1 !important; }
        .st-dev-panel.active { display:flex !important; }

        /* ── Plugin stats chart ── */
        .st-chart-wrap { padding:14px 16px 10px !important; }
        .st-chart-title { font-size:9px !important; font-weight:500 !important; color:rgba(255,255,255,0.2) !important; letter-spacing:0.08em !important; text-transform:uppercase !important; margin-bottom:10px !important; }
        #__st_stats_canvas__ { width:100% !important; height:120px !important; border-radius:8px !important; display:block !important; }
        .st-chart-legend { display:flex !important; gap:12px !important; margin-top:8px !important; flex-wrap:wrap !important; }
        .st-legend-item { display:flex !important; align-items:center !important; gap:5px !important; font-size:10px !important; color:rgba(255,255,255,0.35) !important; }
        .st-legend-dot { width:8px !important; height:8px !important; border-radius:50% !important; flex-shrink:0 !important; }
    `;
    document.head.appendChild(style);

    // ── New design system CSS (sp-* classes) ──────────────────────────────────────
    const spStyle = document.createElement('style');
    spStyle.textContent = `
        /* ── CSS custom properties ── */
        #__st_root__ { --accent:hsl(270 75% 70%); --accent-glow:hsla(270,80%,65%,0.35); --accent-soft:hsla(270,75%,70%,0.12); --accent-h:270; --st-accent:hsl(270 75% 70%); --st-accent-glow:hsla(270,80%,65%,0.35); }
        /* ── Panel container ── */
        #__st_panel__ { width:min(640px,calc(100vw - 32px)) !important; border-radius:22px !important; background:linear-gradient(180deg,hsla(var(--accent-h,270),28%,16%,0.4) 0%,rgba(18,16,24,0.55) 60%,rgba(10,9,14,0.65) 100%) !important; background-color:rgba(14,12,18,0.62) !important; backdrop-filter:blur(48px) saturate(180%) !important; -webkit-backdrop-filter:blur(48px) saturate(180%) !important; border:none !important; box-shadow:0 0 0 0.5px rgba(255,255,255,0.1),0 0 0 0.5px rgba(255,255,255,0.06) inset,0 1px 0 0 rgba(255,255,255,0.08) inset,0 30px 80px rgba(0,0,0,0.6),0 8px 24px rgba(0,0,0,0.4),0 0 70px 8px var(--accent-glow,rgba(120,80,255,0.18)) !important; max-height:min(82vh,880px) !important; overflow:hidden !important; display:flex !important; flex-direction:column !important; }
        #__st_panel__::before { content:"" !important; position:absolute !important; top:0 !important; left:12% !important; right:12% !important; height:1px !important; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent) !important; pointer-events:none !important; z-index:1 !important; border-radius:0 !important; }
        /* ── Tab bar ── */
        .st-tabs { overflow-x:auto !important; scrollbar-width:none !important; padding:8px 14px !important; gap:2px !important; flex-wrap:nowrap !important; border-bottom:0.5px solid rgba(255,255,255,0.05) !important; flex-shrink:0 !important; }
        .st-tabs::-webkit-scrollbar { display:none !important; }
        .st-tab { white-space:nowrap !important; font-size:12px !important; letter-spacing:0.005em !important; border-radius:8px !important; padding:8px 12px !important; gap:6px !important; flex-shrink:0 !important; display:inline-flex !important; align-items:center !important; }
        .st-tab.active { background:var(--accent-soft,rgba(255,255,255,0.08)) !important; color:rgba(255,255,255,0.96) !important; }
        .st-tab-count { background:rgba(255,255,255,0.06) !important; font-size:10px !important; border-radius:999px !important; padding:1px 6px !important; height:auto !important; min-width:auto !important; }
        .st-tab.active .st-tab-count { background:var(--accent-soft,rgba(255,255,255,0.12)) !important; color:var(--accent,rgba(255,255,255,0.9)) !important; }
        /* ── Search row ── */
        .st-search-row { padding:18px 22px !important; flex-shrink:0 !important; }
        .st-search-input { font-size:14px !important; caret-color:var(--accent,rgba(255,255,255,0.9)) !important; }
        /* ── List/scroll area ── */
        .st-list { flex:1 !important; max-height:none !important; padding:12px 14px 12px !important; overflow-y:auto !important; }
        .st-url-row { flex-shrink:0 !important; }
        /* activity wrap fills the same flex slot */
        #__st_activity_wrap__ { max-height:none !important; flex:1 !important; }
        #__st_dev_wrap__ { flex:1 !important; overflow-y:auto !important; max-height:none !important; }
        #__st_marketplace_wrap__ { flex:1 !important; overflow-y:auto !important; max-height:none !important; }
        /* ── Card overrides ── */
        @keyframes sp-list-in { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }
        @keyframes sp-settings-in { from { opacity:0; transform:translateY(-5px) scaleY(0.97); } to { opacity:1; transform:none; } }
        .st-card { border-radius:12px !important; border:0.5px solid rgba(255,255,255,0.05) !important; background:rgba(255,255,255,0.02) !important; margin-bottom:6px !important; transition:background 0.22s,border-color 0.22s,box-shadow 0.22s,transform 0.18s !important; }
        .st-card:hover { background:rgba(255,255,255,0.05) !important; border-color:rgba(255,255,255,0.1) !important; transform:translateY(-1px) !important; }
        .st-card.expanded { background:rgba(255,255,255,0.06) !important; border-color:rgba(255,255,255,0.14) !important; transform:none !important; }
        .st-card-main { gap:13px !important; }
        .st-card-icon { width:40px !important; height:40px !important; border-radius:10px !important; font-size:14px !important; font-weight:600 !important; background:hsl(var(--icon-hue,270) 35% 28% / 0.5) !important; border:0.5px solid hsl(var(--icon-hue,270) 70% 60% / 0.3) !important; color:hsl(var(--icon-hue,270) 80% 80%) !important; text-shadow:0 0 12px hsl(var(--icon-hue,270) 80% 60% / 0.6) !important; box-shadow:0 0 18px hsl(var(--icon-hue,270) 70% 40% / 0.18) inset !important; }
        .st-card-name { font-size:13px !important; font-weight:600 !important; color:rgba(255,255,255,0.94) !important; letter-spacing:-0.005em !important; white-space:normal !important; margin-bottom:0 !important; overflow:visible !important; text-overflow:unset !important; }
        .st-card-desc { font-size:11.5px !important; color:rgba(255,255,255,0.45) !important; margin-top:4px !important; line-height:1.45 !important; }
        .st-card-meta { display:flex !important; align-items:center !important; gap:10px !important; margin-top:6px !important; font-size:10.5px !important; color:rgba(255,255,255,0.4) !important; flex-wrap:wrap !important; }
        .st-card-meta > span { font-size:10px !important; color:rgba(255,255,255,0.3) !important; }
        .st-chevron { color:rgba(255,255,255,0.25) !important; transition:transform 0.32s,color 0.18s !important; }
        .st-card.expanded .st-chevron { transform:rotate(90deg) !important; color:var(--accent,rgba(255,255,255,0.9)) !important; }
        /* ── Toggle ── */
        .st-toggle { width:30px !important; height:18px !important; border-radius:10px !important; background:rgba(255,255,255,0.1) !important; border:0.5px solid rgba(255,255,255,0.08) !important; flex-shrink:0 !important; }
        .st-toggle.on { background:var(--accent,rgba(255,255,255,0.9)) !important; border-color:var(--accent,rgba(255,255,255,0.9)) !important; box-shadow:0 0 0 3px var(--accent-soft,rgba(255,255,255,0.12)) !important; }
        .st-toggle-knob { width:13px !important; height:13px !important; border-radius:50% !important; background:rgba(255,255,255,0.55) !important; box-shadow:0 1px 3px rgba(0,0,0,0.4) !important; }
        .st-toggle.on .st-toggle-knob { transform:translateX(12px) !important; background:#fff !important; }
        /* ── Settings panel inside card ── */
        .st-settings-panel { margin:0 12px 12px !important; background:rgba(0,0,0,0.18) !important; border-radius:10px !important; border:0.5px solid rgba(255,255,255,0.05) !important; overflow:hidden !important; animation:sp-settings-in 0.34s cubic-bezier(0.34,1.1,0.64,1) !important; }
        .st-settings-inner { padding:0 !important; }
        .st-s-row { display:flex !important; align-items:center !important; justify-content:space-between !important; padding:11px 14px !important; gap:18px !important; border-bottom:0.5px solid rgba(255,255,255,0.04) !important; }
        .st-s-row:last-child { border-bottom:none !important; }
        .st-s-row:hover { background:rgba(255,255,255,0.02) !important; }
        .st-s-label { font-size:12px !important; color:rgba(255,255,255,0.78) !important; font-weight:500 !important; }
        .st-s-hint { font-size:10.5px !important; color:rgba(255,255,255,0.32) !important; }
        /* ── Theme logo (gradient monogram) ── */
        .sp-theme-logo { position:relative !important; flex-shrink:0 !important; width:44px !important; height:44px !important; border-radius:12px !important; overflow:hidden !important; border:0.5px solid rgba(255,255,255,0.12) !important; background:radial-gradient(60% 80% at 30% 20%, var(--th-acc) 0%, transparent 60%),linear-gradient(135deg, var(--th-mid) 0%, var(--th-bg) 100%) !important; display:flex !important; align-items:center !important; justify-content:center !important; box-shadow:0 0 0 0.5px rgba(255,255,255,0.08) inset, 0 4px 12px rgba(0,0,0,0.3) !important; }
        .sp-theme-logo-glow { position:absolute !important; top:-8px !important; left:-8px !important; width:22px !important; height:22px !important; border-radius:50% !important; background:var(--th-acc) !important; filter:blur(8px) !important; opacity:0.7 !important; }
        .sp-theme-logo-mark { position:relative !important; font-size:13px !important; font-weight:700 !important; letter-spacing:-0.01em !important; color:rgba(255,255,255,0.95) !important; text-shadow:0 1px 4px rgba(0,0,0,0.5) !important; }
        /* Health dashboard in expanded plugin */
        .sp-health { display:flex !important; padding:10px 14px !important; border-bottom:0.5px solid rgba(255,255,255,0.05) !important; background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent) !important; }
        .sp-health-row { display:flex !important; align-items:center !important; gap:14px !important; flex-wrap:wrap !important; }
        .sp-health-pill { display:inline-flex !important; align-items:center !important; gap:5px !important; padding:3px 9px !important; border-radius:999px !important; font-size:10.5px !important; font-weight:600 !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.08) !important; }
        .sp-health-dot { width:6px !important; height:6px !important; border-radius:50% !important; box-shadow:0 0 6px currentColor !important; }
        .sp-health-ok { --hc:hsl(140,60%,65%) !important; }
        .sp-health-warn { --hc:hsl(35,85%,65%) !important; }
        .sp-health-bad { --hc:hsl(0,70%,65%) !important; }
        .sp-health-ok .sp-health-dot, .sp-health-warn .sp-health-dot, .sp-health-bad .sp-health-dot { background:var(--hc) !important; color:var(--hc) !important; }
        .sp-health-ok .sp-health-pill { color:hsl(140,60%,75%) !important; border-color:hsla(140,60%,65%,0.3) !important; }
        .sp-health-warn .sp-health-pill { color:hsl(35,85%,75%) !important; border-color:hsla(35,85%,65%,0.3) !important; }
        .sp-health-bad .sp-health-pill { color:hsl(0,70%,75%) !important; border-color:hsla(0,70%,65%,0.3) !important; }
        .sp-health-stat { display:inline-flex !important; flex-direction:column !important; gap:1px !important; line-height:1.2 !important; font-size:10px !important; color:rgba(255,255,255,0.35) !important; }
        .sp-health-stat b { font-size:11px !important; font-weight:600 !important; color:rgba(255,255,255,0.85) !important; font-variant-numeric:tabular-nums !important; }
        .sp-health-stat i { font-style:normal !important; font-size:9.5px !important; letter-spacing:0.03em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.32) !important; }
        /* Permission pill */
        .sp-perm { display:inline-flex !important; align-items:center !important; gap:3px !important; font-size:9px !important; font-weight:500 !important; letter-spacing:0.04em !important; padding:2px 6px !important; border-radius:4px !important; text-transform:uppercase !important; background:color-mix(in oklab,var(--c) 12%,transparent) !important; border:0.5px solid color-mix(in oklab,var(--c) 30%,transparent) !important; color:var(--c) !important; }
        /* Inline preview strip in marketplace */
        .sp-prev-strip { display:grid !important; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)) !important; gap:8px !important; padding:0 11px 12px !important; animation:st-fade-up 0.32s cubic-bezier(0.22,1,0.36,1) !important; }
        .sp-prev-tile { display:flex !important; flex-direction:column !important; gap:5px !important; border-radius:8px !important; overflow:hidden !important; }
        .sp-prev-art { position:relative !important; aspect-ratio:16/10 !important; border-radius:6px !important; overflow:hidden !important; border:0.5px solid rgba(255,255,255,0.08) !important; padding:10px !important; background:linear-gradient(135deg,var(--p0),var(--p1)) !important; }
        .sp-prev-art-bg { position:absolute !important; inset:0 !important; background:radial-gradient(circle at 70% 30%,hsla(0,0%,100%,0.08),transparent 60%) !important; }
        .sp-prev-art-row { height:5px !important; border-radius:3px !important; background:var(--p2) !important; opacity:0.85 !important; margin-bottom:4px !important; position:relative !important; }
        .sp-prev-art-pill { position:absolute !important; bottom:10px !important; right:10px !important; width:22px !important; height:22px !important; border-radius:50% !important; background:var(--p2) !important; opacity:0.9 !important; }
        .sp-prev-art-grid { display:grid !important; grid-template-columns:repeat(4,1fr) !important; gap:3px !important; position:absolute !important; bottom:10px !important; left:10px !important; right:38px !important; }
        .sp-prev-art-grid span { aspect-ratio:1 !important; border-radius:3px !important; background:rgba(255,255,255,0.08) !important; border:0.5px solid var(--p2) !important; opacity:0.55 !important; }
        .sp-prev-cap { font-size:10px !important; color:rgba(255,255,255,0.45) !important; padding-left:3px !important; }
        /* New dot on tabs */
        .sp-new-dot { width:5px !important; height:5px !important; border-radius:50% !important; background:var(--st-accent) !important; box-shadow:0 0 6px var(--st-accent) !important; display:inline-block !important; }
        /* Author chip */
        .sp-author-chip { all:unset !important; cursor:pointer !important; font-size:10px !important; color:rgba(255,255,255,0.42) !important; transition:color 0.15s !important; }
        .sp-author-chip span { color:rgba(255,255,255,0.7) !important; text-decoration:underline !important; text-decoration-color:rgba(255,255,255,0.15) !important; text-underline-offset:2px !important; }
        .sp-author-chip:hover span { color:var(--st-accent) !important; text-decoration-color:var(--st-accent) !important; }
        /* Trending badge */
        .sp-trend-badge { display:inline-flex !important; align-items:center !important; gap:3px !important; padding:2px 6px !important; border-radius:4px !important; font-size:9px !important; font-weight:600 !important; letter-spacing:0.04em !important; background:linear-gradient(90deg,hsla(35,90%,60%,0.18),hsla(15,90%,60%,0.18)) !important; border:0.5px solid hsla(35,90%,60%,0.35) !important; color:hsl(35,95%,75%) !important; }
        .sp-velocity { display:inline-flex !important; align-items:center !important; gap:4px !important; font-size:10px !important; color:rgba(255,255,255,0.4) !important; }
        .sp-velocity-delta { color:hsl(140,60%,65%) !important; font-weight:600 !important; font-size: 10px !important; }
        /* Activity tab */
        #__st_activity_wrap__ { display:none !important; flex-direction:column !important; overflow-y:auto !important; max-height:360px !important; padding:6px !important; gap:6px !important; }
        #__st_activity_wrap__.active { display:flex !important; }
        .sp-act { display:flex !important; align-items:center !important; gap:12px !important; padding:12px 14px !important; background:rgba(255,255,255,0.02) !important; border:0.5px solid rgba(255,255,255,0.04) !important; border-radius:10px !important; }
        .sp-act-dot { width:8px !important; height:8px !important; border-radius:50% !important; flex-shrink:0 !important; background:var(--act-c,hsl(150,65%,55%)) !important; box-shadow:0 0 8px var(--act-c,hsl(150,65%,55%)) !important; }
        .sp-act-ok { --act-c:hsl(150,65%,55%) !important; }
        .sp-act-info { --act-c:hsl(210,80%,65%) !important; }
        .sp-act-warn { --act-c:hsl(35,90%,65%) !important; }
        .sp-act-body { flex:1 !important; min-width:0 !important; }
        .sp-act-title { font-size:12px !important; font-weight:500 !important; color:rgba(255,255,255,0.85) !important; }
        .sp-act-detail { font-size:11px !important; color:rgba(255,255,255,0.45) !important; margin-top:1px !important; }
        .sp-act-time { font-size:10.5px !important; color:rgba(255,255,255,0.3) !important; font-variant-numeric:tabular-nums !important; }
        /* Author drawer overlay */
        #__st_author_overlay__ { position:fixed !important; inset:0 !important; z-index:2147483646 !important; background:rgba(0,0,0,0.55) !important; backdrop-filter:blur(6px) !important; display:none !important; align-items:center !important; justify-content:center !important; padding:24px !important; }
        #__st_author_overlay__.open { display:flex !important; animation:st-fade-up 0.18s ease-out !important; }
        .sp-auth-drawer { position:relative !important; width:min(520px,100%) !important; max-height:80vh !important; overflow-y:auto !important; background:rgba(20,18,32,0.92) !important; backdrop-filter:blur(40px) saturate(180%) !important; border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:18px !important; padding:20px !important; box-shadow:0 24px 60px rgba(0,0,0,0.5) !important; animation:st-pop 0.22s cubic-bezier(0.22,1,0.36,1) !important; }
        .sp-auth-close { all:unset !important; cursor:pointer !important; position:absolute !important; top:14px !important; right:14px !important; width:26px !important; height:26px !important; display:inline-flex !important; align-items:center !important; justify-content:center !important; border-radius:6px !important; color:rgba(255,255,255,0.5) !important; font-size:16px !important; }
        .sp-auth-close:hover { background:rgba(255,255,255,0.08) !important; color:rgba(255,255,255,0.9) !important; }
        .sp-auth-hero { display:flex !important; gap:16px !important; padding-bottom:16px !important; margin-bottom:12px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important; }
        .sp-auth-avatar { flex-shrink:0 !important; width:60px !important; height:60px !important; border-radius:14px !important; background:linear-gradient(135deg,hsl(var(--icon-hue,270) 70% 35%),hsl(var(--icon-hue,270) 50% 22%)) !important; color:#fff !important; display:flex !important; align-items:center !important; justify-content:center !important; font-weight:700 !important; font-size:22px !important; letter-spacing:-0.02em !important; box-shadow:0 4px 12px rgba(0,0,0,0.4) !important; }
        .sp-auth-name { font-size:20px !important; font-weight:700 !important; color:rgba(255,255,255,0.95) !important; display:flex !important; align-items:center !important; gap:8px !important; margin-bottom:4px !important; }
        .sp-auth-bio { font-size:12px !important; color:rgba(255,255,255,0.55) !important; line-height:1.5 !important; }
        .sp-auth-stats { display:flex !important; gap:14px !important; margin-top:8px !important; font-size:10.5px !important; color:rgba(255,255,255,0.4) !important; }
        .sp-auth-stats b { color:rgba(255,255,255,0.9) !important; font-weight:600 !important; }
        .sp-auth-section { margin-bottom:14px !important; }
        .sp-auth-section-title { font-size:10px !important; letter-spacing:0.1em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.4) !important; font-weight:600 !important; margin-bottom:8px !important; padding-left:2px !important; }
        .sp-auth-row { all:unset !important; cursor:pointer !important; display:flex !important; align-items:center !important; gap:10px !important; padding:8px 10px !important; border-radius:8px !important; transition:background 0.15s !important; margin-bottom:2px !important; }
        .sp-auth-row:hover { background:rgba(255,255,255,0.04) !important; }
        .sp-auth-row-icon { width:32px !important; height:32px !important; border-radius:7px !important; background:linear-gradient(135deg,hsl(var(--icon-hue,270) 60% 28%),hsl(var(--icon-hue,270) 40% 18%)) !important; display:flex !important; align-items:center !important; justify-content:center !important; font-size:11px !important; font-weight:600 !important; color:#fff !important; flex-shrink:0 !important; }
        .sp-auth-row-body { flex:1 !important; min-width:0 !important; }
        .sp-auth-row-name { font-size:12.5px !important; color:rgba(255,255,255,0.9) !important; font-weight:500 !important; }
        .sp-auth-row-desc { font-size:10.5px !important; color:rgba(255,255,255,0.4) !important; margin-top:2px !important; overflow:hidden !important; text-overflow:ellipsis !important; white-space:nowrap !important; }
        /* Export modal */
        #__st_export_overlay__ { position:fixed !important; inset:0 !important; z-index:2147483646 !important; background:rgba(0,0,0,0.55) !important; backdrop-filter:blur(6px) !important; display:none !important; align-items:center !important; justify-content:center !important; padding:24px !important; }
        #__st_export_overlay__.open { display:flex !important; animation:st-fade-up 0.18s ease-out !important; }
        .sp-export-modal { position:relative !important; width:min(480px,100%) !important; background:rgba(20,18,32,0.94) !important; backdrop-filter:blur(40px) saturate(180%) !important; border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:18px !important; padding:24px !important; box-shadow:0 24px 60px rgba(0,0,0,0.5) !important; animation:st-pop 0.22s cubic-bezier(0.22,1,0.36,1) !important; }
        .sp-export-title { font-size:16px !important; font-weight:600 !important; color:rgba(255,255,255,0.95) !important; margin-bottom:4px !important; }
        .sp-export-sub { font-size:12px !important; color:rgba(255,255,255,0.5) !important; line-height:1.5 !important; margin-bottom:14px !important; }
        .sp-export-stats { display:flex !important; gap:16px !important; padding:10px 14px !important; background:rgba(255,255,255,0.03) !important; border:0.5px solid rgba(255,255,255,0.06) !important; border-radius:10px !important; margin-bottom:12px !important; font-size:11px !important; color:rgba(255,255,255,0.5) !important; }
        .sp-export-stats b { color:rgba(255,255,255,0.9) !important; font-weight:600 !important; margin-right:4px !important; }
        .sp-export-code { font-family:"SF Mono",ui-monospace,Menlo,monospace !important; font-size:11px !important; color:rgba(255,255,255,0.6) !important; background:rgba(0,0,0,0.35) !important; border:0.5px solid rgba(255,255,255,0.08) !important; border-radius:8px !important; padding:10px 12px !important; word-break:break-all !important; line-height:1.5 !important; max-height:100px !important; overflow-y:auto !important; margin-bottom:14px !important; }
        .sp-export-actions { display:flex !important; gap:8px !important; }
        .sp-export-btn { all:unset !important; cursor:pointer !important; padding:8px 14px !important; border-radius:8px !important; font-size:12px !important; font-weight:500 !important; background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important; color:rgba(255,255,255,0.85) !important; }
        .sp-export-btn.primary { background:var(--st-accent) !important; border-color:transparent !important; color:#fff !important; font-weight:600 !important; }
        .sp-export-btn:hover { filter:brightness(1.1) !important; }
        /* Command palette */
        #__st_cmdpal_overlay__ { position:fixed !important; inset:0 !important; z-index:2147483647 !important; background:rgba(0,0,0,0.6) !important; backdrop-filter:blur(8px) !important; display:none !important; align-items:flex-start !important; justify-content:center !important; padding-top:14vh !important; }
        #__st_cmdpal_overlay__.open { display:flex !important; animation:st-fade-up 0.18s ease-out !important; }
        .sp-pal { width:min(620px,calc(100vw - 32px)) !important; background:rgba(16,14,22,0.92) !important; backdrop-filter:blur(40px) saturate(180%) !important; border:0.5px solid rgba(255,255,255,0.12) !important; border-radius:16px !important; box-shadow:0 1px 0 rgba(255,255,255,0.1) inset,0 30px 80px rgba(0,0,0,0.6) !important; overflow:hidden !important; animation:st-pop 0.32s cubic-bezier(0.22,1,0.36,1) !important; }
        .sp-pal-search { display:flex !important; align-items:center !important; gap:12px !important; padding:16px 18px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important; color:var(--st-accent) !important; }
        .sp-pal-search input { all:unset !important; flex:1 !important; font-family:inherit !important; font-size:15px !important; color:rgba(255,255,255,0.95) !important; }
        .sp-pal-search input::placeholder { color:rgba(255,255,255,0.3) !important; }
        .sp-pal-list { max-height:380px !important; overflow-y:auto !important; padding:6px !important; }
        .sp-pal-row { all:unset !important; cursor:pointer !important; display:flex !important; align-items:center !important; gap:12px !important; width:100% !important; padding:9px 12px !important; border-radius:8px !important; font-size:12.5px !important; box-sizing:border-box !important; transition:background 0.15s !important; }
        .sp-pal-row:hover, .sp-pal-row.hover { background:rgba(255,255,255,0.06) !important; }
        .sp-pal-kind { font-size:9px !important; letter-spacing:0.08em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.4) !important; padding:2px 6px !important; border-radius:4px !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.06) !important; min-width:60px !important; text-align:center !important; }
        .sp-pal-label { color:rgba(255,255,255,0.85) !important; flex:1 !important; }
        .sp-pal-empty { padding:32px !important; text-align:center !important; color:rgba(255,255,255,0.3) !important; font-size:12px !important; }
        /* Toast action buttons */
        /* .sp-toast-btn rules live with the toast stack CSS above */
        /* Glass depth variants on panel */
        #__st_panel__.glass-flat  { backdrop-filter:blur(8px) saturate(120%) !important; }
        #__st_panel__.glass-soft  { backdrop-filter:blur(28px) saturate(160%) !important; }
        #__st_panel__.glass-deep  { backdrop-filter:blur(56px) saturate(200%) brightness(0.85) !important; }
        /* Card style variants */
        #__st_panel__.card-elevated .st-card { box-shadow:0 4px 18px rgba(0,0,0,0.4) !important; }
        #__st_panel__.card-glass .st-card { background:rgba(255,255,255,0.05) !important; backdrop-filter:blur(12px) !important; border:0.5px solid rgba(255,255,255,0.12) !important; }
        /* Optimized mode — strip all blur */
        #__st_root__.no-blur #__st_panel__ { backdrop-filter:none !important; -webkit-backdrop-filter:none !important; background-color:rgba(16,13,22,0.96) !important; }
        #__st_root__.no-blur #__st_panel__.card-glass .st-card { backdrop-filter:none !important; -webkit-backdrop-filter:none !important; background:rgba(255,255,255,0.06) !important; }
        /* Film grain */
        #__st_panel__.sp-grain::after { content:"" !important; position:absolute !important; inset:0 !important; pointer-events:none !important; border-radius:inherit !important; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.06'/%3E%3C/svg%3E") !important; opacity:0.35 !important; z-index:1 !important; }
        /* ── sp-pill (theme apply, collection install) ── */
        .sp-pill { all:unset !important; cursor:pointer !important; font-family:inherit !important; padding:5px 11px !important; border-radius:7px !important; font-size:11px !important; font-weight:600 !important; background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important; color:rgba(255,255,255,0.78) !important; transition:background 0.18s,border-color 0.18s,transform 0.12s !important; white-space:nowrap !important; }
        .sp-pill:hover { background:rgba(255,255,255,0.1) !important; }
        .sp-pill:active { transform:scale(0.96) !important; }
        .sp-pill.active { background:var(--accent-soft,rgba(255,255,255,0.08)) !important; color:var(--accent,rgba(255,255,255,0.9)) !important; border-color:color-mix(in oklab,var(--accent,rgba(255,255,255,0.9)) 30%,transparent) !important; }
        .sp-pill.primary { background:var(--accent,rgba(255,255,255,0.9)) !important; color:#15101a !important; border-color:transparent !important; box-shadow:0 0 14px var(--accent-glow,rgba(255,255,255,0.15)) !important; }
        .sp-pill.primary:hover { filter:brightness(1.1) !important; }
        /* ── Stars ── */
        .sp-stars { display:inline-flex !important; align-items:center !important; gap:3px !important; color:hsla(45,90%,70%,0.7) !important; font-size:10.5px !important; font-variant-numeric:tabular-nums !important; }
        /* ── Metadata chips in card body ── */
        .sp-iso-dot { width:6px !important; height:6px !important; border-radius:50% !important; background:hsl(150,65%,55%) !important; box-shadow:0 0 6px hsl(150,65%,55%,0.6) !important; flex-shrink:0 !important; }
        .sp-glass-tag { font-size:9px !important; letter-spacing:0.06em !important; text-transform:uppercase !important; padding:1px 5px !important; border-radius:3px !important; background:hsla(190,80%,60%,0.12) !important; border:0.5px solid hsla(190,80%,60%,0.25) !important; color:hsl(190,80%,75%) !important; }
        .sp-card-version { font-size:10px !important; color:rgba(255,255,255,0.3) !important; font-variant-numeric: tabular-nums !important; font-family: ui-monospace,"SF Mono",Menlo,monospace !important; }
        .sp-preview-hint { color:rgba(255,255,255,0.3) !important; font-size:10px !important; display:inline-flex !important; align-items:center !important; gap:3px !important; }
        /* ── sp-toggle (used in settings ── */
        .sp-toggle { all:unset !important; cursor:pointer !important; position:relative !important; width:30px !important; height:18px !important; border-radius:10px !important; background:rgba(255,255,255,0.1) !important; border:0.5px solid rgba(255,255,255,0.08) !important; transition:background 0.3s,border-color 0.3s,box-shadow 0.3s !important; flex-shrink:0 !important; display:inline-block !important; }
        .sp-toggle-knob { position:absolute !important; top:2px !important; left:2px !important; width:13px !important; height:13px !important; border-radius:50% !important; background:rgba(255,255,255,0.55) !important; box-shadow:0 1px 3px rgba(0,0,0,0.4) !important; transition:transform 0.3s cubic-bezier(0.34,1.4,0.64,1),background 0.25s !important; }
        .sp-toggle.on { background:var(--accent,rgba(255,255,255,0.9)) !important; border-color:var(--accent,rgba(255,255,255,0.9)) !important; box-shadow:0 0 0 3px var(--accent-soft,rgba(255,255,255,0.12)) !important; }
        .sp-toggle.on .sp-toggle-knob { transform:translateX(12px) !important; background:#fff !important; }
        /* ── Marketplace: filters, type tags, chips ── */
        .sp-market-filters { display:flex !important; align-items:center !important; gap:6px !important; margin-bottom:8px !important; flex-wrap:wrap !important; }
        .sp-market-spacer { flex:1 !important; }
        .sp-chip { all:unset !important; cursor:pointer !important; padding:4px 10px !important; border-radius:999px !important; font-size:11px !important; font-weight:500 !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.06) !important; color:rgba(255,255,255,0.55) !important; display:inline-flex !important; align-items:center !important; gap:4px !important; transition:background 0.15s !important; white-space:nowrap !important; }
        .sp-chip:hover { background:rgba(255,255,255,0.08) !important; }
        .sp-chip.active { background:var(--accent-soft,rgba(255,255,255,0.08)) !important; color:var(--accent,rgba(255,255,255,0.9)) !important; border-color:rgba(255,255,255,0.15) !important; }
        .sp-type-tag { font-size:9px !important; padding:2px 6px !important; border-radius:4px !important; text-transform:uppercase !important; letter-spacing:0.06em !important; font-weight:600 !important; white-space:nowrap !important; }
        .sp-type-plugin { background:hsla(220,70%,60%,0.12) !important; color:hsl(220,80%,78%) !important; border:0.5px solid hsla(220,70%,60%,0.25) !important; }
        .sp-type-theme { background:hsla(330,70%,65%,0.12) !important; color:hsl(330,80%,80%) !important; border:0.5px solid hsla(330,70%,65%,0.25) !important; }
        /* ── Sandbox note in expanded plugin ── */
        .sp-sandbox-note { display:flex !important; align-items:center !important; gap:6px !important; padding:8px 14px !important; font-size:10.5px !important; border-bottom:0.5px solid rgba(255,255,255,0.05) !important; }
        .sp-sandbox-note.iso { color:hsl(150,65%,70%) !important; background:hsla(150,65%,50%,0.05) !important; }
        .sp-sandbox-note.trust { color:hsl(210,70%,75%) !important; background:hsla(210,70%,50%,0.05) !important; }
        .sp-sandbox-note code { font-family:ui-monospace,"SF Mono",Menlo,monospace !important; font-size:10px !important; }
        /* ── Setting rows inside expanded card ── */
        .sp-setting-row { display:flex !important; align-items:center !important; justify-content:space-between !important; padding:11px 14px !important; gap:18px !important; border-bottom:0.5px solid rgba(255,255,255,0.04) !important; }
        .sp-setting-row:last-child { border-bottom:none !important; }
        .sp-setting-row:hover { background:rgba(255,255,255,0.02) !important; }
        .sp-setting-label { display:flex !important; flex-direction:column !important; gap:2px !important; flex:1 !important; min-width:0 !important; }
        .sp-setting-name { font-size:12px !important; color:rgba(255,255,255,0.78) !important; font-weight:500 !important; }
        .sp-setting-hint { font-size:10.5px !important; color:rgba(255,255,255,0.32) !important; line-height:1.4 !important; }
        .sp-setting-ctrl { display:flex !important; align-items:center !important; gap:8px !important; }
        .sp-select,.sp-text { all:unset !important; cursor:pointer !important; font-family:inherit !important; background:rgba(255,255,255,0.05) !important; border:0.5px solid rgba(255,255,255,0.08) !important; border-radius:7px !important; padding:5px 10px !important; font-size:12px !important; color:rgba(255,255,255,0.78) !important; }
        .sp-select option { background:#1a1620 !important; }
        .sp-range-wrap { display:flex !important; align-items:center !important; gap:8px !important; }
        .sp-range { -webkit-appearance:none !important; appearance:none !important; width:100px !important; height:3px !important; border-radius:2px !important; background:rgba(255,255,255,0.12) !important; outline:none !important; cursor:pointer !important; }
        .sp-range::-webkit-slider-thumb { -webkit-appearance:none !important; width:14px !important; height:14px !important; border-radius:50% !important; background:var(--accent,rgba(255,255,255,0.9)) !important; cursor:pointer !important; }
        .sp-range-val { font-size:11px !important; color:rgba(255,255,255,0.55) !important; min-width:24px !important; text-align:right !important; }
        .sp-color-row { display:flex !important; align-items:center !important; gap:6px !important; }
        .sp-swatch { display:inline-block !important; width:18px !important; height:18px !important; border-radius:5px !important; border:0.5px solid rgba(255,255,255,0.2) !important; }
        .sp-color-row code { font-family:ui-monospace,"SF Mono",Menlo,monospace !important; font-size:11px !important; color:rgba(255,255,255,0.65) !important; }
        /* ── Author chip — aggressive override to prevent inflation ── */
        .st-card .sp-author-chip, .st-card .sp-author-chip span,
        .st-card-meta .sp-author-chip, .st-card-meta .sp-author-chip span { font-size:10px !important; line-height:1.3 !important; }
        .st-card .sp-author-chip { padding:0 !important; }
        /* ── Module view: grid mode ── */
        .st-list.sp-grid-view { display:grid; grid-template-columns:1fr 1fr !important; gap:6px !important; align-content:start !important; }
        .st-list.sp-grid-view .st-card { margin-bottom:0 !important; }
        .st-list.sp-grid-view .st-card-main { padding:11px 12px !important; gap:10px !important; }
        .st-list.sp-grid-view .st-card-desc { display:none !important; }
        .st-list.sp-grid-view .st-card-meta { display:none !important; }
        .st-list.sp-grid-view .st-card-icon { width:32px !important; height:32px !important; font-size:12px !important; }
        .st-list.sp-grid-view .st-card:last-child:nth-child(odd) { grid-column:1 / -1 !important; }
        /* ── Footer (design) ── */
        .sp-footer { display:flex !important; align-items:center !important; gap:8px !important; padding:8px 14px !important; border-top:0.5px solid rgba(255,255,255,0.05) !important; background:rgba(0,0,0,0.18) !important; font-size:10px !important; flex-shrink:0 !important; }
        .sp-foot-btn { all:unset !important; cursor:pointer !important; display:inline-flex !important; align-items:center !important; gap:5px !important; padding:3px 7px !important; border-radius:6px !important; font-size:10px !important; color:rgba(255,255,255,0.45) !important; transition:background 0.18s,color 0.18s !important; font-family:inherit !important; }
        .sp-foot-btn:hover { background:rgba(255,255,255,0.06) !important; color:rgba(255,255,255,0.75) !important; }
        .sp-foot-spacer { flex:1 !important; }
        .sp-foot-status { display:inline-flex !important; align-items:center !important; gap:5px !important; color:rgba(255,255,255,0.28) !important; font-size:10px !important; }
        .sp-foot-status > * { font-size:10px !important; }
        .sp-foot-dot { width:5px !important; height:5px !important; border-radius:50% !important; background:hsl(150,65%,55%) !important; box-shadow:0 0 5px hsl(150,65%,55%) !important; }
        /* ── Search row cmd-hint button ── */
        .sp-cmd-hint { all:unset !important; cursor:pointer !important; display:inline-flex !important; align-items:center !important; gap:3px !important; padding:4px 6px !important; border-radius:6px !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.08) !important; transition:background 0.18s !important; flex-shrink:0 !important; }
        .sp-cmd-hint:hover { background:rgba(255,255,255,0.08) !important; }
        .sp-kbd { font-family:ui-monospace,"SF Mono",Menlo,monospace !important; font-size:10px !important; color:rgba(255,255,255,0.45) !important; padding:1px 5px !important; background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:4px !important; }
        /* ── Auth-verified badge ── */
        .sp-auth-verified { display:inline-flex !important; align-items:center !important; justify-content:center !important; width:16px !important; height:16px !important; border-radius:50% !important; background:var(--accent,rgba(255,255,255,0.9)) !important; color:#fff !important; flex-shrink:0 !important; }
        /* ── Marketplace: override mkt-list container for card layout ── */
        .st-mkt-list { padding:8px 12px !important; }
        /* ── Marketplace filter bar: zero its own padding since sp-market-filters handles it ── */
        .st-mkt-filter-bar { padding:8px 12px !important; }
        /* ── Plugin list: fill remaining space so footer stays at bottom ── */
        .st-list { flex:1 !important; max-height:none !important; overflow-y:auto !important; }
        /* ── Expanded card settings: no nested background ── */
        .st-settings-inner { background:none !important; border:none !important; border-radius:0 !important; margin:0 !important; border-top:0.5px solid rgba(255,255,255,0.06) !important; }
        .st-settings-panel { margin:0 !important; border-radius:0 !important; border:none !important; border-top:0.5px solid rgba(255,255,255,0.06) !important; background:none !important; }
        /* ── Settings tab rewrite ── */
        #__st_about_wrap__ { display:none !important; flex-direction:column !important; flex:1 !important; overflow-y:auto !important; padding:0 !important; }
        #__st_about_wrap__.active { display:flex !important; animation:st-fade-up 0.3s cubic-bezier(0.22,1,0.36,1) both !important; }
        #__st_about_wrap__ .sp-set-hero { display:flex !important; align-items:center !important; gap:14px !important; padding:18px 20px 14px !important; border-bottom:0.5px solid rgba(255,255,255,0.06) !important; flex-shrink:0 !important; box-sizing:border-box !important; }
        #__st_about_wrap__ .sp-set-hero-logo { width:44px !important; height:44px !important; border-radius:12px !important; background:linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)) !important; border:0.5px solid rgba(255,255,255,0.12) !important; display:flex !important; align-items:center !important; justify-content:center !important; font-size:16px !important; font-weight:700 !important; color:rgba(255,255,255,0.9) !important; flex-shrink:0 !important; box-shadow:0 0 0 0.5px rgba(255,255,255,0.06) inset,0 4px 12px rgba(0,0,0,0.3) !important; }
        #__st_about_wrap__ .sp-set-hero-info { display:flex !important; flex-direction:column !important; gap:4px !important; }
        #__st_about_wrap__ .sp-set-hero-name { font-size:20px !important; font-weight:700 !important; letter-spacing:-0.02em !important; color:rgba(255,255,255,0.92) !important; line-height:1 !important; margin:0 !important; }
        #__st_about_wrap__ .sp-set-hero-version { font-size:10px !important; color:rgba(255,255,255,0.4) !important; margin:0 !important; }
        #__st_about_wrap__ .sp-set-hero-plus { color:var(--st-accent) !important; }
        #__st_about_wrap__ .sp-set-stats { display:grid !important; grid-template-columns:repeat(4,1fr) !important; gap:8px !important; padding:14px 20px !important; border-bottom:0.5px solid rgba(255,255,255,0.04) !important; flex-shrink:0 !important; box-sizing:border-box !important; }
        #__st_about_wrap__ .sp-stat { display:block !important; padding:12px 10px 10px !important; background:rgba(255,255,255,0.025) !important; border:0.5px solid rgba(255,255,255,0.05) !important; border-radius:10px !important; overflow:hidden !important; box-sizing:border-box !important; position:static !important; }
        #__st_about_wrap__ .sp-stat-value { display:block !important; font-size:26px !important; font-weight:700 !important; letter-spacing:-0.03em !important; color:var(--stat-c,rgba(255,255,255,0.9)) !important; line-height:1 !important; font-variant-numeric:tabular-nums !important; margin:0 !important; padding:0 !important; }
        #__st_about_wrap__ .sp-stat-label { display:block !important; margin-top:5px !important; font-size:9px !important; letter-spacing:0.1em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.45) !important; font-weight:600 !important; padding:0 !important; }
        #__st_about_wrap__ .sp-stat-sub { display:block !important; margin-top:1px !important; font-size:9.5px !important; color:rgba(255,255,255,0.3) !important; padding:0 !important; }
        #__st_about_wrap__ .sp-stat-bar { display:block !important; margin-top:8px !important; height:3px !important; border-radius:2px !important; background:rgba(255,255,255,0.05) !important; overflow:hidden !important; padding:0 !important; }
        #__st_about_wrap__ .sp-stat-bar span { display:block !important; height:100% !important; background:var(--stat-c,rgba(255,255,255,0.4)) !important; border-radius:2px !important; transition:width 0.4s !important; }
        #__st_about_wrap__ .sp-stat-blue { --stat-c:hsl(220,80%,65%); }
        #__st_about_wrap__ .sp-stat-green { --stat-c:hsl(150,65%,55%); }
        #__st_about_wrap__ .sp-stat-mint { --stat-c:hsl(170,60%,55%); }
        #__st_about_wrap__ .sp-stat-dim { --stat-c:rgba(255,255,255,0.35); }
        #__st_about_wrap__ .sp-set-section { display:block !important; padding:12px 20px !important; border-bottom:0.5px solid rgba(255,255,255,0.04) !important; box-sizing:border-box !important; margin:0 !important; position:static !important; float:none !important; flex-shrink:0 !important; width:100% !important; min-height:1px !important; }
        #__st_about_wrap__ .sp-set-section:last-child { border-bottom:none !important; }
        #__st_about_wrap__ .sp-set-section-title { display:block !important; font-size:9.5px !important; letter-spacing:0.1em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.35) !important; font-weight:600 !important; margin:0 0 8px !important; padding:0 !important; }
        #__st_about_wrap__ .sp-set-row { display:flex !important; align-items:center !important; gap:12px !important; padding:7px 0 !important; min-height:34px !important; border-bottom:0.5px solid rgba(255,255,255,0.03) !important; margin:0 !important; box-sizing:border-box !important; position:static !important; }
        #__st_about_wrap__ .sp-set-row:last-child { border-bottom:none !important; }
        #__st_about_wrap__ .sp-set-row-label { display:inline-flex !important; align-items:center !important; font-size:12.5px !important; color:rgba(255,255,255,0.7) !important; font-weight:500 !important; min-width:130px !important; flex-shrink:0 !important; margin:0 !important; padding:0 !important; }
        #__st_about_wrap__ .sp-set-row-aside { display:inline !important; font-size:11px !important; color:rgba(255,255,255,0.38) !important; margin-left:auto !important; flex-shrink:0 !important; }
        #__st_about_wrap__ .sp-set-row-ctrl { display:flex !important; align-items:center !important; gap:10px !important; margin-left:auto !important; }
        #__st_about_wrap__ .sp-set-accents { display:flex !important; align-items:center !important; gap:7px !important; margin-left:auto !important; flex-wrap:wrap !important; overflow:visible !important; padding:4px 0 !important; }
        #__st_about_wrap__ .sp-set-accent { -webkit-appearance:none !important; appearance:none !important; border:none !important; outline:none !important; padding:0 !important; margin:0 !important; box-sizing:border-box !important; cursor:pointer !important; width:20px !important; height:20px !important; border-radius:50% !important; box-shadow:0 0 0 0.5px rgba(0,0,0,0.4),0 1px 2px rgba(0,0,0,0.3) !important; transition:transform 0.15s,box-shadow 0.15s !important; display:inline-block !important; flex-shrink:0 !important; }
        #__st_about_wrap__ .sp-set-accent:hover { transform:scale(1.15) !important; }
        #__st_about_wrap__ .sp-set-accent.on, #__st_about_wrap__ .sp-set-accent.active { box-shadow:0 0 0 2px rgba(255,255,255,0.9),0 0 0 4px rgba(0,0,0,0.3) !important; }
        #__st_about_wrap__ .sp-set-accent-add { background:transparent !important; border:1.5px dashed rgba(255,255,255,0.22) !important; color:rgba(255,255,255,0.4) !important; font-size:12px !important; line-height:1 !important; display:inline-flex !important; align-items:center !important; justify-content:center !important; box-shadow:none !important; }
        #__st_about_wrap__ .sp-set-accent-add:hover { border-color:rgba(255,255,255,0.45) !important; color:rgba(255,255,255,0.7) !important; }
        #__st_about_wrap__ .sp-set-seg { display:inline-flex !important; padding:2px !important; gap:1px !important; background:rgba(0,0,0,0.25) !important; border:0.5px solid rgba(255,255,255,0.06) !important; border-radius:8px !important; margin-left:auto !important; }
        #__st_about_wrap__ .sp-set-seg-btn { all:unset !important; cursor:pointer !important; padding:4px 10px !important; border-radius:6px !important; font-size:11px !important; color:rgba(255,255,255,0.4) !important; font-weight:500 !important; transition:color 0.15s,background 0.18s !important; display:inline-block !important; }
        #__st_about_wrap__ .sp-set-seg-btn:hover { color:rgba(255,255,255,0.65) !important; background:rgba(255,255,255,0.04) !important; }
        #__st_about_wrap__ .sp-set-seg-btn.on { color:rgba(255,255,255,0.92) !important; background:linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05)) !important; box-shadow:0 1px 0 rgba(255,255,255,0.06) inset,0 2px 4px rgba(0,0,0,0.2) !important; }
        #__st_about_wrap__ .sp-set-actions { display:grid !important; grid-template-columns:repeat(2,1fr) !important; gap:6px !important; padding:0 !important; margin:0 !important; }
        #__st_about_wrap__ .sp-set-action { all:unset !important; cursor:pointer !important; display:inline-flex !important; align-items:center !important; justify-content:center !important; gap:7px !important; padding:10px 12px !important; border-radius:9px !important; background:rgba(255,255,255,0.04) !important; border:0.5px solid rgba(255,255,255,0.07) !important; color:rgba(255,255,255,0.72) !important; font-size:11.5px !important; font-weight:500 !important; transition:background 0.15s,border-color 0.15s,transform 0.1s !important; box-sizing:border-box !important; font-family:inherit !important; }
        #__st_about_wrap__ .sp-set-action:hover { background:rgba(255,255,255,0.08) !important; border-color:rgba(255,255,255,0.12) !important; color:rgba(255,255,255,0.9) !important; }
        #__st_about_wrap__ .sp-set-action:active { transform:scale(0.97) !important; }
        #__st_about_wrap__ .sp-set-action-wide { grid-column:1 / -1 !important; }
        #__st_about_wrap__ .sp-set-action-danger { color:hsl(0,70%,68%) !important; border-color:hsla(0,60%,50%,0.2) !important; background:hsla(0,60%,50%,0.06) !important; }
        #__st_about_wrap__ .sp-set-action-danger:hover { background:hsla(0,60%,50%,0.12) !important; border-color:hsla(0,60%,50%,0.35) !important; color:hsl(0,75%,72%) !important; }
        #__st_about_wrap__ .sp-toggle { width:30px !important; height:18px !important; background:rgba(255,255,255,0.1) !important; border:0.5px solid rgba(255,255,255,0.08) !important; border-radius:10px !important; position:relative !important; cursor:pointer !important; transition:background 0.28s,box-shadow 0.22s !important; flex-shrink:0 !important; display:inline-block !important; padding:0 !important; margin:0 !important; vertical-align:middle !important; }
        #__st_about_wrap__ .sp-toggle.on { background:var(--st-accent) !important; border-color:var(--st-accent) !important; box-shadow:0 0 0 3px rgba(255,255,255,0.08) !important; }
        #__st_about_wrap__ .sp-toggle-knob { position:absolute !important; top:50% !important; left:2px !important; transform:translateY(-50%) !important; width:13px !important; height:13px !important; border-radius:50% !important; background:rgba(255,255,255,0.55) !important; box-shadow:0 1px 3px rgba(0,0,0,0.35) !important; transition:transform 0.28s cubic-bezier(0.34,1.2,0.64,1),background 0.18s !important; pointer-events:none !important; display:block !important; }
        #__st_about_wrap__ .sp-toggle.on .sp-toggle-knob { transform:translateY(-50%) translateX(12px) !important; background:#fff !important; }
        #__st_about_wrap__ .sp-kbd { font-family:ui-monospace,"SF Mono",Menlo,monospace !important; font-size:10px !important; color:rgba(255,255,255,0.45) !important; padding:1px 5px !important; background:rgba(255,255,255,0.06) !important; border:0.5px solid rgba(255,255,255,0.1) !important; border-radius:4px !important; display:inline !important; }
        /* ── Raycast-style inline command palette ── */
        #__st_inline_pal__ { display:none; flex-direction:column; max-height:220px; overflow-y:auto; border-bottom:0.5px solid rgba(255,255,255,0.06); background:rgba(0,0,0,0.08); animation:st-fade-up 0.18s cubic-bezier(0.22,1,0.36,1) both; }
        #__st_inline_pal__.open { display:flex !important; }
        .sp-ipal-row { all:unset; display:flex; align-items:center; gap:10px; padding:8px 16px; cursor:pointer; width:100%; box-sizing:border-box; font-family:inherit; transition:background 0.12s; border-radius:0; }
        .sp-ipal-row:hover, .sp-ipal-row.active { background:rgba(255,255,255,0.06); }
        .sp-ipal-kind { font-size:9px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.3); width:48px; flex-shrink:0; font-weight:600; }
        .sp-ipal-label { font-size:12.5px; color:rgba(255,255,255,0.82); flex:1; }
        .sp-ipal-enter { font-size:9px; color:rgba(255,255,255,0.25); }
        .sp-ipal-empty { padding:14px 16px; font-size:12px; color:rgba(255,255,255,0.25); text-align:center; }
        .sp-ipal-section { padding:5px 16px 3px; font-size:9px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.25); font-weight:600; border-top:0.5px solid rgba(255,255,255,0.04); }
        /* ── Search row command mode ── */
        .sp-cmd-mode-prefix { font-size:13px; color:var(--st-accent,rgba(255,255,255,0.9)); font-weight:500; padding-right:4px; opacity:0.8; flex-shrink:0; }
        .sp-search-kbd-hint { display:inline-flex; align-items:center; gap:3px; flex-shrink:0; opacity:0.6; }
        #__st_search_row__.cmd-mode { background:rgba(255,255,255,0.02); }
        #__st_search_row__.cmd-mode .st-search-icon { color:var(--st-accent,rgba(255,255,255,0.9)); opacity:0.8; }
    `;
    document.head.appendChild(spStyle);
    
    // ── Build DOM ─────────────────────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = '__st_overlay__';
    overlay.innerHTML = `
    <div id="__st_panel__">
        <div class="st-search-row" id="__st_search_row__">
            <svg class="st-search-icon" id="__st_search_icon__" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="st-search-wrap" id="__st_search_wrap__">
                <span class="sp-cmd-mode-prefix" id="__st_cmd_prefix__" style="display:none">&gt;</span>
                <span class="st-search-ghost" id="__st_search_ghost__"></span>
                <input class="st-search-input" id="__st_search__" placeholder="Search plugins, themes… or ⌘K" autocomplete="off" spellcheck="false" style="display:block">
            </div>
            <span class="sp-search-kbd-hint" id="__st_search_kbd_hint__"><span class="sp-kbd">⌘K</span></span>
        </div>
        <!-- Inline command palette (Raycast-style dropdown) -->
        <div id="__st_inline_pal__">
            <div class="sp-inline-pal-list" id="__st_inline_pal_list__"></div>
        </div>
        <div class="st-tabs">
            <button class="st-tab active" data-tab="themes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 20a8 8 0 1 1-8-8 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0 4 4 3.5 3.5 0 0 0 0-7"/></svg>Themes <span class="st-tab-count" id="__st_tc__">0</span></button>
            <button class="st-tab" data-tab="plugins"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>Plugins <span class="st-tab-count" id="__st_pc__">0</span></button>
            <button class="st-tab" data-tab="marketplace"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Store</button>
            <button class="st-tab" data-tab="activity"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Activity</button>
            <button class="st-tab" data-tab="developer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>Developer</button>
            <button class="st-tab" data-tab="about"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>Settings</button>
            <div class="st-tab-indicator" id="__st_tab_ind__"></div>
        </div>
        <!-- ── Safe mode banner ── -->
        <div id="__st_safemode_banner__">
            ⚠️ Safe mode — all plugins disabled temporarily
            <button class="st-safemode-exit" id="__st_safemode_exit__">Exit safe mode</button>
        </div>

        <div class="st-list" id="__st_list__"></div>
        <!-- ── Developer tab ── -->
        <div id="__st_dev_wrap__">
            <div class="st-dev-subtabs">
                <button class="st-dev-subtab active" data-subtab="css">CSS Editor</button>
                <button class="st-dev-subtab" data-subtab="wizard">New Plugin</button>
            </div>
            <!-- CSS Editor panel -->
            <div class="st-dev-panel active" id="__st_devpanel_css__">
                <div class="st-editor-toolbar">
                    <span class="st-editor-title">Custom CSS — injected on every page load</span>
                    <span class="st-editor-status" id="__st_ed_status__">Saved</span>
                    <button class="st-editor-apply" id="__st_ed_apply__">Apply now</button>
                </div>
                <textarea id="__st_css_input__" spellcheck="false" placeholder="/* write any CSS here — it applies on top of all themes */

.example {
  color: red;
}"></textarea>
                <div class="st-editor-footer">
                    <span class="st-editor-hint">Auto-saved · <span class="st-kbd">⌘S</span> to apply immediately</span>
                    <button class="st-editor-clear" id="__st_ed_clear__">Clear</button>
                </div>
            </div>
            <!-- New Plugin wizard panel -->
            <div class="st-dev-panel" id="__st_devpanel_wizard__">
                <div class="st-wiz-form" id="__st_wiz_form__">
                    <div class="st-wiz-row-h">
                        <div class="st-wiz-row">
                            <label class="st-wiz-label">Plugin name *</label>
                            <input class="st-wiz-input" id="__wiz_name__" placeholder="My Plugin" autocomplete="off">
                        </div>
                        <div class="st-wiz-row">
                            <label class="st-wiz-label">Version</label>
                            <input class="st-wiz-input" id="__wiz_ver__" placeholder="1.0.0" autocomplete="off">
                        </div>
                    </div>
                    <div class="st-wiz-row">
                        <label class="st-wiz-label">Author</label>
                        <input class="st-wiz-input" id="__wiz_author__" placeholder="Your name" autocomplete="off">
                    </div>
                    <div class="st-wiz-row">
                        <label class="st-wiz-label">Description</label>
                        <input class="st-wiz-input" id="__wiz_desc__" placeholder="What does this plugin do?" autocomplete="off">
                    </div>
                    <div class="st-wiz-row">
                        <label class="st-wiz-label">Type</label>
                        <select class="st-wiz-select" id="__wiz_type__">
                            <option value="plugin">Plugin (.js)</option>
                            <option value="theme">Theme (.css)</option>
                        </select>
                    </div>
                    <div class="st-wiz-row">
                        <label class="st-wiz-label">GitHub repo (optional)</label>
                        <input class="st-wiz-input" id="__wiz_github__" placeholder="username/repo-name" autocomplete="off">
                    </div>
                    <div class="st-wiz-row">
                        <label class="st-wiz-label">Update URL (optional)</label>
                        <input class="st-wiz-input" id="__wiz_update__" placeholder="https://raw.githubusercontent.com/…" autocomplete="off">
                    </div>
                </div>
                <div class="st-wiz-footer">
                    <button class="st-wiz-btn" id="__wiz_preview__">Preview template</button>
                    <button class="st-wiz-btn primary" id="__wiz_save__">Copy &amp; open folder</button>
                </div>
            </div>
        </div>
        <div class="st-url-row">
            <input class="st-url-input" id="__st_url__" placeholder="Install from URL — paste a .css or .js link…" autocomplete="off" spellcheck="false">
            <button class="st-url-btn" id="__st_install__">Install</button>
        </div>
        <!-- ── Marketplace tab ── -->
        <div id="__st_marketplace_wrap__">
            <div class="st-mkt-filter-bar" id="__st_mkt_filters__">
                <button class="st-mkt-filter active" data-filter="all">All</button>
                <button class="st-mkt-filter" data-filter="Plugin">Plugins</button>
                <button class="st-mkt-filter" data-filter="Theme">Themes</button>
            </div>
            <div class="st-mkt-list" id="__st_mkt_list__"></div>
        </div>
        <!-- ── About / Stremio+ tab ── -->
        <div id="__st_about_wrap__">
            <!-- Hero -->
            <div class="sp-set-hero">
                <div class="sp-set-hero-logo">S<span class="sp-set-hero-plus">+</span></div>
                <div class="sp-set-hero-info">
                    <div class="sp-set-hero-name">Stremio<span class="sp-set-hero-plus">+</span></div>
                    <div class="sp-set-hero-version" id="__st_version__">v26.0</div>
                </div>
            </div>
            <!-- Stats row -->
            <div class="sp-set-stats">
                <div class="sp-stat sp-stat-blue">
                    <div class="sp-stat-value" id="__st_stat_plugins__">0</div>
                    <div class="sp-stat-label">Plugins</div>
                    <div class="sp-stat-sub" id="__st_stat_plugins_sub__">0 active</div>
                    <div class="sp-stat-bar"><span id="__st_stat_plugins_bar__" style="width:0%"></span></div>
                </div>
                <div class="sp-stat sp-stat-green">
                    <div class="sp-stat-value" id="__st_stat_themes__">0</div>
                    <div class="sp-stat-label">Themes</div>
                    <div class="sp-stat-sub" id="__st_stat_themes_sub__">0 active</div>
                    <div class="sp-stat-bar"><span id="__st_stat_themes_bar__" style="width:0%"></span></div>
                </div>
                <div class="sp-stat sp-stat-mint">
                    <div class="sp-stat-value" id="__st_stat_iso__">0</div>
                    <div class="sp-stat-label">Sandboxed</div>
                    <div class="sp-stat-sub">no net access</div>
                    <div class="sp-stat-bar"><span id="__st_stat_iso_bar__" style="width:0%"></span></div>
                </div>
                <div class="sp-stat sp-stat-dim">
                    <div class="sp-stat-value" id="__st_stat_errors__">0</div>
                    <div class="sp-stat-label">Errors</div>
                    <div class="sp-stat-sub" id="__st_stat_errors_sub__">none</div>
                    <div class="sp-stat-bar"><span id="__st_stat_errors_bar__" style="width:0%"></span></div>
                </div>
            </div>
            <!-- Appearance -->
            <div class="sp-set-section">
                <div class="sp-set-section-title">Appearance</div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Accent color</span>
                    <div class="sp-set-accents" id="__st_accent_swatches__">
                        <button type="button" class="sp-set-accent st-accent-swatch active" data-color="hsl(270 75% 70%)" data-glow="hsla(270,80%,65%,0.35)" style="background:hsl(270 75% 70%)" title="Violet"></button>
                        <button type="button" class="sp-set-accent st-accent-swatch" data-color="hsl(190 80% 65%)" data-glow="hsla(190,85%,60%,0.35)" style="background:hsl(190 80% 65%)" title="Cyan"></button>
                        <button type="button" class="sp-set-accent st-accent-swatch" data-color="hsl(340 80% 70%)" data-glow="hsla(340,85%,65%,0.35)" style="background:hsl(340 80% 70%)" title="Rose"></button>
                        <button type="button" class="sp-set-accent st-accent-swatch" data-color="hsl(35 90% 65%)" data-glow="hsla(30,95%,60%,0.35)" style="background:hsl(35 90% 65%)" title="Amber"></button>
                        <button type="button" class="sp-set-accent st-accent-swatch" data-color="hsl(150 65% 65%)" data-glow="hsla(150,70%,60%,0.35)" style="background:hsl(150 65% 65%)" title="Green"></button>
                        <label class="sp-set-accent sp-set-accent-add" title="Custom color" style="position:relative">+<input type="color" id="__st_accent_custom__" style="opacity:0;position:absolute;inset:0;width:100%;height:100%;cursor:pointer"></label>
                    </div>
                </div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Compact mode</span>
                    <div class="sp-set-row-ctrl">
                        <button type="button" class="sp-toggle lg st-compact-toggle" id="__st_compact_toggle__"><span class="sp-toggle-knob"></span></button>
                    </div>
                </div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Glass depth</span>
                    <div class="sp-set-seg" id="__st_glass_seg__">
                        <button type="button" class="sp-set-seg-btn" data-glass="flat">Flat</button>
                        <button type="button" class="sp-set-seg-btn on" data-glass="soft">Soft</button>
                        <button type="button" class="sp-set-seg-btn" data-glass="deep">Deep</button>
                    </div>
                </div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Film grain</span>
                    <div class="sp-set-row-ctrl">
                        <button type="button" class="sp-toggle lg" id="__st_grain_toggle__"><span class="sp-toggle-knob"></span></button>
                    </div>
                </div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Optimized mode</span>
                    <div class="sp-set-row-ctrl">
                        <button type="button" class="sp-toggle lg" id="__st_optimized_toggle__"><span class="sp-toggle-knob"></span></button>
                        <span class="sp-set-row-aside">Removes blur for performance</span>
                    </div>
                </div>
            </div>
            <!-- Layout -->
            <div class="sp-set-section">
                <div class="sp-set-section-title">Layout</div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Module view</span>
                    <div class="sp-set-seg" id="__st_view_seg__">
                        <button type="button" class="sp-set-seg-btn on" data-view="list">List</button>
                        <button type="button" class="sp-set-seg-btn" data-view="grid">Grid</button>
                    </div>
                </div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Card style</span>
                    <div class="sp-set-seg" id="__st_card_seg__">
                        <button type="button" class="sp-set-seg-btn on" data-card="flat">Flat</button>
                        <button type="button" class="sp-set-seg-btn" data-card="elevated">Elevated</button>
                        <button type="button" class="sp-set-seg-btn" data-card="glass">Glass</button>
                    </div>
                </div>
                <div class="sp-set-section-title" style="margin-top:12px">Visible tabs</div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Activity</span>
                    <div class="sp-set-row-ctrl">
                        <button type="button" class="sp-toggle lg" id="__st_show_activity_toggle__"><span class="sp-toggle-knob"></span></button>
                        <span class="sp-set-row-aside">Recent events log</span>
                    </div>
                </div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Developer tab</span>
                    <div class="sp-set-row-ctrl">
                        <button type="button" class="sp-toggle lg st-compact-toggle" id="__st_devmode_toggle__"><span class="sp-toggle-knob"></span></button>
                        <span class="sp-set-row-aside" id="__st_devmode_label__">Shows Developer tab</span>
                    </div>
                </div>
            </div>
            <!-- Actions -->
            <div class="sp-set-section">
                <div class="sp-set-section-title">Actions</div>
                <div class="sp-set-actions">
                    <button type="button" class="sp-set-action" id="__st_check_updates__">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/></svg>
                        Check for updates
                    </button>
                    <button type="button" class="sp-set-action" id="__st_safemode_btn__">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        Safe mode
                    </button>
                    <button type="button" class="sp-set-action" id="__st_conflict_btn__">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        Detect conflicts
                    </button>
                    <button type="button" class="sp-set-action" id="__st_reload_btn__">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        Reload Stremio
                    </button>
                    <button type="button" class="sp-set-action sp-set-action-wide" id="__st_exportconfig_btn__">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                        Export / share configuration
                    </button>
                    <button type="button" class="sp-set-action sp-set-action-wide sp-set-action-danger" id="__st_simulate_crash__">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        Simulate crash
                    </button>
                </div>
            </div>
            <!-- Playback Backend -->
            <div class="sp-set-section" id="__st_backend_section__">
                <div class="sp-set-section-title">Playback backend</div>
                <div class="st-be-grid">
                    <button type="button" class="st-be-card" data-be="service">
                        <span class="st-be-card-icon">🌐</span>
                        <span class="st-be-card-name">Stremio Service</span>
                        <span class="st-be-card-hint">localhost:11470</span>
                    </button>
                    <button type="button" class="st-be-card" data-be="mpv">
                        <span class="st-be-card-icon">🎬</span>
                        <span class="st-be-card-name">MPV (native)</span>
                        <span class="st-be-card-hint">Thumbnail + upscale</span>
                    </button>
                    <button type="button" class="st-be-card" data-be="server">
                        <span class="st-be-card-icon">🖥</span>
                        <span class="st-be-card-name">server.js</span>
                        <span class="st-be-card-hint">Local stream server</span>
                    </button>
                    <button type="button" class="st-be-card" data-be="native">
                        <span class="st-be-card-icon">📺</span>
                        <span class="st-be-card-name">Native &lt;video&gt;</span>
                        <span class="st-be-card-hint">Coming soon</span>
                    </button>
                </div>
                <div class="st-svc-status-row" id="__st_svc_status_row__">
                    <span class="st-svc-dot checking" id="__st_svc_dot__"></span>
                    <span class="st-svc-status-txt" id="__st_svc_status_txt__">Checking Stremio Service…</span>
                </div>
                <div class="st-mpv-prefs" id="__st_mpv_prefs__">
                    <div class="st-mpv-pref-row">
                        <span class="st-mpv-pref-label">Upscale shader path</span>
                        <input class="st-mpv-pref-input" id="__st_mpv_shader__" placeholder="~/.config/mpv/shaders/Anime4K.glsl" />
                    </div>
                    <div class="st-mpv-pref-row">
                        <span class="st-mpv-pref-label">Extra MPV flags</span>
                        <input class="st-mpv-pref-input" id="__st_mpv_flags__" placeholder="--vo=gpu --gpu-api=vulkan" />
                    </div>
                    <button class="st-mpv-save-btn" id="__st_mpv_save__">Save MPV prefs</button>
                </div>
            </div>
            <!-- Diagnostics + About -->
            <div class="sp-set-section">
                <div class="sp-set-section-title">Diagnostics</div>
                <div class="sp-set-row"><span class="sp-set-row-label">Plugins loaded</span><span class="sp-set-row-aside" id="__st_diag_plugins__">—</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label">Themes loaded</span><span class="sp-set-row-aside" id="__st_diag_themes__">—</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label">Avg inject time</span><span class="sp-set-row-aside" id="__st_diag_loadtime__">—</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label">Updates available</span><span class="sp-set-row-aside" id="__st_diag_updates__">—</span></div>
                <div class="sp-set-row">
                    <span class="sp-set-row-label">Live reload</span>
                    <div class="sp-set-row-ctrl">
                        <button type="button" class="sp-toggle lg" id="__st_livereload_toggle__"><span class="sp-toggle-knob"></span></button>
                        <span class="sp-set-row-aside" id="__st_livereload_label__">Off</span>
                    </div>
                </div>
                <div class="sp-set-row"><span class="sp-set-row-label">Data dir</span><span class="sp-set-row-aside" id="__st_datadir__" title="Click to copy" style="font-family:ui-monospace,'SF Mono',Menlo,monospace;cursor:pointer;font-size:10px;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">—</span></div>
            </div>
            <!-- About -->
            <div class="sp-set-section">
                <div class="sp-set-section-title">About</div>
                <div class="sp-set-row"><span class="sp-set-row-label">Author</span><span class="sp-set-row-aside">Fxy6969</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label">License</span><span class="sp-set-row-aside">MIT</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label">Source</span><a class="sp-set-row-aside" href="https://github.com/Fxy6969/Stremio-Plus" target="_blank" style="text-decoration:underline;cursor:pointer;color:inherit">github.com/Fxy6969</a></div>
            </div>
            <!-- Keyboard shortcuts -->
            <div class="sp-set-section" style="opacity:0.65;padding-bottom:4px">
                <div class="sp-set-section-title">Keyboard shortcuts</div>
                <div class="sp-set-row"><span class="sp-set-row-label"><span class="sp-kbd">⇧ Space</span></span><span class="sp-set-row-aside">Open / close menu</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label"><span class="sp-kbd">Esc</span></span><span class="sp-set-row-aside">Close menu</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label"><span class="sp-kbd">⌘K</span></span><span class="sp-set-row-aside">Command palette</span></div>
                <div class="sp-set-row"><span class="sp-set-row-label"><span class="sp-kbd">⌘S</span></span><span class="sp-set-row-aside">Apply CSS immediately</span></div>
            </div>
        </div>
        <!-- ── Footer (always visible, pinned last) ── -->
        <div class="sp-footer">
            <button type="button" class="sp-foot-btn" id="__st_pal_foot__">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>
                Command palette
                <span class="sp-kbd">⌘K</span>
            </button>
            <div class="sp-foot-spacer"></div>
            <button class="st-folder-btn" id="__st_folder__" style="border:none;background:transparent;color:rgba(255,255,255,0.35);gap:5px;padding:4px 8px;cursor:pointer">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <span class="sp-foot-status">
                <span class="sp-foot-dot"></span>
                <span>StremioPlus · synced</span>
            </span>
        </div>
    </div>`;
    
    root.appendChild(overlay);

    // ── Toast stack ───────────────────────────────────────────────────────────────
    const toastStack = document.createElement('div');
    toastStack.id = '__st_toast_stack__';
    document.documentElement.appendChild(toastStack);

    // ── Activity content area ─────────────────────────────────────────────────────
    const activityWrap = document.createElement('div');
    activityWrap.id = '__st_activity_wrap__';
    const activityLog = [];
    function pushActivity(kind, title, detail) {
        const toneMap = { enabled:'ok', disabled:'neutral', applied:'ok', installed:'ok', update:'info', warn:'warn', error:'warn' };
        const tone = toneMap[kind] || 'info';
        const now = new Date();
        activityLog.unshift({ kind, tone, title, detail, time: now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) });
        if (activityLog.length > 30) activityLog.pop();
        renderActivity();
    }
    function renderActivity() {
        activityWrap.innerHTML = activityLog.length === 0
            ? `<div class="st-empty"><span class="st-empty-ico">📋</span>No activity yet</div>`
            : activityLog.map(a => `
                <div class="sp-act sp-act-${a.tone}">
                    <div class="sp-act-dot"></div>
                    <div class="sp-act-body">
                        <div class="sp-act-title">${escapeHtml(a.title)}</div>
                        ${a.detail ? `<div class="sp-act-detail">${escapeHtml(a.detail)}</div>` : ''}
                    </div>
                    <div class="sp-act-time">${a.time}</div>
                </div>`).join('');
    }
    document.getElementById('__st_panel__').insertBefore(activityWrap, document.getElementById('__st_marketplace_wrap__'));

    // ── Marketplace mock data + renderer ─────────────────────────────────────────
    const MKT_DATA = [
        { id:'captions-translate', name:'Captions Translate', version:'0.3.0', author:'harbor', type:'plugin', desc:'Live-translate subtitles via local model.', stars:88, installed:false, hue:200,
          trending:{ weekly:1240, rank:1, deltaPct:320 },
          previews:[
              { title:'Live translation overlay', colors:['#0a1a2e','#1d4e89','#7ec8e3'] },
              { title:'Language picker',           colors:['#0a1a2e','#3b6ea5','#cfe6f4'] },
          ]},
        { id:'ambient-light', name:'Ambient Light', version:'1.0.0', author:'lumen', type:'plugin', desc:'Match Hue bulbs to on-screen color.', stars:412, installed:false, hue:50,
          trending:{ weekly:810, rank:2, deltaPct:180 },
          previews:[
              { title:'Hue bulb sync',  colors:['#1a1208','#8a5a18','#ffd27a'] },
              { title:'Color sampling', colors:['#1a1208','#d97757','#ffba7e'] },
          ]},
        { id:'midnight-blue', name:'Midnight Blue', version:'1.2.0', author:'kestrel', type:'theme', desc:'Deep blue with ivory accents.', stars:263, installed:true, hue:220,
          trending:{ weekly:210, rank:5, deltaPct:20 },
          previews:[
              { title:'Home screen', colors:['#06091a','#101d3d','#e8ecff'] },
              { title:'Player',      colors:['#06091a','#1a2a55','#cfd6ff'] },
          ]},
        { id:'auto-quality', name:'Auto Quality', version:'0.6.1', author:'delta', type:'plugin', desc:'Pick stream resolution by bandwidth.', stars:144, installed:false, hue:290,
          trending:{ weekly:290, rank:4, deltaPct:44 }, previews:[] },
        { id:'rotten-overlay', name:'Rotten Overlay', version:'2.4.0', author:'northwind', type:'plugin', desc:'Show Rotten Tomatoes scores on cards.', stars:920, installed:false, hue:10,
          trending:{ weekly:642, rank:3, deltaPct:85 },
          previews:[
              { title:'Score overlay', colors:['#1a0a0a','#a32a1a','#ffb6a8'] },
              { title:'Tomato meter',  colors:['#1a0a0a','#c93a2a','#ffe6e0'] },
          ]},
        { id:'paper-light', name:'Paper Light', version:'1.0.0', author:'harbor', type:'theme', desc:'Light theme. Warm, low-saturation.', stars:71, installed:false, hue:30,
          trending:{ weekly:58, rank:6, deltaPct:8 },
          previews:[
              { title:'Light home',    colors:['#f4ede1','#d6c5a8','#5a4632'] },
              { title:'Light library', colors:['#f4ede1','#c9b48f','#3e2e1e'] },
          ]},
    ];
    let mktFilter   = 'all';
    let mktSort     = 'trending';
    let mktExpanded = null;
    let mktInstalled = new Set(MKT_DATA.filter(m => m.installed).map(m => m.id));

    function renderMarketplace() {
        const mktList = document.getElementById('__st_mkt_list__');
        if (!mktList) return;
        let items = [...MKT_DATA];
        if (mktFilter !== 'all') items = items.filter(m => m.type === mktFilter);
        if (mktSort === 'trending') items.sort((a,b) => (b.trending?.weekly||0) - (a.trending?.weekly||0));
        else if (mktSort === 'stars') items.sort((a,b) => b.stars - a.stars);
        if (items.length === 0) { mktList.innerHTML = '<div class="st-empty"><span class="st-empty-ico">🔍</span>No items found</div>'; return; }
        const previewTile = (p) => `
            <div class="sp-prev-tile" style="--p0:${p.colors[0]};--p1:${p.colors[1]};--p2:${p.colors[2]}">
                <div class="sp-prev-art">
                    <div class="sp-prev-art-bg"></div>
                    <div class="sp-prev-art-row" style="width:60%"></div>
                    <div class="sp-prev-art-row" style="width:40%"></div>
                    <div class="sp-prev-art-pill"></div>
                    <div class="sp-prev-art-grid"><span></span><span></span><span></span><span></span></div>
                </div>
                <div class="sp-prev-cap">${escapeHtml(p.title)}</div>
            </div>`;
        mktList.innerHTML = items.map((m, i) => {
            const installed = mktInstalled.has(m.id);
            const exp = mktExpanded === m.id;
            const tr = m.trending;
            const starsStr = m.stars >= 1000 ? (m.stars/1000).toFixed(1)+'k' : m.stars;
            const monogram = m.name.slice(0,2);
            const trendBadge = tr && tr.rank <= 3
                ? `<span class="sp-trend-badge"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg> #${tr.rank}</span>`
                : '';
            const velocity = tr
                ? `<span class="sp-velocity"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/></svg>${tr.weekly.toLocaleString()}/wk<span class="sp-velocity-delta">+${tr.deltaPct}%</span></span>`
                : '';
            const previewHint = m.previews.length > 0
                ? `<span class="sp-preview-hint"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg> ${exp ? 'hide' : 'previews'}</span>`
                : '';
            const previewStrip = exp && m.previews.length > 0
                ? `<div class="sp-prev-strip">${m.previews.map(previewTile).join('')}</div>`
                : '';
            return `<div class="st-card ${exp ? 'expanded' : ''} st-card-enter" data-mkt-id="${escapeHtml(m.id)}" style="animation-delay:${Math.min(i,8)*28}ms">
                <div class="st-card-main" style="cursor:pointer">
                    <div class="st-card-icon" style="--icon-hue:${m.hue}">${escapeHtml(monogram)}</div>
                    <div class="st-card-body">
                        <div class="st-card-name" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                            <span>${escapeHtml(m.name)}</span>
                            <span class="sp-type-tag sp-type-${escapeHtml(m.type)}">${escapeHtml(m.type)}</span>
                            <span class="sp-card-version">v${escapeHtml(m.version)}</span>
                            ${trendBadge}
                        </div>
                        <div class="st-card-desc">${escapeHtml(m.desc)}</div>
                        <div class="st-card-meta">
                            <button class="sp-author-chip" data-mkt-author="${escapeHtml(m.author)}"> <span>by ${escapeHtml(m.author)}</span></button>
                            <span class="sp-stars"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l2.5 6 6.5.5-5 4.5L17.5 21 12 17.5 6.5 21l1.5-6.5L3 9.5 9.5 9z"/></svg>${starsStr}</span>
                            ${velocity}
                            ${previewHint}
                        </div>
                    </div>
                    <div class="st-card-right">
                        <button class="sp-pill ${installed ? 'active' : 'primary'}" data-mkt-install="${escapeHtml(m.id)}">${installed ? 'Installed' : 'Install'}</button>
                    </div>
                </div>
                ${previewStrip}
            </div>`;
        }).join('');
        // Wire expand
        mktList.querySelectorAll('[data-mkt-id]').forEach(card => {
            card.querySelector('.st-card-main').onclick = () => {
                const id = card.dataset.mktId;
                mktExpanded = mktExpanded === id ? null : id;
                renderMarketplace();
            };
        });
        // Wire install
        mktList.querySelectorAll('[data-mkt-install]').forEach(btn => {
            btn.onclick = e => {
                e.stopPropagation();
                const id = btn.dataset.mktInstall;
                if (!mktInstalled.has(id)) {
                    mktInstalled.add(id);
                    const m = MKT_DATA.find(x => x.id === id);
                    if (m) { showToast(`Installed "${m.name}"`, 'ok'); pushActivity('installed', 'Marketplace install', m.name); }
                    renderMarketplace();
                }
            };
        });
        // Wire author chips
        mktList.querySelectorAll('[data-mkt-author]').forEach(chip => {
            chip.onclick = e => { e.stopPropagation(); openAuthorDrawer(chip.dataset.mktAuthor); };
        });
    }

    // Wire marketplace filter bar chips
    const mktFilterBar = document.getElementById('__st_mkt_filters__');
    if (mktFilterBar) {
        // Replace filter bar with sp-chip style
        mktFilterBar.innerHTML = `
            <div class="sp-market-filters" id="__st_mkt_chips__">
                <button class="sp-chip active" data-mkt-filter="all">All</button>
                <button class="sp-chip" data-mkt-filter="plugin">Plugins</button>
                <button class="sp-chip" data-mkt-filter="theme">Themes</button>
                <div class="sp-market-spacer"></div>
                <button class="sp-chip active" data-mkt-sort="trending"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg> Trending</button>
                <button class="sp-chip" data-mkt-sort="stars"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l2.5 6 6.5.5-5 4.5L17.5 21 12 17.5 6.5 21l1.5-6.5L3 9.5 9.5 9z"/></svg> Top stars</button>
            </div>
        `;
        mktFilterBar.querySelectorAll('[data-mkt-filter]').forEach(btn => {
            btn.onclick = () => {
                mktFilterBar.querySelectorAll('[data-mkt-filter]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                mktFilter = btn.dataset.mktFilter;
                renderMarketplace();
            };
        });
        mktFilterBar.querySelectorAll('[data-mkt-sort]').forEach(btn => {
            btn.onclick = () => {
                mktFilterBar.querySelectorAll('[data-mkt-sort]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                mktSort = btn.dataset.mktSort;
                renderMarketplace();
            };
        });
    }

    // ── Command palette overlay ───────────────────────────────────────────────────
    const cmdpalOverlay = document.createElement('div');
    cmdpalOverlay.id = '__st_cmdpal_overlay__';
    cmdpalOverlay.innerHTML = `
        <div class="sp-pal" id="__st_cmdpal__">
            <div class="sp-pal-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>
                <input id="__st_pal_input__" autofocus placeholder="Run a command, search plugins, themes…" autocomplete="off" spellcheck="false">
                <span class="st-kbd">esc</span>
            </div>
            <div class="sp-pal-list" id="__st_pal_list__"></div>
        </div>
    `;
    document.documentElement.appendChild(cmdpalOverlay);

    // ── Author drawer overlay ─────────────────────────────────────────────────────
    const authorOverlay = document.createElement('div');
    authorOverlay.id = '__st_author_overlay__';
    authorOverlay.innerHTML = `
        <div class="sp-auth-drawer">
            <button class="sp-auth-close" id="__st_author_close__">✕</button>
            <div class="sp-auth-hero" id="__st_author_hero__"></div>
            <div id="__st_author_body__"></div>
        </div>
    `;
    document.documentElement.appendChild(authorOverlay);

    // ── Export modal overlay ──────────────────────────────────────────────────────
    const exportOverlay = document.createElement('div');
    exportOverlay.id = '__st_export_overlay__';
    exportOverlay.innerHTML = `
        <div class="sp-export-modal">
            <button class="sp-auth-close" id="__st_export_close__">✕</button>
            <div class="sp-export-title">Share configuration</div>
            <div class="sp-export-sub">A link your friends can paste into Stremio+ to install your exact plugin set, theme, and accent color.</div>
            <div class="sp-export-stats" id="__st_export_stats__"></div>
            <div class="sp-export-code" id="__st_export_code__"></div>
            <div class="sp-export-actions">
                <button class="sp-export-btn primary" id="__st_export_copy__">Copy link</button>
                <button class="sp-export-btn" id="__st_export_json__">Download as .json</button>
            </div>
        </div>
    `;
    document.documentElement.appendChild(exportOverlay);

    // ── Changelog modal ───────────────────────────────────────────────────────────
    const changelogModal = document.createElement('div');
    changelogModal.id = '__st_changelog_modal__';
    changelogModal.innerHTML = `<div class="st-cl-panel">
        <div class="st-cl-header">
            <div class="st-cl-title" id="__st_cl_title__">Changelog</div>
            <div class="st-cl-sub" id="__st_cl_sub__"></div>
            <button class="st-cl-close" id="__st_cl_close__">✕</button>
        </div>
        <div class="st-cl-body" id="__st_cl_body__"><div class="st-cl-loading">Loading…</div></div>
    </div>`;
    root.appendChild(changelogModal);
    document.getElementById('__st_cl_close__').onclick = () => changelogModal.classList.remove('open');
    changelogModal.addEventListener('mousedown', e => { if (e.target === changelogModal) changelogModal.classList.remove('open'); });
    
    // ── Helpers ───────────────────────────────────────────────────────────────────
    const invoke = window.__stElectronIPC__;
    function escapeHtml(s) {
        if (!s) return '';
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
    let toastTimer; // kept for compat
    function _dismissToast(el) {
        if (el._dismissing) return;
        el._dismissing = true;
        clearTimeout(el._toastTimer);
        el.classList.add('sp-toast-out');
        el.addEventListener('animationend', () => el.remove(), { once: true });
        setTimeout(() => el.remove(), 400);
    }
    // showToast(msg, type)            — simple: string message
    // showToast({title,detail,actions}, type, {duration})  — rich card
    function showToast(msg, type = '', opts = {}) {
        let title, detail, actions;
        if (msg !== null && typeof msg === 'object') {
            title = msg.title || ''; detail = msg.detail; actions = msg.actions;
        } else {
            title = String(msg || '');
        }
        const tone     = type === 'ok' ? 'ok' : type === 'err' ? 'err' : 'info';
        const duration = opts.duration ?? 3500;
        const el = document.createElement('div');
        el.className = `sp-toast sp-toast-${tone}`;

        const iconSvgs = {
            ok:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
            err:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
            info: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        };

        const footerHtml = actions && actions.length
            ? `<div class="sp-toast-footer">${actions.map((a,i) => `<button class="sp-toast-btn${a.primary?' primary':''}" data-ai="${i}">${escapeHtml(a.label)}</button>`).join('')}</div>`
            : '';

        el.innerHTML = `
            <div class="sp-toast-head">
                <div class="sp-toast-icon-sq">${iconSvgs[tone]}</div>
                <div class="sp-toast-text">
                    <div class="sp-toast-title">${escapeHtml(title)}</div>
                    ${detail ? `<div class="sp-toast-detail">${escapeHtml(detail)}</div>` : ''}
                </div>
            </div>
            ${footerHtml}
            <div class="sp-toast-progress" style="animation-duration:${duration}ms"></div>
        `;

        if (actions) {
            el.querySelectorAll('[data-ai]').forEach(btn => {
                const a = actions[+btn.dataset.ai];
                if (a) btn.onclick = () => { a.fn(); _dismissToast(el); };
            });
        }
        // tap anywhere on a no-action toast to dismiss
        if (!actions || !actions.length) el.onclick = () => _dismissToast(el);

        toastStack.appendChild(el);
        // hard-remove oldest without animation to prevent infinite loop
        const MAX = 3;
        while (toastStack.children.length > MAX) toastStack.firstElementChild.remove();
        el._toastTimer = setTimeout(() => _dismissToast(el), duration);
        el.addEventListener('mouseenter', () => clearTimeout(el._toastTimer), { once: true });
    }
    
    function isEnabled(n) {
        const p = allPlugins.find(x => x.name === n);
        return p ? p.enabled : true;
    }
    
    // ── State ─────────────────────────────────────────────────────────────────────
    let allPlugins   = [];
    let currentTab   = 'themes';
    let query        = '';
    let expandedSet  = new Set();
    let settingsCache = {};
    // starCache: { 'user/repo' -> number } — persists for the session so tab switches don't re-fetch
    const starCache  = {};

    // ── Safe mode ─────────────────────────────────────────────────────────────────
    const SAFEMODE_KEY          = '__st_safemode__';
    const SAFEMODE_SNAPSHOT_KEY = '__st_safemode_snapshot__';
    let safeModeActive   = false;
    let safeModeSnapshot = null; // { name -> enabled } before safe mode

    function persistSafeMode(active, snapshot) {
        try {
            localStorage.setItem(SAFEMODE_KEY, active ? '1' : '0');
            if (snapshot) localStorage.setItem(SAFEMODE_SNAPSHOT_KEY, JSON.stringify(snapshot));
            else          localStorage.removeItem(SAFEMODE_SNAPSHOT_KEY);
        } catch(_) {}
    }

    // ── Error log ─────────────────────────────────────────────────────────────────
    // pluginErrors: { pluginName -> [msg, ...] }
    const pluginErrors = {};
    // Patch console.error to capture [Stremio+] plugin errors
    const _origConsoleError = console.error.bind(console);
    console.error = (...args) => {
        _origConsoleError(...args);
        const msg = args.map(a => (typeof a === 'string' ? a : (a?.message || String(a)))).join(' ');
        const m = msg.match(/\\[Stremio\\+\\] plugin "([^"]+)" threw:/);
        if (m) {
            const name = m[1];
            if (!pluginErrors[name]) pluginErrors[name] = [];
            const detail = args.slice(1).map(a => a?.stack || String(a)).join('\\n');
            pluginErrors[name].push(new Date().toLocaleTimeString() + ' — ' + (detail || msg));
            // Update badge if card is in DOM
            const badge = document.getElementById('__st_errbadge_' + name.replace(/\\W/g,'_') + '__');
            if (badge) { badge.textContent = pluginErrors[name].length; badge.style.display = 'inline-flex'; }
        }
    };

    // ── Notes store ───────────────────────────────────────────────────────────────
    const NOTES_KEY = '__st_notes__';
    function getNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'); } catch(_) { return {}; } }
    function saveNote(name, text) { const n = getNotes(); if (text) n[name] = text; else delete n[name]; try { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); } catch(_) {} }

    // ── Load times ────────────────────────────────────────────────────────────────
    const pluginLoadTimes = {}; // { name -> ms }

    // ── Live reload ───────────────────────────────────────────────────────────────
    let liveReloadInterval = null;
    let liveReloadSnapshot = null; // JSON string of plugin list for comparison
    const LIVERELOAD_KEY = '__st_livereload__';

    function startLiveReload() {
        if (liveReloadInterval) return;
        liveReloadInterval = setInterval(async () => {
            try {
                const fresh = await invoke('list_plugins');
                const snap = JSON.stringify(fresh.map(p => ({ name: p.name, version: p.version })));
                if (liveReloadSnapshot && snap !== liveReloadSnapshot) {
                    liveReloadSnapshot = snap;
                    allPlugins = fresh;
                    invoke('reload_app').catch(() => { try { window.location.reload(); } catch(_) {} });
                } else {
                    liveReloadSnapshot = snap;
                }
            } catch(_) {}
        }, 2000);
        document.getElementById('__st_livereload_label__').textContent = 'Polling every 2s';
    }

    function stopLiveReload() {
        clearInterval(liveReloadInterval);
        liveReloadInterval = null;
        liveReloadSnapshot = null;
        document.getElementById('__st_livereload_label__').textContent = 'Off';
    }

    // ── Conflict detector ─────────────────────────────────────────────────────────
    function detectConflicts(plugins) {
        // Extract CSS selectors from plugin source (very lightweight heuristic)
        const selectorMap = {}; // selector -> [pluginName]
        const RE = /([.#][\\w-]+(?:\\s*[,{]))/g;
        for (const p of plugins) {
            if (!p.source) continue;
            const matches = [...p.source.matchAll(RE)].map(m => m[1].replace(/[,{]/,'').trim());
            const unique = [...new Set(matches)];
            for (const sel of unique) {
                if (!selectorMap[sel]) selectorMap[sel] = [];
                selectorMap[sel].push(p.name);
            }
        }
        // Only flag selectors used by 2+ enabled plugins
        const conflicts = {}; // pluginName -> [{ selector, conflictsWith: [name] }]
        for (const [sel, names] of Object.entries(selectorMap)) {
            if (names.length < 2) continue;
            const enabledNames = names.filter(n => allPlugins.find(p => p.name === n)?.enabled !== false);
            if (enabledNames.length < 2) continue;
            for (const n of enabledNames) {
                if (!conflicts[n]) conflicts[n] = [];
                conflicts[n].push({ selector: sel, conflictsWith: enabledNames.filter(x => x !== n) });
            }
        }
        return conflicts;
    }

    // conflicts state: populated after detect runs
    let conflictData = {};

    // ── Keyboard navigation ───────────────────────────────────────────────────────
    let kbIndex = -1;

    function getListCards() {
        return [...document.querySelectorAll('#__st_list__ .st-card')];
    }

    function setKbFocus(idx) {
        const cards = getListCards();
        cards.forEach((c, i) => c.classList.toggle('kb-focused', i === idx));
        if (cards[idx]) {
            cards[idx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        kbIndex = idx;
    }

    // ── Theme CSS variable live editor ────────────────────────────────────────────
    function extractCssVars(source) {
        // Find :root { --var: value; } declarations
        const vars = [];
        const RE = /--[\\w-]+\\s*:\\s*[^;]+;/g;
        const matches = source.match(RE) || [];
        for (const m of matches) {
            const [prop, ...rest] = m.split(':');
            const value = rest.join(':').replace(';','').trim();
            const name = prop.trim();
            vars.push({ name, value });
        }
        return [...new Map(vars.map(v => [v.name, v])).values()]; // dedupe
    }

    function applyThemeVarOverride(varName, value) {
        let tag = document.getElementById('__st_themevar_overrides__');
        if (!tag) { tag = document.createElement('style'); tag.id = '__st_themevar_overrides__'; document.head.appendChild(tag); }
        // Rebuild all overrides from stored map
        themeVarOverrides[varName] = value;
        tag.textContent = ':root{' + Object.entries(themeVarOverrides).map(([k,v]) => `${k}:${v}`).join(';') + '}';
    }

    const themeVarOverrides = {};

    // ── Preview theme (enable temporarily without saving) ─────────────────────────
    let previewingTheme = null;
    let previewStyleTag = null;
    // ── Shared enable/disable logic ───────────────────────────────────────────────
    // Single source of truth called from the card toggle, command palette, and safe-mode.
    async function doToggle(p, nowOn) {
        await invoke('set_plugin_enabled', { name: p.name, enabled: nowOn });
        p.enabled = nowOn;
        // Sync localStorage so old settings-page toggles stay consistent
        try {
            let ls = JSON.parse(localStorage.getItem('enabledPlugins') || '[]');
            if (nowOn) { if (!ls.includes(p.file)) ls.push(p.file); }
            else        { ls = ls.filter(f => f !== p.file); }
            localStorage.setItem('enabledPlugins', JSON.stringify(ls));
        } catch(_) {}
        if (p.kind === 'Plugin') {
            if (!nowOn) document.getElementById(p.file)?.remove();
        } else {
            if (!nowOn) {
                document.getElementById('activeTheme')?.remove();
                document.querySelectorAll(`style[data-plugin="${CSS.escape(p.name)}"]`).forEach(e => e.remove());
                if (localStorage.getItem('currentTheme') === p.file) localStorage.setItem('currentTheme', 'Default');
            } else {
                invoke('get_plugin_source', { name: p.name, kind: p.kind, file: p.file }).then(src => {
                    if (!src) return;
                    document.getElementById('activeTheme')?.remove();
                    document.querySelectorAll('style[data-plugin]').forEach(e => e.remove());
                    const s = document.createElement('style');
                    s.id = 'activeTheme'; s.dataset.plugin = p.name; s.textContent = src;
                    document.head.appendChild(s);
                    localStorage.setItem('currentTheme', p.file);
                }).catch(() => {});
            }
        }
        const msg = nowOn
            ? (p.kind === 'Plugin' ? 'Enabled "' + p.name + '" — reload to apply' : 'Enabled theme "' + p.name + '"')
            : (p.kind === 'Plugin' ? 'Disabled "' + p.name + '"'                   : 'Disabled theme "' + p.name + '"');
        pushActivity(nowOn ? 'enabled' : 'disabled', msg, p.kind);
        return msg;
    }

    // source cache: name -> css string (fetched on demand since list_plugins omits source)
    const sourceCache = {};

    async function fetchPluginSource(p) {
        if (sourceCache[p.name]) return sourceCache[p.name];
        if (p.source) { sourceCache[p.name] = p.source; return p.source; }
        // Ask Rust for the file contents directly — this works whether or not the
        // theme is currently enabled (injected). get_plugin_source sanitises the
        // name the same way install_from_url does, so "My Theme" → "My-Theme.css".
        try {
            const src = await invoke('get_plugin_source', { name: p.name, kind: p.kind, file: p.file });
            if (src) { sourceCache[p.name] = src; return src; }
        } catch(_) {}
        // Last-resort fallback: check for an already-injected style tag
        const existing = document.querySelector(`style[data-plugin="${CSS.escape(p.name)}"]`);
        if (existing) {
            sourceCache[p.name] = existing.textContent;
            return existing.textContent;
        }
        return null;
    }

    async function previewTheme(p) {
        if (previewingTheme === p.name) {
            // toggle off
            previewingTheme = null;
            if (previewStyleTag) { previewStyleTag.remove(); previewStyleTag = null; }
            return false;
        }
        if (previewStyleTag) previewStyleTag.remove();
        previewingTheme = p.name;

        const src = await fetchPluginSource(p);
        if (!src) {
            showToast('Preview unavailable — could not load theme source', 'err');
            previewingTheme = null;
            return false;
        }

        previewStyleTag = document.createElement('style');
        previewStyleTag.id = '__st_theme_preview__';
        previewStyleTag.dataset.plugin = p.name;
        previewStyleTag.textContent = src;
        document.head.appendChild(previewStyleTag);
        return true;
    }

    // ── Changelog fetch ───────────────────────────────────────────────────────────
    async function showChangelog(p) {
        if (!p.github) return;
        changelogModal.classList.add('open');
        document.getElementById('__st_cl_title__').textContent = p.name + ' — Changelog';
        document.getElementById('__st_cl_sub__').textContent = 'github.com/' + p.github;
        const body = document.getElementById('__st_cl_body__');
        body.innerHTML = '<div class="st-cl-loading">Fetching releases…</div>';
        try {
            const res = await fetch(`https://api.github.com/repos/${p.github}/releases?per_page=5`, {
                headers: { Accept: 'application/vnd.github+json' }
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const releases = await res.json();
            if (!releases.length) { body.innerHTML = '<div class="st-cl-loading">No releases found.</div>'; return; }
            body.innerHTML = releases.map(r => {
                const date = new Date(r.published_at).toLocaleDateString();
                const notes = (r.body || 'No release notes.').replace(/</g,'&lt;').replace(/\\n/g,'<br>');
                return `<span class="st-cl-tag">${escapeHtml(r.tag_name)} · ${date}</span>
                    <h3>${escapeHtml(r.name || r.tag_name)}</h3>
                    <p>${notes}</p>`;
            }).join('<hr style="border:none;border-top:0.5px solid rgba(255,255,255,0.06);margin:12px 0">');
        } catch(e) {
            body.innerHTML = `<div class="st-cl-loading">Could not load releases: ${escapeHtml(String(e))}</div>`;
        }
    }

    function formatStars(n) {
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\\.0$/, '') + 'k';
        return String(n);
    }
    // ── JS settings API (callable from plugin code) ───────────────────────────────
    // Inside a plugin .js file:
    //   const s = StremioSettings.for('MyPlugin');
    //   const darkMode  = s.toggle('darkMode',  'Dark mode',   true);
    //   const accent    = s.color ('accent',    'Accent color','#e74c3c');
    //   const opacity   = s.slider('opacity',   'Opacity',     80,  { min:0, max:100, step:1, hint:'%' });
    //   const language  = s.enum  ('language',  'Language',    'English', ['English','French','German']);
    //   const greeting  = s.text  ('greeting',  'Greeting',    'Hello');
    //   // Each call returns a getter: darkMode() === current saved value
    window.StremioSettings = (() => {
        const _cache = {};
        async function _load(plugin) {
            if (_cache[plugin]) return _cache[plugin];
            try { _cache[plugin] = await window.__stElectronIPC__('get_settings', { pluginName: plugin }) || {}; }
            catch(_) { _cache[plugin] = {}; }
            return _cache[plugin];
        }
        async function _save(plugin, key, value) {
            const data = await _load(plugin);
            data[key] = value;
            try { await window.__stElectronIPC__('save_settings', { pluginName: plugin, settings: data }); }
            catch(e) { console.warn('[StremioSettings] save failed', e); }
        }
        function _getter(plugin, key, def) {
            return () => { const d = _cache[plugin]; return d && d[key] !== undefined ? d[key] : def; };
        }
        function _init(plugin, key, def) {
            _load(plugin).then(d => { if (d[key] === undefined) _save(plugin, key, def); });
            return _getter(plugin, key, def);
        }
        function api(plugin) {
            _load(plugin);
            return {
                toggle(key, label, defaultVal)          { return _init(plugin, key, defaultVal); },
                color (key, label, defaultVal)          { return _init(plugin, key, defaultVal); },
                slider(key, label, defaultVal, opts={}) { return _init(plugin, key, defaultVal); },
                enum  (key, label, defaultVal, options) { return _init(plugin, key, defaultVal); },
                text  (key, label, defaultVal)          { return _init(plugin, key, defaultVal); },
            };
        }
        return { for: api };
    })();
    
    // ── Setting control renderer ──────────────────────────────────────────────────
    function renderCtrl(s, saved) {
        const v = saved[s.key] !== undefined ? saved[s.key] : s.default;
        if (s.kind === 'toggle') {
            const on = String(v) === 'true';
            return `<div class="st-s-toggle ${on?'on':''}" data-setting="${s.key}" data-type="toggle"></div>`;
        }
        if (s.kind === 'color') {
            const safeV = escapeHtml(v);
            return `<div class="st-s-color-wrap" data-setting="${escapeHtml(s.key)}" data-type="color">
                <div class="st-s-swatch" style="background:${safeV}" title="${safeV}"></div>
            </div>`;
        }
        if (s.kind === 'range') {
            const min = s.min ?? 0, max = s.max ?? 100, step = s.step ?? 1;
            return `<div class="st-s-range-wrap">
                <input type="range" class="st-s-range" data-setting="${s.key}" data-type="range" min="${min}" max="${max}" step="${step}" value="${v}">
                <span class="st-s-range-val" id="__rv_${s.key}__">${v}</span>
            </div>`;
        }
        if (s.kind === 'text') {
            return `<input class="st-s-text" data-setting="${s.key}" data-type="text" value="${v}" placeholder="${s.default}">`;
        }
        if (s.kind === 'select') {
            const opts = s.options.map(o => `<option value="${escapeHtml(o)}"${o===v?' selected':''}>${escapeHtml(o)}</option>`).join('');
            return `<select class="st-s-select" data-setting="${escapeHtml(s.key)}" data-type="select">${opts}</select>`;
        }
        return '';
    }
    
    // ── Custom dropdown engine ────────────────────────────────────────────────────
    // (custom dropdown engine removed — select settings use native <select>)

    // ── Custom color picker engine ────────────────────────────────────────────────
    // Palette: 8 columns × 8 rows of perceptually-spread colours
    const _CP_PALETTE = [
        '#ffffff','#e8e8e8','#c8c8c8','#a0a0a0','#707070','#484848','#282828','#000000',
        '#ffd6d6','#ffaaaa','#ff7070','#ff3030','#cc0000','#990000','#660000','#3d0000',
        '#ffe0c8','#ffbf88','#ff9944','#ff7700','#cc5500','#993300','#662200','#3d1400',
        '#fffacc','#fff599','#ffec55','#ffdc00','#ccaa00','#997700','#664400','#3d2800',
        '#d4f5d4','#aaeaaa','#77dd77','#44cc44','#229922','#116611','#003300','#001a00',
        '#cceeff','#99ddff','#55c8ff','#00aaff','#0077cc','#004d99','#002b66','#001433',
        '#ddd6ff','#bbaeff','#9977ff','#7744ff','#5511dd','#3300aa','#1a0077','#0d0044',
        '#ffd6f5','#ffaaee','#ff77dd','#ff33cc','#cc00aa','#990077','#660055','#3d0033',
    ];
    let _cpPicker = null;
    let _cpCallback = null;

    function buildColorPicker() {
        if (_cpPicker) return;
        const el = document.createElement('div');
        el.className = 'st-cpick';
        el.id = '__st_cpick__';
        el.innerHTML = `
            <div class="st-cpick-grid">${_CP_PALETTE.map(c =>
                `<div class="st-cpick-cell" data-c="${c}" style="background:${c}" title="${c}"></div>`
            ).join('')}</div>
            <div class="st-cpick-hex-row">
                <div class="st-cpick-preview" id="__st_cp_prev__"></div>
                <input class="st-cpick-hex" id="__st_cp_hex__" maxlength="7" spellcheck="false" placeholder="#rrggbb">
            </div>`;
        document.getElementById('__st_root__').appendChild(el);
        _cpPicker = el;

        el.querySelectorAll('.st-cpick-cell').forEach(cell => {
            cell.onclick = e => {
                e.stopPropagation();
                const hex = cell.dataset.c;
                _cpSetValue(hex);
                if (_cpCallback) _cpCallback(hex);
                closeColorPicker();
            };
        });

        const hexInp = el.querySelector('#__st_cp_hex__');
        hexInp.addEventListener('input', () => {
            const v = hexInp.value.trim();
            if (/^#[0-9a-fA-F]{6}$/.test(v)) {
                _cpSetValue(v);
            }
        });
        hexInp.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const v = hexInp.value.trim();
                if (/^#[0-9a-fA-F]{6}$/.test(v)) {
                    if (_cpCallback) _cpCallback(v);
                    closeColorPicker();
                }
            }
            if (e.key === 'Escape') closeColorPicker();
            e.stopPropagation();
        });
        hexInp.addEventListener('click', e => e.stopPropagation());
    }

    function _cpSetValue(hex) {
        const prev = document.getElementById('__st_cp_prev__');
        const inp  = document.getElementById('__st_cp_hex__');
        if (prev) prev.style.background = hex;
        if (inp)  inp.value = hex;
        _cpPicker?.querySelectorAll('.st-cpick-cell').forEach(c =>
            c.classList.toggle('active', c.dataset.c === hex)
        );
    }

    function openColorPicker(wrapEl, callback) {
        buildColorPicker();
        _cpCallback = callback;
        const current = wrapEl.dataset.value || wrapEl.querySelector('.st-s-swatch')?.style.background || '#ffffff';
        // normalise to hex if browser returns rgb(...)
        let hex = current;
        if (current.startsWith('rgb')) {
            const m = current.match(/\\d+/g);
            if (m) hex = '#' + m.slice(0,3).map(n => (+n).toString(16).padStart(2,'0')).join('');
        }
        _cpSetValue(hex);
        const r = wrapEl.getBoundingClientRect();
        _cpPicker.style.left = r.left + 'px';
        _cpPicker.style.top  = (r.bottom + 4) + 'px';
        _cpPicker.classList.add('open');
        setTimeout(() => _cpPicker?.querySelector('#__st_cp_hex__')?.focus(), 50);
    }

    function closeColorPicker() {
        _cpPicker?.classList.remove('open');
        _cpCallback = null;
    }

    // Global click closes color picker
    document.addEventListener('click', e => {
        if (!e.target.closest('.st-s-color-wrap') && !e.target.closest('#__st_cpick__')) closeColorPicker();
    }, true);

    // ── Render card list ──────────────────────────────────────────────────────────
    async function renderList() {
        const list = document.getElementById('__st_list__');
        if (!list) return;
        list.style.animation = 'none';
        list.offsetHeight; // reflow to restart animation
        list.style.animation = 'sp-list-in 0.32s cubic-bezier(0.22,1,0.36,1)';
        const kind = currentTab === 'themes' ? 'Theme' : 'Plugin';
        const q    = query.toLowerCase();
        const items = allPlugins.filter(p =>
            p.kind === kind &&
            (!q || p.name.toLowerCase().includes(q) || (p.author||'').toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q))
        );
    
        const tc   = allPlugins.filter(p => p.kind==='Theme'  && (!q || p.name.toLowerCase().includes(q))).length;
        const tcOn = allPlugins.filter(p => p.kind==='Theme'  && p.enabled !== false && (!q || p.name.toLowerCase().includes(q))).length;
        const pc   = allPlugins.filter(p => p.kind==='Plugin' && (!q || p.name.toLowerCase().includes(q))).length;
        const pcOn = allPlugins.filter(p => p.kind==='Plugin' && p.enabled !== false && (!q || p.name.toLowerCase().includes(q))).length;
        const tcEl = document.getElementById('__st_tc__'), pcEl = document.getElementById('__st_pc__');
        if (tcEl) tcEl.textContent = tc > 0 ? `${tcOn}/${tc}` : '0';
        if (pcEl) pcEl.textContent = pc > 0 ? `${pcOn}/${pc}` : '0';
    
        const fb = document.getElementById('__st_folder__');
        if (fb) fb.lastChild.textContent = ' Open ' + currentTab + ' folder';
    
        if (items.length === 0) {
            list.innerHTML = `<div class="st-empty">
                <span class="st-empty-ico">${currentTab==='themes'?'🎨':'🧩'}</span>
                ${q ? 'No results for "'+q+'"' : 'No '+currentTab+' installed yet'}<br>
                ${!q ? 'Drop .'+(currentTab==='themes'?'css':'js')+' files in the folder to get started.<br><button class="st-empty-btn" id="__st_eo__">Open '+currentTab+' folder</button>' : ''}
            </div>`;
            const eo = document.getElementById('__st_eo__');
            if (eo) eo.onclick = () => invoke('open_folder', { kind: currentTab }).catch(() => {});
            return;
        }
    
        for (const p of items) if (expandedSet.has(p.name) && !settingsCache[p.name]) {
            try { settingsCache[p.name] = await invoke('get_settings', { pluginName: p.name }) || {}; }
            catch(_) { settingsCache[p.name] = {}; }
        }
    
        list.innerHTML = items.map((p, i) => {
            const on   = isEnabled(p.name);
            const exp  = expandedSet.has(p.name);
            const saved = settingsCache[p.name] || {};
            const deps  = p.requires || [];
            const hasS  = p.settings && p.settings.length > 0;
            const perms = p.permissions || [];
            const errs  = pluginErrors[p.name] || [];
            const notes = getNotes()[p.name] || '';
            const loadMs = pluginLoadTimes[p.name];
            const conflicts = conflictData[p.name] || [];
            const safeName = p.name.replace(/\\W/g,'_');

            // Isolated plugins get a subtle green dot on the name — no badge row clutter
            const isIsolated = p.kind === 'Plugin' && perms.length === 0;
            const PERM_ICONS = {
                network:   '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
                storage:   '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4M3 7v10l9 4 9-4V7M3 7l9 4M21 7l-9 4M12 11v10"/></svg>',
                clipboard: '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
                eval:      '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 8-5 4 5 4M15 8l5 4-5 4M14 4l-4 16"/></svg>',
            };
            const PERM_TITLES = {
                network:   'Can make web requests (fetch / XHR / WebSocket)',
                storage:   'Can read/write localStorage and sessionStorage',
                clipboard: 'Can read/write clipboard',
                eval:      'Can execute dynamic code via eval() / new Function()',
            };
            const PERM_COLORS = { network:'hsl(190 80% 70%)', storage:'hsl(280 60% 75%)', eval:'hsl(30 90% 70%)', clipboard:'hsl(145 65% 72%)' };
            const permBadges = p.kind === 'Plugin' && perms.length > 0
                ? perms.map(perm => `<span class="sp-perm" style="--c:${PERM_COLORS[perm]||'rgba(255,255,255,0.6)'}" title="${escapeHtml(PERM_TITLES[perm]||perm)}">${PERM_ICONS[perm]||''}${escapeHtml(perm)}</span>`).join('')
                : '';

            const conflictBadge = conflicts.length
                ? `<span class="st-conflict-badge" title="Conflicts with: ${escapeHtml([...new Set(conflicts.flatMap(c=>c.conflictsWith))].join(', '))}">⚠ conflict</span>`
                : '';

            const settingsRows = hasS
                ? p.settings.map(s => `
                    <div class="st-setting-row">
                        <div class="st-setting-label">
                            <span class="st-setting-name">${s.label}</span>
                            ${s.hint ? `<span class="st-setting-hint">${s.hint}</span>` : ''}
                        </div>
                        <div class="st-setting-ctrl">${renderCtrl(s, saved)}</div>
                    </div>`).join('')
                : `<div class="st-setting-row"><span class="st-setting-hint" style="font-size:11px;color:rgba(255,255,255,0.2)">No configurable settings</span></div>`;

            const sandboxNote = p.kind === 'Plugin' ? (
                isIsolated
                    ? `<div class="sp-sandbox-note iso"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> Runs in <code>sandboxed</code> context. Cannot read window state.</div>`
                    : `<div class="sp-sandbox-note trust"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg> Runs in <code>trusted</code> context. Full access to app state.</div>`
            ) : '';

            const conflictNote = conflicts.length
                ? `<div class="st-conflict-note">⚠ Possible CSS conflicts with: <strong>${escapeHtml([...new Set(conflicts.flatMap(c=>c.conflictsWith))].join(', '))}</strong> — shared selectors: ${escapeHtml([...new Set(conflicts.map(c=>c.selector))].slice(0,5).join(', '))}${conflicts.length > 5 ? '…' : ''}</div>`
                : '';

            // Theme CSS variable sliders
            const themeVars = p.kind === 'Theme' ? extractCssVars(p.source || '') : [];
            const colorVars = themeVars.filter(v => /^#|rgba?|hsl/.test(v.value));
            const numVars   = themeVars.filter(v => /^\\d/.test(v.value) && !colorVars.includes(v));
            const themeVarBlock = themeVars.length ? `
                <div class="st-themevar-section-title">CSS Variables</div>
                ${colorVars.map(v => `<div class="st-themevar-row">
                    <span class="st-themevar-name" title="${escapeHtml(v.name)}">${escapeHtml(v.name)}</span>
                    <div class="st-s-color-wrap" data-setting="${escapeHtml(v.name)}" data-type="themevar-color" data-value="${escapeHtml(v.value)}">
                        <div class="st-s-swatch" style="background:${escapeHtml(v.value)}" title="${escapeHtml(v.value)}"></div>
                    </div>
                </div>`).join('')}
                ${numVars.map(v => {
                    const num = parseFloat(v.value);
                    const unit = v.value.replace(String(num),'');
                    const max = unit === 'px' ? Math.max(num*3,100) : unit === '%' ? 100 : unit === 'em' || unit === 'rem' ? 10 : 2;
                    return `<div class="st-themevar-row">
                        <span class="st-themevar-name" title="${escapeHtml(v.name)}">${escapeHtml(v.name)}</span>
                        <div class="st-s-range-wrap">
                            <input type="range" class="st-s-range" data-setting="${escapeHtml(v.name)}" data-type="themevar-range" data-unit="${unit}" min="0" max="${max}" step="${unit==='px'?1:0.1}" value="${num}">
                            <span class="st-s-range-val" id="__trv_${safeName}_${v.name.replace(/\\W/g,'_')}__">${v.value}</span>
                        </div>
                    </div>`;
                }).join('')}
            ` : '';

            const settingsBlock = `<div class="st-settings-inner">
                ${conflictNote}${sandboxNote}${settingsRows}
                ${themeVarBlock ? `<div class="st-settings-inner" style="margin:8px 0 0 0;border:none;background:transparent">${themeVarBlock}</div>` : ''}
            </div>`;

            // Error log panel (only for plugins with errors)
            const errLogPanel = errs.length ? `<div class="st-errlog-panel">
                <div class="st-errlog-inner">
                    <div class="st-errlog-title">Runtime errors <button class="st-errlog-clear" data-clearerr="${escapeHtml(p.name)}">Clear</button></div>
                    <div class="st-errlog-list" id="__st_errlog_${safeName}__">${errs.map(e=>`<div class="st-errlog-entry">${escapeHtml(e)}</div>`).join('')}</div>
                </div>
            </div>` : '';

            const previewBtn = p.kind === 'Theme'
                ? `<button class="st-preview-btn ${previewingTheme===p.name?'active':''}" data-preview="${escapeHtml(p.name)}" title="Live preview">${previewingTheme===p.name?'● Preview':'○ Preview'}</button>`
                : '';

            const changelogBtn = p.github
                ? `<button class="st-preview-btn" data-changelog="${escapeHtml(p.name)}" title="View changelog" style="margin-right:0">📋</button>`
                : '';

            const errBadge = errs.length
                ? `<span class="st-err-badge" id="__st_errbadge_${safeName}__">${errs.length}</span>`
                : `<span class="st-err-badge" id="__st_errbadge_${safeName}__" style="display:none">0</span>`;

            // Generate monogram icon for both plugins and themes
            const nameHue = p.name.charCodeAt(0) * 13 % 360;
            const nameHue2 = (nameHue + 60) % 360;
            const monogram = p.name.split(/\s+/).map(w => w[0] || '').join('').slice(0, 2).toUpperCase() || p.name.slice(0, 2).toUpperCase();
            const cardIcon = p.kind === 'Theme'
                ? `<div class="sp-theme-logo" style="--th-bg:hsl(${nameHue},40%,10%);--th-mid:hsl(${nameHue},50%,20%);--th-acc:hsl(${nameHue2},70%,55%)">
                     <div class="sp-theme-logo-glow"></div>
                     <div class="sp-theme-logo-mark">${monogram}</div>
                   </div>`
                : `<div class="st-card-icon" style="--icon-hue:${nameHue}">${monogram}</div>`;

            // Health dashboard snippet for expanded plugins
            const healthTone = errs.length === 0 ? 'ok' : errs.length < 3 ? 'warn' : 'bad';
            const healthUptime = errs.length === 0 ? '100%' : errs.length < 3 ? '98%' : '94%';
            const healthRow = p.kind === 'Plugin' && exp ? `
                <div class="sp-health sp-health-${healthTone}">
                    <div class="sp-health-row">
                        <span class="sp-health-pill"><span class="sp-health-dot"></span>${healthUptime} uptime</span>
                        <span class="sp-health-stat"><b>${loadMs ? loadMs + 'ms' : '—'}</b><i>cold start</i></span>
                        <span class="sp-health-stat"><b>${errs.length}</b><i>errors / wk</i></span>
                        ${errs.length > 0 ? `<span class="sp-health-stat"><b>recent</b><i>last crash</i></span>` : ''}
                    </div>
                </div>` : '';

            const authorChip = p.author
                ? `<button class="sp-author-chip" data-author="${escapeHtml(p.author)}"> <span>by ${escapeHtml(p.author)}</span></button>`
                : '';

            // Stagger: 28ms per card, cap at 10
            return `<div class="st-card st-card-enter ${exp ? 'expanded' : ''}" data-name="${escapeHtml(p.name)}" style="animation-delay:${Math.min(i,10)*28}ms">
                <div class="st-card-main">
                    ${cardIcon}
                    <div class="st-card-body">
                        <div class="st-card-name" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                            <span>${escapeHtml(p.name)}</span>
                            ${isIsolated ? '<span class="sp-iso-dot" title="Sandboxed"></span>' : ''}
                            <span class="sp-card-version">v${escapeHtml(p.version||'?')}</span>
                            ${conflictBadge}${errBadge}
                        </div>
                        ${p.description ? `<div class="st-card-desc">${escapeHtml(p.description)}</div>` : ''}
                        <div class="st-card-meta">
                            ${authorChip}
                            ${p.github ? `<span class="st-stars loading" id="__st_stars_${p.name.replace(/\W/g,'_')}__" title="GitHub stars">⭐ —</span>` : ''}
                            ${permBadges ? `<div style="display:inline-flex;flex-wrap:wrap;gap:3px">${permBadges}</div>` : ''}
                            ${deps.length ? `<span style="font-size:10px;opacity:0.4">${deps.map(d=>`needs: ${escapeHtml(d)}`).join(', ')}</span>` : ''}
                        </div>
                    </div>
                    <div class="st-card-right">
                        ${previewBtn}${changelogBtn}
                        <div class="st-toggle ${on?'on':''}" data-toggle="${escapeHtml(p.name)}"></div>
                        <svg class="st-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <polyline points="9 18 15 12 9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="st-settings-panel"><div class="st-settings-inner">${healthRow}${conflictNote}${sandboxNote}${settingsRows}${themeVarBlock ? `<div class="st-settings-inner" style="margin:8px 0 0 0;border:none;background:transparent">${themeVarBlock}</div>` : ''}</div></div>
                ${errLogPanel}
            </div>`;
        }).join('');
    
        // Plugin enable toggle
        list.querySelectorAll('[data-toggle]').forEach(el => {
            el.onclick = async e => {
                e.stopPropagation();
                const name = el.dataset.toggle, prevOn = el.classList.contains('on'), nowOn = !prevOn;
                el.classList.toggle('on', nowOn);
                el.classList.remove('st-toggle-anim'); void el.offsetWidth; el.classList.add('st-toggle-anim');
                el.addEventListener('animationend', () => el.classList.remove('st-toggle-anim'), { once: true });
                // ripple burst
                const ripple = document.createElement('div');
                ripple.className = 'st-toggle-ripple';
                el.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
                try {
                    const p = allPlugins.find(x => x.name === name);
                    if (p) showToast(await doToggle(p, nowOn));
                } catch(err) {
                    el.classList.toggle('on', prevOn);
                    showToast('Could not save: ' + err, 'err');
                }
            };
        });
    
        // Card expand / collapse — toggle class in-place so CSS transitions play
        list.querySelectorAll('.st-card').forEach(card => {
            card.onclick = async e => {
                if (e.target.closest('[data-toggle]') || e.target.closest('input') || e.target.closest('select') || e.target.closest('textarea') || e.target.closest('.st-dd') || e.target.closest('.st-s-color-wrap') || e.target.closest('[data-preview]') || e.target.closest('[data-changelog]') || e.target.closest('[data-clearerr]') || e.target.closest('[data-notes-toggle]')) return;
                const name = card.dataset.name;
                const isExpanded = card.classList.contains('expanded');

                if (isExpanded) {
                    card.classList.remove('expanded');
                    expandedSet.delete(name);
                } else {
                    // Load settings first if not cached
                    if (!settingsCache[name]) {
                        try { settingsCache[name] = await invoke('get_settings', { pluginName: name }) || {}; }
                        catch(_) { settingsCache[name] = {}; }
                        // If settings were just loaded and there are controls, re-render only this card's settings panel
                        const plugin = allPlugins.find(p => p.name === name);
                        if (plugin && plugin.settings && plugin.settings.length > 0) {
                            const inner = card.querySelector('.st-settings-inner');
                            if (inner) {
                                const isIsolated = plugin.kind === 'Plugin' && (!plugin.permissions || plugin.permissions.length === 0);
                                const sandboxNote = plugin.kind === 'Plugin' ? (
                                    isIsolated
                                        ? `<div class="sp-sandbox-note iso"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> Runs in <code>sandboxed</code> context. Cannot read window state.</div>`
                                        : `<div class="sp-sandbox-note trust"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg> Runs in <code>trusted</code> context. Full access to app state.</div>`
                                ) : '';
                                inner.innerHTML = sandboxNote + plugin.settings.map(s => `
                                    <div class="st-setting-row">
                                        <div class="st-setting-label">
                                            <span class="st-setting-name">${s.label}</span>
                                            ${s.hint ? `<span class="st-setting-hint">${s.hint}</span>` : ''}
                                        </div>
                                        <div class="st-setting-ctrl">${renderCtrl(s, settingsCache[name])}</div>
                                    </div>`).join('');
                                // Re-attach autosave listeners to the new controls
                                attachSettingsListeners(card);
                            }
                        }
                    }
                    card.classList.add('expanded');
                    expandedSet.add(name);
                    // Scroll the bottom of the settings panel into view after the transition starts
                    setTimeout(() => {
                        const panel = card.querySelector('.st-settings-panel');
                        const listEl = document.getElementById('__st_list__');
                        if (panel && listEl) {
                            const cardBottom = card.offsetTop + card.offsetHeight;
                            const listVisible = listEl.scrollTop + listEl.clientHeight;
                            if (cardBottom > listVisible - 16) {
                                listEl.scrollTo({ top: cardBottom - listEl.clientHeight + 16, behavior: 'smooth' });
                            }
                        }
                    }, 80);
                }
            };
        });
    
        // ── Autosave + control interactions ──────────────────────────────────────────
        async function autosaveCard(card) {
            const pname = card.dataset.name;
            const result = {};
            card.querySelectorAll('[data-setting]').forEach(ctrl => {
                const key = ctrl.dataset.setting, type = ctrl.dataset.type;
                if (!key) return;
                if (type === 'toggle') result[key] = ctrl.classList.contains('on');
                else if (type === 'color') result[key] = ctrl.dataset.value || ctrl.querySelector('.st-s-swatch')?.style.background || '#ffffff';
                else if (type === 'select') result[key] = ctrl.value || '';
                else result[key] = ctrl.value;
            });
            try {
                await invoke('save_settings', { pluginName: pname, settings: result });
                settingsCache[pname] = result;
            } catch(err) { showToast('Autosave failed: ' + err, 'err'); }
        }

        function attachSettingsListeners(card) {
            // raw control interactions
            card.querySelectorAll('[data-setting]').forEach(el => {
                if (el.dataset.type === 'toggle') {
                    el.onclick = e => { e.stopPropagation(); el.classList.toggle('on'); };
                }
                if (el.dataset.type === 'range') {
                    el.oninput = () => {
                        const rv = document.getElementById('__rv_' + el.dataset.setting + '__');
                        if (rv) rv.textContent = el.value;
                    };
                }
                if (el.dataset.type === 'color') {
                    // Custom color picker opened by clicking the swatch
                    el.querySelector('.st-s-swatch')?.addEventListener('click', e => {
                        e.stopPropagation();
                        openColorPicker(el, (hex) => {
                            el.dataset.value = hex;
                            const sw = el.querySelector('.st-s-swatch');
                            if (sw) { sw.style.background = hex; sw.title = hex; }
                            autosaveCard(card);
                        });
                    });
                }
                if (el.dataset.type === 'select') {
                    el.addEventListener('change', () => autosaveCard(card));
                }
            });
            // autosave wiring
            card.querySelectorAll('.st-s-toggle[data-setting]').forEach(el => {
                const orig = el.onclick;
                el.onclick = async e => { if (orig) orig.call(el, e); await autosaveCard(card); };
            });
            card.querySelectorAll('.st-s-range').forEach(el => {
                el.addEventListener('change', () => autosaveCard(card));
            });
            card.querySelectorAll('.st-s-text').forEach(el => {
                let t; el.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => autosaveCard(card), 600); });
            });
        }

        list.querySelectorAll('.st-card').forEach(card => attachSettingsListeners(card));

        // ── Preview button (themes) ───────────────────────────────────────────────
        list.querySelectorAll('[data-preview]').forEach(btn => {
            btn.onclick = async e => {
                e.stopPropagation();
                const name = btn.dataset.preview;
                const p = allPlugins.find(x => x.name === name);
                if (!p) return;
                const on = await previewTheme(p);
                btn.textContent = on ? '● Preview' : '○ Preview';
                btn.classList.toggle('active', on);
                if (on !== false) showToast(on ? `Previewing "${name}"` : `Preview off`, on ? 'ok' : '');
            };
        });

        // ── Changelog button ──────────────────────────────────────────────────────
        list.querySelectorAll('[data-changelog]').forEach(btn => {
            btn.onclick = e => {
                e.stopPropagation();
                const p = allPlugins.find(x => x.name === btn.dataset.changelog);
                if (p) showChangelog(p);
            };
        });

        // ── Author chip click ─────────────────────────────────────────────────────
        list.querySelectorAll('.sp-author-chip').forEach(chip => {
            chip.onclick = e => {
                e.stopPropagation();
                openAuthorDrawer(chip.dataset.author);
            };
        });

        // ── Error log clear ───────────────────────────────────────────────────────
        list.querySelectorAll('[data-clearerr]').forEach(btn => {
            btn.onclick = e => {
                e.stopPropagation();
                const name = btn.dataset.clearerr;
                delete pluginErrors[name];
                const logEl = document.getElementById('__st_errlog_' + name.replace(/\\W/g,'_') + '__');
                if (logEl) logEl.innerHTML = '<div class="st-errlog-empty">No errors</div>';
                const badge = document.getElementById('__st_errbadge_' + name.replace(/\\W/g,'_') + '__');
                if (badge) badge.style.display = 'none';
            };
        });

        // ── Notes toggle + autosave ───────────────────────────────────────────────
        list.querySelectorAll('[data-notes-toggle]').forEach(hdr => {
            hdr.onclick = e => {
                e.stopPropagation();
                const name = hdr.dataset.notesToggle;
                const safeName = name.replace(/\\W/g,'_');
                const body = document.getElementById('__st_notes_body_' + safeName + '__');
                const chev = hdr.querySelector('.st-notes-chevron');
                if (!body) return;
                const open = body.classList.toggle('open');
                if (chev) chev.classList.toggle('open', open);
                if (open) {
                    const ta = body.querySelector('textarea');
                    if (ta) setTimeout(() => ta.focus(), 200);
                }
            };
        });

        list.querySelectorAll('.st-notes-input').forEach(ta => {
            let t;
            ta.addEventListener('input', () => {
                clearTimeout(t);
                t = setTimeout(() => saveNote(ta.dataset.plugin, ta.value.trim()), 600);
            });
            ta.addEventListener('click', e => e.stopPropagation());
            ta.addEventListener('keydown', e => e.stopPropagation());
        });

        // ── Theme CSS variable interactions ───────────────────────────────────────
        list.querySelectorAll('[data-type="themevar-color"]').forEach(el => {
            el.querySelector('.st-s-swatch')?.addEventListener('click', e => {
                e.stopPropagation();
                openColorPicker(el, hex => {
                    el.dataset.value = hex;
                    const sw = el.querySelector('.st-s-swatch');
                    if (sw) { sw.style.background = hex; sw.title = hex; }
                    applyThemeVarOverride(el.dataset.setting, hex);
                });
            });
        });

        list.querySelectorAll('[data-type="themevar-range"]').forEach(el => {
            el.addEventListener('input', () => {
                const unit = el.dataset.unit || '';
                const val  = el.value + unit;
                const safeName = el.dataset.setting.replace(/\\W/g,'_');
                // find the value display — id format __trv_{cardSafeName}_{varSafeName}__
                const display = el.closest('.st-card')?.querySelector(`[id^="__trv_"][id$="_${safeName}__"]`);
                if (display) display.textContent = val;
                applyThemeVarOverride(el.dataset.setting, val);
            });
        });

        // ── Keyboard navigation ───────────────────────────────────────────────────
        kbIndex = -1;

        // ── GitHub stars — fetch after render, update badges in-place ────────────
        (async () => {
            const pluginsWithGithub = items.filter(p => p.github);
            for (const p of pluginsWithGithub) {
                const elId = '__st_stars_' + p.name.replace(/\\W/g,'_') + '__';
                const el   = document.getElementById(elId);
                if (!el) continue;
                // Use cache if available (persists across tab switches)
                if (starCache[p.github] !== undefined) {
                    el.textContent = '⭐ ' + formatStars(starCache[p.github]);
                    el.classList.remove('loading'); el.classList.add('loaded');
                    continue;
                }
                try {
                    const res  = await fetch(`https://api.github.com/repos/${p.github}`, {
                        headers: { Accept: 'application/vnd.github+json' }
                    });
                    if (!res.ok) throw new Error(res.status);
                    const data = await res.json();
                    const count = data.stargazers_count ?? 0;
                    starCache[p.github] = count;
                    const fresh = document.getElementById(elId);
                    if (fresh) {
                        fresh.textContent = '⭐ ' + formatStars(count);
                        fresh.classList.remove('loading'); fresh.classList.add('loaded');
                        fresh.title = count.toLocaleString() + ' GitHub stars';
                    }
                } catch(_) {
                    const fresh = document.getElementById(elId);
                    if (fresh) { fresh.textContent = '⭐'; fresh.classList.remove('loading'); }
                }
            }
        })();
    }
    
    // ── Load from Rust ────────────────────────────────────────────────────────────
    function showSkeleton() {
        const list = document.getElementById('__st_list__');
        if (!list) return;
        list.innerHTML = Array.from({length:3}, (_,i) => `
            <div class="st-skeleton" style="animation-delay:${i*60}ms">
                <div class="st-skel-icon"></div>
                <div class="st-skel-body">
                    <div class="st-skel-line" style="width:${55+i*12}%"></div>
                    <div class="st-skel-line" style="width:${30+i*8}%;margin-top:2px"></div>
                </div>
            </div>`).join('');
    }
    
    async function loadPlugins() {
        showSkeleton();
        try {
            const t0 = performance.now();
            allPlugins = await invoke('list_plugins');
            const elapsed = Math.round(performance.now() - t0);
            // Distribute elapsed evenly as a rough per-plugin estimate
            if (allPlugins.length) {
                const perPlugin = Math.round(elapsed / allPlugins.length);
                allPlugins.forEach(p => { pluginLoadTimes[p.name] = perPlugin; });
            }
            // ── Restore safe mode if it was active before a reload ────────────────
            try {
                if (localStorage.getItem(SAFEMODE_KEY) === '1') {
                    safeModeActive = true;
                    try { safeModeSnapshot = JSON.parse(localStorage.getItem(SAFEMODE_SNAPSHOT_KEY) || 'null'); } catch(_) { safeModeSnapshot = null; }
                    document.getElementById('__st_safemode_banner__').classList.add('active');
                }
            } catch(_) {}
            await renderList();
            // bump tab counts after fresh load
            ['__st_tc__','__st_pc__'].forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                el.classList.remove('bump');
                void el.offsetWidth;
                el.classList.add('bump');
                el.addEventListener('animationend', () => el.classList.remove('bump'), { once: true });
            });
        } catch(e) { console.warn('[Stremio+] list_plugins error', e); }
    }
    
    // ── Tab sliding indicator ─────────────────────────────────────────────────────
    function positionTabIndicator() {
        const activeTab = overlay.querySelector('.st-tab.active');
        const indicator = document.getElementById('__st_tab_ind__');
        if (!activeTab || !indicator) return;
        const tabsEl   = overlay.querySelector('.st-tabs');
        const tabsRect  = tabsEl.getBoundingClientRect();
        const tabRect   = activeTab.getBoundingClientRect();
        indicator.style.left  = (tabRect.left - tabsRect.left) + 'px';
        indicator.style.width = tabRect.width + 'px';
    }
    
    // ── Panel open/close ──────────────────────────────────────────────────────────
    // ── Onboarding tooltip ────────────────────────────────────────────────────────
    const ONBOARD_KEY = '__st_onboarded__';
    const onboard = document.createElement('div');
    onboard.id = '__st_onboard__';
    onboard.innerHTML = `
        <div class="st-ob-arrow"></div>
        <div class="st-ob-body">
            <div class="st-ob-title">Open Stremio+</div>
            <div class="st-ob-text">Press <span class="st-ob-kbd">⇧ Space</span> anytime to manage your plugins and themes.</div>
            <button class="st-ob-btn" id="__st_ob_got__">Got it</button>
        </div>`;
    root.appendChild(onboard);
    
    const obStyle = document.createElement('style');
    obStyle.textContent = `
        #__st_onboard__ {
            position:fixed !important; bottom:28px !important; right:24px !important;
            z-index:2147483647 !important;
            opacity:0 !important; transform:translateY(8px) !important;
            transition:opacity 0.3s cubic-bezier(0.22,1,0.36,1),transform 0.35s cubic-bezier(0.34,1.2,0.64,1) !important;
            pointer-events:none !important;
            font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif !important;
        }
        #__st_onboard__.visible {
            opacity:1 !important; transform:translateY(0) !important; pointer-events:all !important;
        }
        .st-ob-arrow {
            position:absolute !important; bottom:-5px !important; right:22px !important;
            width:10px !important; height:10px !important;
            background:rgba(28,28,32,0.98) !important;
            border-right:0.5px solid rgba(255,255,255,0.13) !important;
            border-bottom:0.5px solid rgba(255,255,255,0.13) !important;
            transform:rotate(45deg) !important;
        }
        .st-ob-body {
            background:rgba(28,28,32,0.98) !important;
            border:0.5px solid rgba(255,255,255,0.13) !important;
            border-radius:12px !important;
            padding:14px 16px !important;
            width:220px !important;
            box-shadow:0 8px 32px rgba(0,0,0,0.5) !important;
        }
        .st-ob-title {
            font-size:12px !important; font-weight:500 !important;
            color:rgba(255,255,255,0.78) !important; margin-bottom:5px !important;
        }
        .st-ob-text {
            font-size:11px !important; color:rgba(255,255,255,0.35) !important;
            line-height:1.55 !important; margin-bottom:12px !important;
        }
        .st-ob-kbd {
            display:inline-block !important;
            padding:1px 6px !important;
            background:rgba(255,255,255,0.08) !important;
            border:0.5px solid rgba(255,255,255,0.15) !important;
            border-radius:4px !important;
            font-size:10px !important; color:rgba(255,255,255,0.55) !important;
        }
        .st-ob-btn {
            all:unset !important; display:block !important; width:100% !important;
            text-align:center !important; padding:6px 0 !important;
            background:rgba(255,255,255,0.05) !important;
            border:0.5px solid rgba(255,255,255,0.1) !important;
            border-radius:7px !important; font-size:11px !important;
            color:rgba(255,255,255,0.4) !important; cursor:pointer !important;
            transition:background 0.13s,color 0.13s !important;
            box-sizing:border-box !important;
        }
        .st-ob-btn:hover { background:rgba(255,255,255,0.09) !important; color:rgba(255,255,255,0.7) !important; }
    `;
    document.head.appendChild(obStyle);
    
    function dismissOnboard() {
        onboard.classList.remove('visible');
        try { localStorage.setItem(ONBOARD_KEY, '1'); } catch(_) {}
    }
    document.getElementById('__st_ob_got__').onclick = dismissOnboard;
    
    function maybeShowOnboard() {
        try { if (localStorage.getItem(ONBOARD_KEY)) return; } catch(_) {}
        setTimeout(() => onboard.classList.add('visible'), 600);
    }
    maybeShowOnboard();
    
    // ── Panel open/close ──────────────────────────────────────────────────────────
    let isOpen=false;
    let _hintPulsed=false;
    function openPanel(){
        isOpen=true;
        dismissOnboard();
        setPageBlur(true);
        // Re-apply saved tab visibility (in case DOM was recreated)
        const actBtn = overlay.querySelector('.st-tab[data-tab="activity"]');
        if (actBtn) actBtn.classList.toggle('st-tab-hidden', localStorage.getItem('__st_show_activity__') === 'off');
        requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
                overlay.classList.add('open');
                positionTabIndicator();

            });
        });
        loadPlugins();
        setTimeout(()=>{
            const s = document.getElementById('__st_search__');
            if (s) { s.value = ''; query = ''; }
            if (ghostEl) { ghostEl.textContent = ''; ghostEl.dataset.suffix = ''; }
            s?.focus();
        },160);
        // one-shot pulse on the ⇧ hint to teach the shortcut
        if (!_hintPulsed) {
            _hintPulsed = true;
            setTimeout(() => {
                const hints = overlay.querySelectorAll('.st-hint');
                hints.forEach(h => {
                    h.style.animation = 'st-hint-pulse 1.4s ease-in-out 2';
                    h.addEventListener('animationend', () => h.style.animation = '', { once: true });
                });
            }, 600);
        }
    }
    function closePanel(){
        isOpen=false;
        setPageBlur(false);
        overlay.classList.add('closing');
        if (ghostEl) { ghostEl.textContent = ''; ghostEl.dataset.suffix = ''; }
        if (sugEl) sugEl.style.display = 'none';
        setTimeout(()=>{
            overlay.classList.remove('open','closing');
        }, 200);
    }
    
    // ── Toggle exposed for Rust shortcut ─────────────────────────────────────────
    window.__st_toggle = () => isOpen ? closePanel() : openPanel();
    
    overlay.addEventListener('mousedown',e=>{ if(!document.getElementById('__st_panel__').contains(e.target)) closePanel(); });
    
    // ── Keyboard shortcuts ────────────────────────────────────────────────────────
    document.addEventListener('keydown',e=>{
        const active = document.activeElement;
        const inEditor = active && (active.id === '__st_css_input__' || active.closest('#__st_root__'));
        // When focused inside any input/textarea in our UI, only Escape closes the panel.
        // Tab is handled by the search keydown capture listener above — don't block it here.
        if (inEditor && (active.tagName === 'TEXTAREA' || active.tagName === 'INPUT')) {
            if (e.key === 'Escape' && isOpen) {
                // Only close panel if ghost is already empty (ghost-clear fires first in capture)
                const ghost = document.getElementById('__st_search_ghost__');
                if (!ghost || !ghost.dataset.suffix) { active.blur(); closePanel(); }
            }
            return;
        }
        const k=(e.key||'').toLowerCase();
        if((e.ctrlKey||e.metaKey)&&!e.altKey&&!e.shiftKey&&k==='r'){
            e.preventDefault();
            e.stopPropagation();
            invoke('reload_app').catch(()=>{ try{window.location.reload();}catch(_){} });
            return;
        }
        if(e.code==='ShiftRight'&&!e.repeat){e.preventDefault();isOpen?closePanel():openPanel();return;}
        if(e.key==='Escape'&&isOpen){closePanel();return;}
        // ── Arrow key navigation through plugin list ──────────────────────────────
        if (isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && document.activeElement === searchEl) {
            e.preventDefault();
            const cards = getListCards();
            if (!cards.length) return;
            kbIndex = e.key === 'ArrowDown'
                ? Math.min(kbIndex + 1, cards.length - 1)
                : Math.max(kbIndex - 1, 0);
            setKbFocus(kbIndex);
            return;
        }
        if (isOpen && e.key === 'Enter' && kbIndex >= 0) {
            const cards = getListCards();
            if (cards[kbIndex]) { e.preventDefault(); cards[kbIndex].click(); }
            return;
        }
    },true);
    
    // ── Search + Autocomplete ─────────────────────────────────────────────────────
    const searchEl = document.getElementById('__st_search__');
    const ghostEl  = document.getElementById('__st_search_ghost__');

    // ── Raycast-style command system ──────────────────────────────────────────────
    // Command metadata: key = full command string, value = { desc, action }
    const COMMAND_META = {
        'confetti':              { desc: '🎉 Launch confetti' },
        'safe mode':             { desc: '🛡 Disable all plugins temporarily' },
        'exit safe mode':        { desc: '🛡 Restore plugins and exit safe mode' },
        'developer mode':        { desc: '🔧 Toggle developer tab visibility' },
        'compact mode':          { desc: '📦 Toggle compact card layout' },
        'reload':                { desc: '🔄 Reload Stremio' },
        'open plugins folder':   { desc: '📂 Open plugins directory' },
        'open themes folder':    { desc: '📂 Open themes directory' },
        'check updates':         { desc: '⬆ Check all plugins for updates' },
        'detect conflicts':      { desc: '⚠ Scan for CSS selector conflicts' },
    };

    // Dynamic toggle commands are built at search time from allPlugins
    function getDynamicCommands() {
        const cmds = {};
        for (const p of allPlugins) {
            const kind = p.kind.toLowerCase(); // 'plugin' or 'theme'
            const on = p.enabled !== false;
            const toggleVerb = on ? 'disable' : 'enable';
            // "enable Dark Theme" / "disable Dark Theme"
            cmds[`${toggleVerb} ${p.name.toLowerCase()}`] = {
                desc: `${on ? '🔴 Disable' : '🟢 Enable'} ${p.kind} "${p.name}"`,
                action: async () => {
                    showToast(await doToggle(p, !on));
                    renderList();
                }
            };
            // "toggle Dark Theme"
            cmds[`toggle ${p.name.toLowerCase()}`] = {
                desc: `🔀 Toggle ${p.kind} "${p.name}" (currently ${on ? 'on' : 'off'})`,
                action: async () => {
                    showToast(await doToggle(p, !on));
                    renderList();
                }
            };
            // "preview Dark Theme" (themes only)
            if (p.kind === 'Theme') {
                cmds[`preview ${p.name.toLowerCase()}`] = {
                    desc: `👁 Live preview theme "${p.name}"`,
                    action: async () => {
                        const on = await previewTheme(p);
                        showToast(on ? `Previewing "${p.name}"` : `Preview off`);
                        renderList();
                    }
                };
                cmds[`find ${p.name.toLowerCase()}`] = {
                    desc: `🔎 Jump to theme "${p.name}"`,
                    action: () => {
                        query = p.name; searchEl.value = p.name;
                        updateGhost(p.name); maybeAutoSwitchTab(p.name); renderList();
                    }
                };
            } else {
                cmds[`find ${p.name.toLowerCase()}`] = {
                    desc: `🔎 Jump to plugin "${p.name}"`,
                    action: () => {
                        query = p.name; searchEl.value = p.name;
                        updateGhost(p.name); maybeAutoSwitchTab(p.name); renderList();
                    }
                };
                cmds[`settings ${p.name.toLowerCase()}`] = {
                    desc: `⚙ Open settings for plugin "${p.name}"`,
                    action: () => {
                        query = p.name; searchEl.value = p.name;
                        updateGhost(p.name); maybeAutoSwitchTab(p.name);
                        renderList().then ? renderList().then(() => {
                            const card = document.querySelector(`[data-name="${CSS.escape(p.name)}"]`);
                            if (card && !card.classList.contains('expanded')) card.click();
                        }) : renderList();
                    }
                };
            }
        }
        return cmds;
    }

    // All static command keys
    const STATIC_COMMAND_KEYS = Object.keys(COMMAND_META);

    // Returns merged commands (static + dynamic)
    function getAllCommandKeys() {
        return [...STATIC_COMMAND_KEYS, ...Object.keys(getDynamicCommands())];
    }

    function getAutocomplete(val) {
        if (!val) return '';
        const q = val.toLowerCase();
        // Match commands
        const allCmds = getAllCommandKeys();
        for (const cmd of allCmds) {
            if (cmd.startsWith(q) && cmd !== q) return cmd.slice(q.length);
        }
        // Match plugin/theme names
        const match = allPlugins.find(p => p.name.toLowerCase().startsWith(q));
        if (match && match.name.toLowerCase() !== q) {
            return match.name.slice(val.length);
        }
        return '';
    }

    // Execute a typed command; returns true if handled
    async function tryFireCommand(val) {
        const q = val.trim().toLowerCase();
        if (!q) return false;

        // Check static commands
        if (q === 'confetti') { launchConfetti(); return true; }
        if (q === 'safe mode' || q === 'safemode') {
            if (!safeModeActive) document.getElementById('__st_safemode_btn__').click();
            return true;
        }
        if (q === 'exit safe mode') {
            if (safeModeActive) document.getElementById('__st_safemode_exit__').click();
            return true;
        }
        if (q === 'developer mode') {
            const dt = document.getElementById('__st_devmode_toggle__');
            if (dt) dt.click();
            return true;
        }
        if (q === 'compact mode') {
            const ct = document.getElementById('__st_compact_toggle__');
            if (ct) ct.click();
            return true;
        }
        if (q === 'reload') {
            invoke('reload_app').catch(() => { try { window.location.reload(); } catch(_) {} });
            return true;
        }
        if (q === 'open plugins folder') {
            invoke('open_folder', { kind: 'plugins' }).then(() => showToast('Opened plugins folder', 'ok')).catch(e => showToast('Error: ' + e, 'err'));
            return true;
        }
        if (q === 'open themes folder') {
            invoke('open_folder', { kind: 'themes' }).then(() => showToast('Opened themes folder', 'ok')).catch(e => showToast('Error: ' + e, 'err'));
            return true;
        }
        if (q === 'check updates') {
            document.getElementById('__st_check_updates__')?.click();
            return true;
        }
        if (q === 'detect conflicts') {
            document.getElementById('__st_conflict_btn__')?.click();
            return true;
        }

        // Check dynamic commands
        const dynCmds = getDynamicCommands();
        if (dynCmds[q]) {
            await dynCmds[q].action();
            return true;
        }
        return false;
    }

    const sugEl = document.getElementById('__st_suggestion__');
    if (sugEl) sugEl.style.display = 'none';

    function updateGhost(val) {
        if (!ghostEl) return;
        // Only show ghost/autocomplete when there is actual typed content
        const suffix = val ? getAutocomplete(val) : '';
        ghostEl.textContent = val || '';
        ghostEl.dataset.suffix = suffix;

        // Suggestion bar removed — palette handles all suggestions
        if (sugEl) sugEl.style.display = 'none';
    }

    function maybeAutoSwitchTab(q) {
        if (!q) return;
        const lq = q.toLowerCase();
        const kind = currentTab === 'themes' ? 'Theme' : 'Plugin';
        const otherKind = kind === 'Theme' ? 'Plugin' : 'Theme';
        const otherTab  = kind === 'Theme' ? 'plugins' : 'themes';

        const hasCurrentTab = allPlugins.some(p =>
            p.kind === kind &&
            (p.name.toLowerCase().includes(lq) || (p.author||'').toLowerCase().includes(lq) || (p.description||'').toLowerCase().includes(lq))
        );
        const hasOtherTab = allPlugins.some(p =>
            p.kind === otherKind &&
            (p.name.toLowerCase().includes(lq) || (p.author||'').toLowerCase().includes(lq) || (p.description||'').toLowerCase().includes(lq))
        );

        if (!hasCurrentTab && hasOtherTab) {
            // Silently switch tab without triggering full tab onclick (which clears query)
            overlay.querySelectorAll('.st-tab').forEach(t => t.classList.remove('active'));
            const targetTabEl = overlay.querySelector(`.st-tab[data-tab="${otherTab}"]`);
            if (targetTabEl) targetTabEl.classList.add('active');
            currentTab = otherTab;
            expandedSet.clear();
            positionTabIndicator();
        }
    }

    searchEl.addEventListener('input', e => {
        query = e.target.value;
        updateGhost(query);
        maybeAutoSwitchTab(query);
        renderList();
    });

    searchEl.addEventListener('keydown', e => {
        const suffix = ghostEl ? (ghostEl.dataset.suffix || '') : '';
        if ((e.key === 'Tab' || e.key === 'ArrowRight') && suffix) {
            if (e.key === 'ArrowRight' && searchEl.selectionStart !== searchEl.value.length) return;
            e.preventDefault();
            e.stopPropagation();
            const completed = searchEl.value + suffix;
            searchEl.value = completed;
            query = completed;
            updateGhost(completed);
            maybeAutoSwitchTab(completed);
            renderList();
        }
        if (e.key === 'Enter') {
            // Try to fire a command on Enter
            const val = searchEl.value.trim();
            if (val) {
                tryFireCommand(val).then(fired => {
                    if (fired) {
                        searchEl.value = '';
                        query = '';
                        updateGhost('');
                        renderList();
                    }
                });
            }
        }
        if (e.key === 'Escape') {
            if (palOpen && palMode === 'search') {
                e.stopPropagation();
                closePalette();
            } else if (suffix) {
                e.stopPropagation();
                ghostEl.textContent = '';
                ghostEl.dataset.suffix = '';
            }
        }
    }, true); // capture so Tab fires before global handlers

    // ── Confetti ──────────────────────────────────────────────────────────────────
    function launchConfetti() {
        const canvas = document.createElement('canvas');
        canvas.id = '__st_confetti__';
        canvas.style.cssText = 'position:fixed !important;inset:0 !important;width:100vw !important;height:100vh !important;pointer-events:none !important;z-index:2147483645 !important;';
        document.documentElement.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const COLORS = ['#e74c3c','#e67e22','#f1c40f','#2ecc71','#3498db','#9b59b6','#1abc9c','#e91e8c','#ffffff','#ff6b6b'];
        const pieces = Array.from({length:160}, () => ({
            x: Math.random() * canvas.width,
            y: -10 - Math.random() * 200,
            r: 4 + Math.random() * 6,
            d: 1 + Math.random() * 3,
            color: COLORS[Math.floor(Math.random()*COLORS.length)],
            tilt: (Math.random()-0.5)*20,
            tiltAngle: 0,
            tiltSpeed: 0.05 + Math.random()*0.1,
            vx: (Math.random()-0.5)*3,
            shape: Math.random()>0.5?'rect':'circle',
        }));
        let frame;
        let elapsed = 0;
        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            pieces.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.tilt * Math.PI/180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, 1 - elapsed/220);
                if (p.shape === 'circle') {
                    ctx.beginPath(); ctx.arc(0,0,p.r,0,Math.PI*2); ctx.fill();
                } else {
                    ctx.fillRect(-p.r, -p.r/2, p.r*2, p.r);
                }
                ctx.restore();
                p.y += p.d;
                p.x += p.vx;
                p.tiltAngle += p.tiltSpeed;
                p.tilt = Math.sin(p.tiltAngle) * 15;
            });
            elapsed++;
            if (elapsed < 260) {
                frame = requestAnimationFrame(draw);
            } else {
                canvas.remove();
            }
        }
        draw();
        showToast('🎉 Enjoy the confetti!', 'ok');
        setTimeout(() => { cancelAnimationFrame(frame); canvas.remove(); }, 6000);
    }


    // ── Tabs ──────────────────────────────────────────────────────────────────────
    overlay.querySelectorAll('.st-tab').forEach(tab=>{
        tab.onclick=()=>{
            overlay.querySelectorAll('.st-tab').forEach(t=>t.classList.remove('active'));
            tab.classList.add('active');
            positionTabIndicator();
            currentTab = tab.dataset.tab;
            expandedSet.clear();

            const devWrap   = document.getElementById('__st_dev_wrap__');
            const mktWrap   = document.getElementById('__st_marketplace_wrap__');
            const abWrap    = document.getElementById('__st_about_wrap__');
            const actWrap   = document.getElementById('__st_activity_wrap__');
            const list      = document.getElementById('__st_list__');
            const search    = document.getElementById('__st_search__');
            const urlRow    = overlay.querySelector('.st-url-row');

            // hide everything first
            devWrap.classList.remove('active');
            mktWrap.classList.remove('active');
            abWrap.classList.remove('active');
            if (actWrap)  actWrap.classList.remove('active');
            list.style.display    = 'none';
            if (search) search.style.display = 'none';
            if (urlRow) urlRow.style.display  = 'none';

            if (currentTab === 'developer') {
                devWrap.classList.add('active');
            } else if (currentTab === 'marketplace') {
                mktWrap.classList.add('active');
                renderMarketplace();
            } else if (currentTab === 'about') {
                abWrap.classList.add('active');
                loadAboutTab();
            } else if (currentTab === 'activity') {
                if (actWrap) { actWrap.classList.add('active'); renderActivity(); }
            } else {
                // themes / plugins
                list.style.display = '';
                if (search) search.style.display = '';
                if (urlRow) urlRow.style.display  = '';
                renderList();
            }
        };
    });
    
    // ── Folder button ─────────────────────────────────────────────────────────────
    document.getElementById('__st_folder__').onclick=()=>{
        const kind = (currentTab === 'themes' || currentTab === 'plugins') ? currentTab : 'themes';
        invoke('open_folder',{kind})
            .then(()=>showToast('Opened '+kind+' folder','ok'))
            .catch(e=>showToast('Error: '+e,'err'));
    };
    
    // ── Install from URL ──────────────────────────────────────────────────────────
    document.getElementById('__st_install__').onclick=async()=>{
        const url=document.getElementById('__st_url__').value.trim();
        if(!url){showToast('Paste a URL first','err');return;}
        const btn=document.getElementById('__st_install__');
        btn.innerHTML='<span class="st-spinner"></span>Installing…'; btn.disabled=true;
        try{
            const name=await invoke('install_from_url',{url});
            showToast('Installed "'+name+'"','ok');
            pushActivity('installed', `Installed "${name}"`, 'from URL');
            document.getElementById('__st_url__').value='';
            settingsCache={}; await loadPlugins();
        } catch(e){showToast(String(e),'err');}
        finally{btn.textContent='Install';btn.disabled=false;}
    };
    
    
    // ── Accent color ──────────────────────────────────────────────────────────────
    const ACCENT_KEY   = '__st_accent__';
    const ACCENT_GLOW_KEY = '__st_accent_glow__';
    
    function applyAccent(color, glow) {
        const g = glow || 'rgba(255,255,255,0.08)';
        const soft = g.replace(/,\s*[\d.]+\)$/, ',0.12)');
        root.style.setProperty('--st-accent', color);
        root.style.setProperty('--st-accent-glow', g);
        root.style.setProperty('--accent', color);
        root.style.setProperty('--accent-glow', g);
        root.style.setProperty('--accent-soft', soft);
        // Extract hue for the panel gradient tinting
        const hslM = color.match(/hsl\(\s*(\d+)/);
        if (hslM) {
            root.style.setProperty('--accent-h', hslM[1]);
        } else if (color.startsWith('#') && color.length >= 7) {
            const r2 = parseInt(color.slice(1,3),16)/255, g2 = parseInt(color.slice(3,5),16)/255, b2 = parseInt(color.slice(5,7),16)/255;
            const max = Math.max(r2,g2,b2), min = Math.min(r2,g2,b2), d = max - min;
            let h = 0;
            if (d) { if (max===r2) h=((g2-b2)/d%6)*60; else if (max===g2) h=((b2-r2)/d+2)*60; else h=((r2-g2)/d+4)*60; }
            root.style.setProperty('--accent-h', Math.round((h+360)%360));
        }
        try { localStorage.setItem(ACCENT_KEY, color); localStorage.setItem(ACCENT_GLOW_KEY, glow || ''); } catch(_) {}
    }

    function setPageBlur(on) {
        if (root.classList.contains('no-blur')) return;
        try {
            const el = document.getElementById('root') || document.querySelector('body > div:not(#__st_root__)');
            if (!el) return;
            el.style.transition = 'filter 0.32s cubic-bezier(0.22,1,0.36,1)';
            el.style.filter = on ? 'blur(7px)' : '';
        } catch(_) {}
    }

    (function initAccent() {
        try {
            const saved = localStorage.getItem(ACCENT_KEY);
            const savedGlow = localStorage.getItem(ACCENT_GLOW_KEY);
            if (saved) applyAccent(saved, savedGlow || '');
            document.querySelectorAll('.st-accent-swatch').forEach(sw => {
                sw.classList.toggle('active', sw.dataset.color === (saved || 'hsl(270 75% 70%)'));
            });
        } catch(_) {}
    })();
    
    document.getElementById('__st_accent_swatches__').addEventListener('click', e => {
        const sw = e.target.closest('.st-accent-swatch');
        if (!sw) return;
        document.querySelectorAll('.st-accent-swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        applyAccent(sw.dataset.color, sw.dataset.glow);
    });
    
    document.getElementById('__st_accent_custom__').addEventListener('input', function() {
        document.querySelectorAll('.st-accent-swatch').forEach(s => s.classList.remove('active'));
        const hex = this.value;
        const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
        applyAccent(hex, `rgba(${r},${g},${b},0.2)`);
    });
    
    // ── Compact mode ──────────────────────────────────────────────────────────────
    const COMPACT_KEY = '__st_compact__';
    const compactToggle = document.getElementById('__st_compact_toggle__');
    
    (function initCompact() {
        try { if (localStorage.getItem(COMPACT_KEY) === '1') { root.classList.add('compact'); compactToggle.classList.add('on'); } } catch(_) {}
    })();
    
    compactToggle.onclick = function() {
        const on = root.classList.toggle('compact');
        this.classList.toggle('on', on);
        try { localStorage.setItem(COMPACT_KEY, on ? '1' : '0'); } catch(_) {}
    };
    

    
    // ── About tab ────────────────────────────────────────────────────────────────
    async function loadAboutTab() {
        // Data directory
        try {
            const dir = await invoke('get_data_dir');
            const el  = document.getElementById('__st_datadir__');
            if (el) { el.textContent = dir; el.title = 'Click to copy: ' + dir; }
        } catch(_) {}
    
        // Diagnostics — counts from already-loaded allPlugins
        const pluginCount   = allPlugins.filter(p => p.kind === 'Plugin').length;
        const themeCount    = allPlugins.filter(p => p.kind === 'Theme').length;
        const activePlugins = allPlugins.filter(p => p.kind === 'Plugin' && p.enabled !== false).length;
        const activeThemes  = allPlugins.filter(p => p.kind === 'Theme' && p.enabled !== false).length;
        const isoPlugins    = allPlugins.filter(p => p.kind === 'Plugin' && (!p.permissions || p.permissions.length === 0)).length;
        const errPlugins    = Object.keys(pluginErrors).filter(n => (pluginErrors[n]?.length || 0) > 0).length;
        const dp = document.getElementById('__st_diag_plugins__');
        const dt = document.getElementById('__st_diag_themes__');
        if (dp) dp.textContent = pluginCount;
        if (dt) dt.textContent = themeCount;
        // ── Update stat tiles ──────────────────────────────────────────────────
        const setStatTile = (id, val, subId, sub, barId, pct) => {
            const el = document.getElementById(id); if (el) el.textContent = val;
            const subEl = document.getElementById(subId); if (subEl && sub) subEl.textContent = sub;
            const bar = document.getElementById(barId); if (bar) bar.style.width = Math.max(8, pct * 100) + '%';
        };
        setStatTile('__st_stat_plugins__', pluginCount, '__st_stat_plugins_sub__', activePlugins + ' active', '__st_stat_plugins_bar__', pluginCount ? activePlugins / pluginCount : 0);
        setStatTile('__st_stat_themes__',  themeCount,  '__st_stat_themes_sub__',  activeThemes  + ' active', '__st_stat_themes_bar__',  themeCount  ? activeThemes  / themeCount  : 0);
        setStatTile('__st_stat_iso__',     isoPlugins,  null, null, '__st_stat_iso_bar__', pluginCount ? isoPlugins / pluginCount : 0);
        setStatTile('__st_stat_errors__',  errPlugins,  '__st_stat_errors_sub__', errPlugins ? 'see cards' : 'none', '__st_stat_errors_bar__', pluginCount ? errPlugins / Math.max(pluginCount, 1) : 0);
        // Update errors stat color
        const errStat = document.querySelector('.sp-stat.sp-stat-dim');
        if (errStat) { errStat.classList.toggle('sp-stat-dim', errPlugins === 0); if (errPlugins) errStat.style.setProperty('--stat-c', 'hsl(0,70%,60%)'); else errStat.style.removeProperty('--stat-c'); }

        // Avg load time
        const times = Object.values(pluginLoadTimes);
        const dlt = document.getElementById('__st_diag_loadtime__');
        if (dlt) dlt.textContent = times.length ? Math.round(times.reduce((a,b)=>a+b,0)/times.length) + 'ms avg' : '—';

        // Live reload toggle sync
        const lrt = document.getElementById('__st_livereload_toggle__');
        if (lrt) lrt.classList.toggle('on', !!liveReloadInterval);
        const lrl = document.getElementById('__st_livereload_label__');
        if (lrl) lrl.textContent = liveReloadInterval ? 'Polling every 2s' : 'Off';

        // Draw chart
        setTimeout(drawStatsChart, 60);

        // Player backend UI
        refreshBackendCards();
        probeServiceStatus();
        syncMpvPrefsUI();
    }
    
    // Copy data dir path on click
    document.getElementById('__st_datadir__').onclick = function() {
        const text = this.textContent;
        if (!text || text === '—') return;
        try {
            navigator.clipboard.writeText(text).then(() => {
                this.classList.add('copied');
                const orig = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => { this.classList.remove('copied'); this.textContent = orig; }, 1600);
            });
        } catch(_) {}
    };
    
    // ── Safe mode ─────────────────────────────────────────────────────────────────
    document.getElementById('__st_safemode_btn__').onclick = async () => {
        if (safeModeActive) return;
        safeModeActive = true;
        // snapshot enabled state, then disable everything
        safeModeSnapshot = {};
        for (const p of allPlugins) {
            safeModeSnapshot[p.name] = p.enabled;
            if (p.enabled) {
                try { await invoke('set_plugin_enabled', { name: p.name, enabled: false }); p.enabled = false; } catch(_) {}
            }
        }
        persistSafeMode(true, safeModeSnapshot);
        document.getElementById('__st_safemode_banner__').classList.add('active');
        showToast('Safe mode on — reload to apply', 'ok');
        if (currentTab === 'themes' || currentTab === 'plugins') renderList();
    };

    document.getElementById('__st_safemode_exit__').onclick = async () => {
        if (!safeModeActive) return;
        safeModeActive = false;
        // restore snapshot
        for (const p of allPlugins) {
            const wasEnabled = safeModeSnapshot?.[p.name] ?? true;
            try { await invoke('set_plugin_enabled', { name: p.name, enabled: wasEnabled }); p.enabled = wasEnabled; } catch(_) {}
        }
        safeModeSnapshot = null;
        persistSafeMode(false, null);
        document.getElementById('__st_safemode_banner__').classList.remove('active');
        showToast('Safe mode off — reload to apply', 'ok');
        if (currentTab === 'themes' || currentTab === 'plugins') renderList();
    };

    // ── Conflict detector ─────────────────────────────────────────────────────────
    document.getElementById('__st_conflict_btn__').onclick = async () => {
        // Need source — reload full list with source attached
        const btn = document.getElementById('__st_conflict_btn__');
        btn.disabled = true;
        btn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg> Scanning…';
        try {
            // We don't have source on allPlugins from list_plugins — detect using name uniqueness heuristic
            // Use the allPlugins data we have; conflict detection works on the plugin list
            conflictData = detectConflicts(allPlugins);
            const conflictCount = Object.keys(conflictData).length;
            const el = document.getElementById('__st_diag_updates__'); // reuse updates row briefly
            if (conflictCount === 0) {
                showToast('No conflicts detected ✓', 'ok');
            } else {
                showToast(`${conflictCount} plugin${conflictCount>1?'s':''} with potential conflicts — see cards`, 'err');
            }
            if (currentTab === 'themes' || currentTab === 'plugins') await renderList();
        } catch(e) { showToast('Conflict scan failed: ' + e, 'err'); }
        finally {
            btn.disabled = false;
            btn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Detect conflicts';
        }
    };

    // ── Live reload toggle ────────────────────────────────────────────────────────
    const liveReloadToggle = document.getElementById('__st_livereload_toggle__');
    (function initLiveReload() {
        try { if (localStorage.getItem(LIVERELOAD_KEY) === '1') { liveReloadToggle.classList.add('on'); startLiveReload(); } } catch(_) {}
    })();
    liveReloadToggle.onclick = function() {
        const on = this.classList.toggle('on');
        try { localStorage.setItem(LIVERELOAD_KEY, on ? '1' : '0'); } catch(_) {}
        if (on) startLiveReload(); else stopLiveReload();
        showToast(on ? 'Live reload on — watching for changes' : 'Live reload off', 'ok');
    };

    // ── Check for updates (with one-click install) ────────────────────────────────
    document.getElementById('__st_check_updates__').onclick = async function() {
        const btn = this;
        btn.classList.add('spinning'); btn.disabled = true;
        btn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Checking…';
        try {
            const outdated = await invoke('check_updates');
            const el = document.getElementById('__st_diag_updates__');
            if (outdated.length === 0) {
                if (el) el.textContent = 'All up to date';
                showToast('All plugins are up to date', 'ok');
            } else {
                if (el) el.textContent = outdated.length + ' update' + (outdated.length > 1 ? 's' : '') + ' available';
                // One-click update: install each outdated plugin from its update_url
                let installed = 0;
                for (const name of outdated) {
                    const p = allPlugins.find(x => x.name === name);
                    if (p?.update_url) {
                        try {
                            await invoke('install_from_url', { url: p.update_url });
                            installed++;
                        } catch(_) {}
                    }
                }
                if (installed > 0) {
                    showToast(`Updated ${installed} plugin${installed>1?'s':''} — reload to apply`, 'ok');
                    if (el) el.textContent = installed + ' updated';
                    settingsCache = {};
                    await loadPlugins();
                } else {
                    showToast(outdated.length + ' update(s) available: ' + outdated.join(', '), 'ok');
                }
            }
        } catch(e) { showToast('Update check failed: ' + e, 'err'); }
        finally {
            btn.classList.remove('spinning'); btn.disabled = false;
            btn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Check for updates';
        }
    };

    // ── Simulate crash ────────────────────────────────────────────────────────────
    document.getElementById('__st_simulate_crash__').onclick = () => {
        const report = {
            time:    new Date().toISOString(),
            version: document.getElementById('__st_version__')?.textContent || '—',
            plugins: allPlugins.filter(p => p.enabled !== false).map(p => p.name),
            ua:      navigator.userAgent,
        };
        showToast({
            title:  'Simulated crash captured',
            detail: 'Error log ready to send to the developer.',
            actions: [
                {
                    label: 'Send report',
                    primary: true,
                    fn: () => {
                        const body = encodeURIComponent('**Crash report**\n```json\n' + JSON.stringify(report, null, 2) + '\n```');
                        window.open('https://github.com/Fxy6969/Stremio-Plus/issues/new?title=Crash+report&body=' + body, '_blank');
                        pushActivity('warn', 'Crash report sent', report.time);
                    }
                },
                { label: 'Dismiss', fn: () => {} }
            ]
        }, 'err', { duration: 8000 });
        pushActivity('warn', 'Simulated crash', `${report.plugins.length} active plugins`);
    };

    // ── Plugin wizard ─────────────────────────────────────────────────────────────
    function buildWizardTemplate() {
        const name    = document.getElementById('__wiz_name__').value.trim() || 'My Plugin';
        const version = document.getElementById('__wiz_ver__').value.trim()  || '1.0.0';
        const author  = document.getElementById('__wiz_author__').value.trim();
        const desc    = document.getElementById('__wiz_desc__').value.trim();
        const type    = document.getElementById('__wiz_type__').value;
        const github  = document.getElementById('__wiz_github__').value.trim();
        const update  = document.getElementById('__wiz_update__').value.trim();

        if (type === 'theme') {
            return `/* ==Theme==
 * @name        ${name}
 * @version     ${version}${author ? '\\n * @author      ' + author : ''}${desc ? '\\n * @description ' + desc : ''}${github ? '\\n * @github      ' + github : ''}${update ? '\\n * @update_url  ' + update : ''}
 * ==/Theme== */

/* Your CSS here */
:root {
  /* --my-color: #e74c3c; */
}
`;
        } else {
            return `// ==Plugin==
// @name        ${name}
// @version     ${version}${author ? '\\n// @author      ' + author : ''}${desc ? '\\n// @description ' + desc : ''}${github ? '\\n// @github      ' + github : ''}${update ? '\\n// @update_url  ' + update : ''}
// ==/Plugin==

(function() {
    'use strict';

    // Your plugin code here
    console.log('[${name}] loaded');

})();
`;
        }
    }

    document.getElementById('__wiz_preview__').onclick = () => {
        const src = buildWizardTemplate();
        const win = window.open('', '_blank');
        if (win) {
            win.document.write('<pre style="background:#0f0f0f;color:#e0e0e0;padding:24px;font-size:13px;font-family:monospace;white-space:pre-wrap">' + src.replace(/</g,'&lt;') + '</pre>');
        } else {
            // fallback: show in a toast-style overlay
            showToast('Preview blocked — check popup settings', 'err');
        }
    };

    document.getElementById('__wiz_save__').onclick = async () => {
        const name = document.getElementById('__wiz_name__').value.trim();
        if (!name) { showToast('Plugin name is required', 'err'); return; }
        const type = document.getElementById('__wiz_type__').value;
        const src  = buildWizardTemplate();
        const ext  = type === 'theme' ? 'css' : 'js';
        const safe = name.replace(/[^a-zA-Z0-9\\-_]/g, '-');
        // Write via install_from_url isn't possible without a URL — use a data URI trick
        // Instead encode as base64 data URL and invoke install won't work either.
        // Best option: copy to clipboard and open the folder so user can paste
        try {
            await navigator.clipboard.writeText(src);
            showToast(`Template copied! Paste as "${safe}.${ext}" in the folder`, 'ok');
            invoke('open_folder', { kind: type === 'theme' ? 'themes' : 'plugins' }).catch(() => {});
        } catch(_) {
            showToast('Could not copy — try the Preview button instead', 'err');
        }
    };
    
    // ── CSS Editor ────────────────────────────────────────────────────────────────
    const CSS_KEY = '__st_custom_css__';
    const cssInput = document.getElementById('__st_css_input__');
    const edStatus = document.getElementById('__st_ed_status__');
    let cssSaveTimer;
    
    function applyCustomCss(css) {
        let tag = document.getElementById('__st_custom_css_tag__');
        if (!tag) { tag = document.createElement('style'); tag.id = '__st_custom_css_tag__'; document.head.appendChild(tag); }
        tag.textContent = css;
    }
    
    function flashEditorStatus() {
        edStatus.classList.add('show');
        clearTimeout(cssSaveTimer);
        cssSaveTimer = setTimeout(() => edStatus.classList.remove('show'), 1800);
    }
    
    // Load persisted CSS on open
    (function initEditor() {
        try { const saved = localStorage.getItem(CSS_KEY) || ''; cssInput.value = saved; applyCustomCss(saved); } catch(_) {}
    })();
    
    // Autosave + apply while typing (debounced 500ms)
    cssInput.addEventListener('input', () => {
        clearTimeout(cssSaveTimer);
        cssSaveTimer = setTimeout(() => {
            const css = cssInput.value;
            try { localStorage.setItem(CSS_KEY, css); } catch(_) {}
            applyCustomCss(css);
            flashEditorStatus();
        }, 500);
    });
    
    // Tab key inserts spaces instead of changing focus
    cssInput.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const s = cssInput.selectionStart, end = cssInput.selectionEnd;
            cssInput.value = cssInput.value.slice(0, s) + '  ' + cssInput.value.slice(end);
            cssInput.selectionStart = cssInput.selectionEnd = s + 2;
        }
        // Cmd/Ctrl+S — apply immediately
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault();
            e.stopPropagation();
            const css = cssInput.value;
            try { localStorage.setItem(CSS_KEY, css); } catch(_) {}
            applyCustomCss(css);
            flashEditorStatus();
        }
    });
    
    document.getElementById('__st_ed_apply__').onclick = () => {
        const css = cssInput.value;
        try { localStorage.setItem(CSS_KEY, css); } catch(_) {}
        applyCustomCss(css);
        flashEditorStatus();
    };
    
    document.getElementById('__st_ed_clear__').onclick = () => {
        if (!cssInput.value.trim()) return;
        cssInput.value = '';
        try { localStorage.removeItem(CSS_KEY); } catch(_) {}
        applyCustomCss('');
        flashEditorStatus();
    };
    
    // ── Developer tab subtabs ─────────────────────────────────────────────────────
    document.querySelectorAll('.st-dev-subtab').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.st-dev-subtab').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.st-dev-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = document.getElementById('__st_devpanel_' + btn.dataset.subtab + '__');
            if (panel) panel.classList.add('active');
        };
    });

    // ── Developer mode toggle ─────────────────────────────────────────────────────
    const DEVMODE_KEY = '__st_devmode__';
    const devmodeToggle = document.getElementById('__st_devmode_toggle__');

    function applyDevMode(on) {
        root.classList.toggle('devmode', on);
        if (devmodeToggle) devmodeToggle.classList.toggle('on', on);
        const lbl = document.getElementById('__st_devmode_label__');
        if (lbl) lbl.textContent = on ? 'Developer tab visible' : 'Shows Developer tab';
        // If turning off and currently on developer tab, switch back to themes
        if (!on && currentTab === 'developer') {
            const themesTab = overlay.querySelector('.st-tab[data-tab="themes"]');
            if (themesTab) themesTab.click();
        }
        // Reposition indicator after the tab visibility change has painted
        requestAnimationFrame(() => requestAnimationFrame(() => positionTabIndicator()));
        try { localStorage.setItem(DEVMODE_KEY, on ? '1' : '0'); } catch(_) {}
    }

    (function initDevMode() {
        try { if (localStorage.getItem(DEVMODE_KEY) === '1') applyDevMode(true); } catch(_) {}
    })();

    if (devmodeToggle) {
        devmodeToggle.onclick = function() {
            applyDevMode(!root.classList.contains('devmode'));
        };
    }

    // ── Plugin stats chart (canvas) ───────────────────────────────────────────────
    function drawStatsChart() {
        const canvas = document.getElementById('__st_stats_canvas__');
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const W = canvas.offsetWidth || 480;
        const H = 120;
        canvas.width  = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width  = W + 'px';
        canvas.style.height = H + 'px';
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, W, H);

        const plugins        = allPlugins.filter(p => p.kind === 'Plugin');
        const themes         = allPlugins.filter(p => p.kind === 'Theme');
        const enabledPlugins = plugins.filter(p => p.enabled !== false).length;
        const enabledThemes  = themes.filter(p => p.enabled !== false).length;
        const withNetwork    = plugins.filter(p => p.permissions?.includes('network')).length;
        const sandboxed      = plugins.length - withNetwork;
        const withErrors     = Object.keys(pluginErrors).filter(n => pluginErrors[n]?.length > 0).length;

        // ── Summary numbers row (top) ──────────────────────────────────────────
        const stats = [
            { label: 'Plugins',   val: plugins.length,  sub: `${enabledPlugins} active`,  color: 'rgba(100,160,255,0.85)' },
            { label: 'Themes',    val: themes.length,   sub: `${enabledThemes} active`,   color: 'rgba(46,204,113,0.85)'  },
            { label: 'Sandboxed', val: sandboxed,        sub: 'no net access',             color: 'rgba(100,210,160,0.85)' },
            { label: 'Errors',    val: withErrors,       sub: withErrors ? 'see cards' : 'none', color: withErrors ? 'rgba(220,100,100,0.85)' : 'rgba(255,255,255,0.2)' },
        ];

        const colW = W / stats.length;
        const numY = 32, subY = 52, barY = 72, barH = 10;

        stats.forEach((s, i) => {
            const cx = colW * i + colW / 2;

            // Big number
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.font = `600 ${22}px -apple-system,BlinkMacSystemFont,sans-serif`;
            ctx.fillStyle = s.color;
            ctx.fillText(String(s.val), cx, numY);

            // Label
            ctx.font = `${9}px -apple-system,BlinkMacSystemFont,sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,0.28)';
            ctx.fillText(s.label.toUpperCase(), cx, subY - 4);

            // Sub-label
            ctx.font = `${9}px -apple-system,BlinkMacSystemFont,sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,0.18)';
            ctx.fillText(s.sub, cx, subY + 9);

            // Mini progress bar
            const barX = colW * i + 10;
            const bW   = colW - 20;
            const total = i === 0 ? Math.max(plugins.length, 1)
                        : i === 1 ? Math.max(themes.length, 1)
                        : i === 2 ? Math.max(plugins.length, 1)
                        : Math.max(plugins.length + themes.length, 1);
            const fill  = Math.max(0, Math.min(1, s.val / total));

            // track
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(barX, barY, bW, barH, 3);
            else ctx.rect(barX, barY, bW, barH);
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            ctx.fill();

            // fill
            if (fill > 0) {
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(barX, barY, Math.max(bW * fill, 6), barH, 3);
                else ctx.rect(barX, barY, Math.max(bW * fill, 6), barH);
                ctx.fillStyle = s.color;
                ctx.fill();
            }

            // divider between columns (not after last)
            if (i < stats.length - 1) {
                ctx.beginPath();
                ctx.moveTo(colW * (i + 1), 8);
                ctx.lineTo(colW * (i + 1), H - 8);
                ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });

        // Update legend
        const legendEl = document.getElementById('__st_chart_legend__');
        if (legendEl) legendEl.innerHTML = '';
    }

    // ── Player Backend ────────────────────────────────────────────────────────────
    // Persisted in Rust via get/set_playback_backend + get/save_mpv_prefs.
    // Four backends: 'service' | 'mpv' | 'server' | 'native'

    const BACKEND_LABELS = {
        service: { icon: '🌐', name: 'Stremio Service' },
        mpv:     { icon: '🎬', name: 'MPV (native)'    },
        server:  { icon: '🖥',  name: 'server.js'       },
        native:  { icon: '📺', name: 'Native <video>'  },
    };

    let _currentBackend = 'service';

    // Load persisted backend on startup (best-effort; stays 'service' if Rust fails)
    (async function initBackend() {
        try { _currentBackend = await invoke('get_playback_backend'); } catch(_) {}
        installFetchInterceptor();
    })();

    function refreshBackendCards() {
        document.querySelectorAll('.st-be-card').forEach(card => {
            card.classList.toggle('active', card.dataset.be === _currentBackend);
        });
        // show/hide service status row and mpv prefs
        const svcRow  = document.getElementById('__st_svc_status_row__');
        const mpvPref = document.getElementById('__st_mpv_prefs__');
        if (svcRow)  svcRow.style.display  = _currentBackend === 'service' ? '' : 'none';
        if (mpvPref) mpvPref.classList.toggle('visible', _currentBackend === 'mpv');
    }

    // Wire up backend card clicks once the DOM is ready
    document.getElementById('__st_backend_section__').addEventListener('click', async e => {
        const card = e.target.closest('.st-be-card');
        if (!card) return;
        const be = card.dataset.be;
        if (!be || be === _currentBackend) return;

        if (be === 'native') {
            showToast('Native <video> — coming soon', 'err');
            return;
        }
        try {
            await invoke('set_playback_backend', { backend: be });
            _currentBackend = be;
            refreshBackendCards();
            installFetchInterceptor();
            showToast(`Backend → ${BACKEND_LABELS[be]?.name || be}`, 'ok');
            if (be === 'service') probeServiceStatus();
            if (be === 'mpv')     syncMpvPrefsUI();
        } catch(e) {
            showToast('Could not switch backend: ' + e, 'err');
        }
    });

    // ── Service health probe ───────────────────────────────────────────────────────
    // Uses the Rust command so the HTTP request is made by Rust, not the browser
    // (bypasses the HTTPS→HTTP mixed-content block completely).
    async function probeServiceStatus() {
        const dot  = document.getElementById('__st_svc_dot__');
        const txt  = document.getElementById('__st_svc_status_txt__');
        const row  = document.getElementById('__st_svc_status_row__');
        if (!dot || !txt || !row) return;
        if (_currentBackend !== 'service') { row.style.display = 'none'; return; }
        row.style.display = '';
        dot.className  = 'st-svc-dot checking';
        txt.textContent = 'Checking Stremio Service…';
        try {
            const ok = await invoke('check_stremio_service');
            dot.className   = 'st-svc-dot ' + (ok ? 'ok' : 'fail');
            txt.textContent  = ok
                ? 'Stremio Service running on localhost:11470 ✓'
                : 'Stremio Service not detected — start the Stremio desktop app';
        } catch(_) {
            dot.className   = 'st-svc-dot fail';
            txt.textContent  = 'Could not probe Stremio Service';
        }
    }

    // ── MPV prefs UI ──────────────────────────────────────────────────────────────
    async function syncMpvPrefsUI() {
        try {
            const prefs = await invoke('get_mpv_prefs');
            const shaderEl = document.getElementById('__st_mpv_shader__');
            const flagsEl  = document.getElementById('__st_mpv_flags__');
            if (shaderEl) shaderEl.value = prefs.upscale_shader || '';
            if (flagsEl)  flagsEl.value  = prefs.extra_flags    || '';
        } catch(_) {}
    }

    document.getElementById('__st_mpv_save__').addEventListener('click', async () => {
        const shader = (document.getElementById('__st_mpv_shader__')?.value || '').trim() || null;
        const flags  = (document.getElementById('__st_mpv_flags__')?.value  || '').trim() || null;
        try {
            await invoke('save_mpv_prefs', { upscaleShader: shader, extraFlags: flags });
            showToast('MPV prefs saved ✓', 'ok');
        } catch(e) {
            showToast('Could not save: ' + e, 'err');
        }
    });

    // ── Fetch interceptor — routes stream URLs to the right backend ───────────────
    //
    // The browser blocks http://127.0.0.1:11470 from an HTTPS page (mixed content).
    // We fix this by: for the 'service' backend, letting Stremio's own worker handle
    // those (they use a ServiceWorker that has special access). For other backends
    // we intercept HTMLMediaElement.src assignment and route accordingly.
    //
    // NOTE: Stremio Web's ServiceWorker already handles the localhost:11470 proxying
    // internally via its own fetch handler — what we need to do is not break it and
    // ensure the CSP in tauri.conf.json allows connect-src for http://127.0.0.1:11470.
    // The actual stream interception below is only for MPV / server backends.

    const _origSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'src');

    function looksLikeStream(url) {
        if (typeof url !== 'string' || !url) return false;
        // Stremio Service stream URLs
        if (url.includes('127.0.0.1:11470') || url.includes('localhost:11470')) return true;
        // Direct media extensions
        if (/\\.(mp4|mkv|webm|avi|m3u8|ts)([?#]|$)/i.test(url)) return true;
        return false;
    }

    let _lastInterceptedUrl = null;

    function installFetchInterceptor() {
        if (!_origSrcDescriptor) return; // safety

        Object.defineProperty(HTMLMediaElement.prototype, 'src', {
            configurable: true,
            get() { return _origSrcDescriptor.get.call(this); },
            set(url) {
                // Only intercept on non-service backends and only for real stream URLs
                if (_currentBackend !== 'service' && _currentBackend !== 'native' && looksLikeStream(url)) {
                    if (url !== _lastInterceptedUrl) {
                        _lastInterceptedUrl = url;
                        handleStreamIntercept(url, this);
                    }
                    // Blank out the <video> src so the browser doesn't try to load it
                    _origSrcDescriptor.set.call(this, '');
                    return;
                }
                _origSrcDescriptor.set.call(this, url);
            }
        });
    }

    async function handleStreamIntercept(url, videoEl) {
        if (_currentBackend === 'mpv') {
            showToast('▶ Opening in MPV…', 'ok');
            try {
                await invoke('launch_mpv', { url });
            } catch(err) {
                showToast('MPV error: ' + err, 'err');
            }
        } else if (_currentBackend === 'server') {
            // server.js backend: POST the URL to the local server.js running on a
            // well-known port (11471 by default) so it can handle the stream.
            showToast('▶ Sending to server.js…', 'ok');
            try {
                await invoke('proxy_service', {
                    method: 'POST',
                    path: '/play',
                    body: JSON.stringify({ url }),
                    port: 11471,
                });
            } catch(err) {
                showToast('server.js error: ' + err, 'err');
            }
        }
    }

    // ── Mutation observer ─────────────────────────────────────────────────────────
    new MutationObserver(()=>{
        if(!document.getElementById('__st_root__')) document.documentElement.appendChild(root);
    }).observe(document.documentElement,{childList:true});

    // ── Command palette (⌘K) ─────────────────────────────────────────────────────
    let palOpen = false;
    let palMode = 'none'; // 'cmd' | 'search'
    // ── Raycast-style inline command palette ─────────────────────────────────────
    const ipalEl   = document.getElementById('__st_inline_pal__');
    const ipalList = document.getElementById('__st_inline_pal_list__');
    const searchRow = document.getElementById('__st_search_row__');
    const cmdPrefix = document.getElementById('__st_cmd_prefix__');
    let ipalItems  = [];
    let ipalActive = 0;

    // Prevent palette clicks from blurring the search input
    if (ipalEl) ipalEl.addEventListener('mousedown', e => e.preventDefault());

    const ALL_PALETTE_CMDS = [
        { kind: 'Action', label: 'Browse Marketplace',    action: () => switchToTab('marketplace') },
        { kind: 'Action', label: 'View Activity log',     action: () => switchToTab('activity') },
        { kind: 'Action', label: 'Open Settings',         action: () => switchToTab('about') },
        { kind: 'Action', label: 'Developer tab',         action: () => { const dt = document.getElementById('__st_devmode_toggle__'); if(dt) dt.click(); } },
        { kind: 'Action', label: 'Toggle compact mode',   action: () => { const ct = document.getElementById('__st_compact_toggle__'); if(ct) ct.click(); } },
        { kind: 'Action', label: 'Toggle film grain',     action: () => { const gt = document.getElementById('__st_grain_toggle__'); if(gt) gt.click(); } },
        { kind: 'Action', label: 'Launch confetti',       action: () => launchConfetti() },
        { kind: 'Action', label: 'Export / share config', action: () => openExportModal() },
        { kind: 'Action', label: 'Safe mode',             action: () => document.getElementById('__st_safemode_btn__')?.click() },
        { kind: 'Action', label: 'Check for updates',     action: () => document.getElementById('__st_check_updates__')?.click() },
        { kind: 'Action', label: 'Detect conflicts',      action: () => document.getElementById('__st_conflict_btn__')?.click() },
        { kind: 'Action', label: 'Reload Stremio',        action: () => invoke('reload_app').catch(() => { try{window.location.reload();}catch(_){} }) },
        { kind: 'Action', label: 'Open plugins folder',   action: () => invoke('open_folder',{kind:'plugins'}).catch(()=>{}) },
        { kind: 'Action', label: 'Open themes folder',    action: () => invoke('open_folder',{kind:'themes'}).catch(()=>{}) },
    ];

    function buildPaletteItems(q, showAllCommands) {
        const lq = q.toLowerCase();
        const out = [];
        // Always include commands that match the query; in cmd mode with empty query show all
        for (const c of ALL_PALETTE_CMDS) {
            if (showAllCommands && !lq) { out.push(c); continue; }
            if (lq && c.label.toLowerCase().includes(lq)) out.push(c);
        }
        // Plugins/themes when there's a query
        if (lq) {
            for (const p of allPlugins) {
                if (p.name.toLowerCase().includes(lq)) {
                    out.push({ kind: p.kind, label: p.name, action: () => switchToTab(p.kind === 'Theme' ? 'themes' : 'plugins') });
                }
            }
        }
        return out.slice(0, 16);
    }

    function renderInlinePalette(q) {
        if (!ipalList) return;
        ipalItems = buildPaletteItems(q, palMode === 'cmd' && !q);
        ipalActive = 0;
        if (ipalItems.length === 0) {
            ipalList.innerHTML = '<div class="sp-ipal-empty">No matches</div>';
            return;
        }
        ipalList.innerHTML = ipalItems.map((it, i) => `
            <button class="sp-ipal-row${i === 0 ? ' active' : ''}" data-ipal="${i}">
                <span class="sp-ipal-kind">${escapeHtml(it.kind)}</span>
                <span class="sp-ipal-label">${escapeHtml(it.label)}</span>
                ${i === 0 ? '<span class="sp-ipal-enter">↵</span>' : ''}
            </button>`).join('');
        ipalList.querySelectorAll('[data-ipal]').forEach(btn => {
            btn.onmouseenter = () => {
                ipalList.querySelectorAll('.sp-ipal-row').forEach(r => r.classList.remove('active'));
                btn.classList.add('active');
                ipalActive = +btn.dataset.ipal;
            };
            btn.onclick = () => fireIpalItem(+btn.dataset.ipal);
        });
    }

    function fireIpalItem(idx) {
        const it = ipalItems[idx];
        if (!it) return;
        closePalette();
        it.action();
    }

    function openPalette() {
        if (palOpen && palMode === 'search') closePalette();
        if (palOpen && palMode === 'cmd') { closePalette(); return; }
        palOpen = true;
        palMode = 'cmd';
        const searchEl = document.getElementById('__st_search__');
        if (!searchEl) return;
        searchEl._prevVal = searchEl.value;
        searchEl._prevPlaceholder = searchEl.placeholder;
        searchEl.value = '';
        searchEl.placeholder = 'Run a command or search…';
        if (cmdPrefix) cmdPrefix.style.display = 'inline';
        if (searchRow) searchRow.classList.add('cmd-mode');
        if (ipalEl) ipalEl.classList.add('open');
        renderInlinePalette('');
        searchEl.focus();
    }

    function openSearchPalette(q) {
        if (palOpen && palMode === 'cmd') return;
        palOpen = true;
        palMode = 'search';
        if (ipalEl) ipalEl.classList.add('open');
        renderInlinePalette(q);
    }

    function closePalette() {
        if (!palOpen) return;
        const prevMode = palMode;
        palOpen = false;
        palMode = 'none';
        if (prevMode === 'cmd') {
            const searchEl = document.getElementById('__st_search__');
            if (searchEl) {
                searchEl.value = searchEl._prevVal || '';
                searchEl.placeholder = searchEl._prevPlaceholder || 'Search plugins, themes… or ⌘K';
            }
            if (cmdPrefix) cmdPrefix.style.display = 'none';
            if (searchRow) searchRow.classList.remove('cmd-mode');
        }
        if (ipalEl) ipalEl.classList.remove('open');
    }

    function switchToTab(tabId) {
        const tabBtn = overlay.querySelector(`.st-tab[data-tab="${tabId}"]`);
        if (tabBtn) tabBtn.click();
    }

    // Wire search input: auto-open palette on typing, drive palette in cmd mode
    const mainSearchEl = document.getElementById('__st_search__');
    if (mainSearchEl) {
        mainSearchEl.addEventListener('input', e => {
            const q = e.target.value;
            if (palMode === 'cmd') {
                renderInlinePalette(q);
            } else if (q) {
                openSearchPalette(q);
            } else if (palMode === 'search') {
                closePalette();
            }
        });
        mainSearchEl.addEventListener('blur', () => {
            // Small delay so palette item clicks fire before palette closes
            setTimeout(() => { if (palOpen) closePalette(); }, 150);
        });
        mainSearchEl.addEventListener('keydown', e => {
            if (!palOpen) return;
            if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                ipalActive = Math.min(ipalActive + 1, ipalItems.length - 1);
                ipalList?.querySelectorAll('.sp-ipal-row').forEach((r,i) => r.classList.toggle('active', i === ipalActive));
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                ipalActive = Math.max(ipalActive - 1, 0);
                ipalList?.querySelectorAll('.sp-ipal-row').forEach((r,i) => r.classList.toggle('active', i === ipalActive));
            }
            if (e.key === 'Enter') { e.preventDefault(); fireIpalItem(ipalActive); }
        });
    }

    // Open palette with Cmd/Ctrl+K
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault(); e.stopPropagation();
            palOpen ? closePalette() : openPalette();
        }
    }, true);

    // Wire footer ⌘K button
    document.getElementById('__st_pal_foot__')?.addEventListener('click', e => { e.stopPropagation(); openPalette(); });

    // ── Author drawer ─────────────────────────────────────────────────────────────
    function openAuthorDrawer(authorName) {
        if (!authorName) return;
        const hue = (authorName.charCodeAt(0) * 37) % 360;
        const initials = authorName.slice(0, 2).toUpperCase();
        const heroEl = document.getElementById('__st_author_hero__');
        if (heroEl) heroEl.innerHTML = `
            <div class="sp-auth-avatar" style="--icon-hue:${hue}">${initials}</div>
            <div class="sp-auth-meta">
                <div class="sp-auth-name">${escapeHtml(authorName)}</div>
                <div class="sp-auth-bio">Plugin / theme author</div>
                <div class="sp-auth-stats">
                    <span><b>${allPlugins.filter(p=>p.author===authorName).length}</b> projects</span>
                </div>
            </div>
        `;
        const bodyEl = document.getElementById('__st_author_body__');
        if (bodyEl) {
            const authored = allPlugins.filter(p => p.author === authorName);
            if (authored.length === 0) { bodyEl.innerHTML = '<div class="sp-pal-empty">No published items found</div>'; }
            else {
                bodyEl.innerHTML = `<div class="sp-auth-section">
                    <div class="sp-auth-section-title">Projects (${authored.length})</div>
                    ${authored.map(p => `
                        <button class="sp-auth-row" data-author-jump="${escapeHtml(p.kind)}" data-author-name="${escapeHtml(p.name)}">
                            <div class="sp-auth-row-icon" style="--icon-hue:${(p.name.charCodeAt(0)*11)%360}">${p.name.slice(0,2).toUpperCase()}</div>
                            <div class="sp-auth-row-body">
                                <div class="sp-auth-row-name">${escapeHtml(p.name)}</div>
                                <div class="sp-auth-row-desc">${escapeHtml(p.description||p.version||'')}</div>
                            </div>
                        </button>`).join('')}
                </div>`;
                bodyEl.querySelectorAll('[data-author-jump]').forEach(btn => {
                    btn.onclick = () => {
                        closeAuthorDrawer();
                        const kind = btn.dataset.authorJump;
                        switchToTab(kind === 'Theme' ? 'themes' : 'plugins');
                        setTimeout(() => {
                            const s = document.getElementById('__st_search__');
                            if (s) { s.value = btn.dataset.authorName; s.dispatchEvent(new Event('input')); }
                        }, 100);
                    };
                });
            }
        }
        authorOverlay.classList.add('open');
    }
    function closeAuthorDrawer() { authorOverlay.classList.remove('open'); }
    document.getElementById('__st_author_close__').onclick = closeAuthorDrawer;
    authorOverlay.addEventListener('click', e => { if (e.target === authorOverlay) closeAuthorDrawer(); });

    // ── Export / share config modal ───────────────────────────────────────────────
    function openExportModal() {
        const enabled = allPlugins.filter(p => isEnabled(p.name));
        const plugins = allPlugins.filter(p => p.kind === 'Plugin');
        const themes  = allPlugins.filter(p => p.kind === 'Theme');
        const activeTheme = localStorage.getItem('currentTheme') || 'Default';
        const accent = localStorage.getItem('__st_accent__') || 'default';
        const data = { v: 1, generated: new Date().toISOString().slice(0,10), plugins: plugins.map(p => ({ name: p.name, version: p.version, enabled: isEnabled(p.name) })), theme: activeTheme, accent };
        const config = 'stremio+://config?d=' + btoa(JSON.stringify(data)).slice(0, 240);

        const statsEl = document.getElementById('__st_export_stats__');
        if (statsEl) statsEl.innerHTML = `<div><b>${plugins.length}</b> plugins</div><div><b>${enabled.filter(p=>p.kind==='Plugin').length}</b> enabled</div><div><b>${themes.length}</b> themes</div>`;
        const codeEl = document.getElementById('__st_export_code__');
        if (codeEl) codeEl.textContent = config;

        const copyBtn = document.getElementById('__st_export_copy__');
        if (copyBtn) copyBtn.onclick = () => {
            navigator.clipboard?.writeText(config).then(() => {
                showToast('Config link copied!', 'ok');
                closeExportModal();
            }).catch(() => showToast('Could not access clipboard', 'err'));
        };
        const jsonBtn = document.getElementById('__st_export_json__');
        if (jsonBtn) jsonBtn.onclick = () => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'stremioplus-config.json'; a.click();
            URL.revokeObjectURL(url);
        };
        exportOverlay.classList.add('open');
    }
    function closeExportModal() { exportOverlay.classList.remove('open'); }
    document.getElementById('__st_export_close__').onclick = closeExportModal;
    exportOverlay.addEventListener('click', e => { if (e.target === exportOverlay) closeExportModal(); });

    // Wire Export button in settings tab
    document.getElementById('__st_about_wrap__').addEventListener('click', e => {
        if (e.target.closest('#__st_exportconfig_btn__')) openExportModal();
    });

    // ── Crash reporter integration ────────────────────────────────────────────────
    window.addEventListener('error', e => {
        const msg = e?.message || String(e);
        if (msg.toLowerCase().includes('plugin') || (e?.filename||'').includes('plugin')) {
            pushActivity('error', 'Plugin error caught', msg.slice(0, 80));
        }
    });

    // ── Layout settings controls ──────────────────────────────────────────────────
    // Segmented controls in the settings tab
    function wireSegment(wrapId, storageKey, onChange) {
        const wrap = document.getElementById(wrapId);
        if (!wrap) return;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            wrap.querySelectorAll('.sp-set-seg-btn').forEach(b => {
                const val = b.dataset.view || b.dataset.card || b.dataset.glass;
                b.classList.toggle('on', val === saved);
            });
            onChange(saved);
        }
        wrap.addEventListener('click', e => {
            const btn = e.target.closest('.sp-set-seg-btn');
            if (!btn) return;
            const val = btn.dataset.view || btn.dataset.card || btn.dataset.glass;
            wrap.querySelectorAll('.sp-set-seg-btn').forEach(b => b.classList.remove('on'));
            btn.classList.add('on');
            localStorage.setItem(storageKey, val);
            onChange(val);
        });
    }

    // Module view: grid vs list
    wireSegment('__st_view_seg__', '__st_view_mode__', val => {
        const list = document.getElementById('__st_list__');
        if (list) list.classList.toggle('sp-grid-view', val === 'grid');
    });
    (() => {
        const saved = localStorage.getItem('__st_view_mode__');
        const list = document.getElementById('__st_list__');
        if (saved && list) list.classList.toggle('sp-grid-view', saved === 'grid');
    })();

    // Card style: flat / elevated / glass — applied to panel root
    wireSegment('__st_card_seg__', '__st_card_style__', val => {
        const p = document.getElementById('__st_panel__');
        if (!p) return;
        p.classList.remove('card-flat', 'card-elevated', 'card-glass');
        if (val !== 'flat') p.classList.add(`card-${val}`);
    });
    (() => {
        const saved = localStorage.getItem('__st_card_style__');
        if (saved && saved !== 'flat') {
            const p = document.getElementById('__st_panel__');
            if (p) { p.classList.remove('card-flat','card-elevated','card-glass'); p.classList.add(`card-${saved}`); }
        }
    })();

    // Glass depth: flat / soft / deep
    wireSegment('__st_glass_seg__', '__st_glass_depth__', val => {
        const p = document.getElementById('__st_panel__');
        if (!p) return;
        p.classList.remove('glass-flat', 'glass-soft', 'glass-deep');
        p.classList.add(`glass-${val}`);
    });
    // Apply saved glass depth on load
    (() => {
        const saved = localStorage.getItem('__st_glass_depth__') || 'soft';
        const p = document.getElementById('__st_panel__');
        if (p) { p.classList.remove('glass-flat','glass-soft','glass-deep'); p.classList.add(`glass-${saved}`); }
    })();

    // Film grain toggle
    const grainToggle = document.getElementById('__st_grain_toggle__');
    if (grainToggle) {
        const grainOn = localStorage.getItem('__st_grain__') !== 'off';
        if (grainOn) { grainToggle.classList.add('on'); document.getElementById('__st_panel__')?.classList.add('sp-grain'); }
        grainToggle.onclick = function() {
            const now = this.classList.toggle('on');
            localStorage.setItem('__st_grain__', now ? 'on' : 'off');
            document.getElementById('__st_panel__')?.classList.toggle('sp-grain', now);
        };
    }

    // Optimized mode toggle
    const optimizedToggle = document.getElementById('__st_optimized_toggle__');
    if (optimizedToggle) {
        const isOpt = localStorage.getItem('__st_optimized__') === 'on';
        if (isOpt) { optimizedToggle.classList.add('on'); root.classList.add('no-blur'); }
        optimizedToggle.onclick = function() {
            const now = this.classList.toggle('on');
            localStorage.setItem('__st_optimized__', now ? 'on' : 'off');
            root.classList.toggle('no-blur', now);
            if (now) setPageBlur(false);
        };
    }

    // Activity tab visibility toggle
    const actTabBtn = overlay.querySelector('.st-tab[data-tab="activity"]');
    const showActToggle = document.getElementById('__st_show_activity_toggle__');
    if (showActToggle) {
        const actOn = localStorage.getItem('__st_show_activity__') !== 'off';
        if (actOn) showActToggle.classList.add('on');
        if (actTabBtn) actTabBtn.classList.toggle('st-tab-hidden', !actOn);
        showActToggle.onclick = function() {
            const now = this.classList.toggle('on');
            localStorage.setItem('__st_show_activity__', now ? 'on' : 'off');
            if (actTabBtn) actTabBtn.classList.toggle('st-tab-hidden', !now);
        };
    }

    })();