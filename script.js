// ====================================================
// TRYX PROTECTED GATEWAY - https://tryxhub.netlify.app
// ====================================================
// Ce fichier sert de passerelle sécurisée
// Accès direct: ACCESS DENIED
// Depuis Roblox: Exécute le vrai script

(function() {
  'use strict';
  
  // 🔍 DÉTECTION DU CONTEXTE
  const isBrowser = typeof window !== 'undefined' && 
                    typeof document !== 'undefined';
  
  const userAgent = navigator.userAgent || '';
  const isRobloxRequest = userAgent.includes('Roblox') || 
                         userAgent.includes('Http') ||
                         window.location.search.includes('source=roblox');
  
  // 🔴 CAS 1: NAVIGATEUR WEB → BLOQUE
  if (isBrowser && !isRobloxRequest) {
    renderAccessDenied();
    return;
  }
  
  // ✅ CAS 2: ROBLOX HTTP.GET → SERT LE VRAI SCRIPT
  serveRealScript();
  
  // ==============================================
  // FONCTION: PAGE ACCESS DENIED
  // ==============================================
  function renderAccessDenied() {
    document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔒 ACCESS DENIED | TRYX</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #000;
            color: #ff0000;
            font-family: 'Courier New', monospace;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }
        
        .glitch {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 30%, rgba(255,0,0,0.1) 50%, transparent 70%);
            animation: glitchMove 3s infinite linear;
            pointer-events: none;
        }
        
        @keyframes glitchMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .container {
            text-align: center;
            border: 4px solid #ff0000;
            padding: 60px 80px;
            border-radius: 20px;
            background: rgba(10, 0, 0, 0.95);
            box-shadow: 0 0 100px rgba(255, 0, 0, 0.3);
            position: relative;
            z-index: 2;
            max-width: 900px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 100px rgba(255, 0, 0, 0.3); }
            50% { box-shadow: 0 0 150px rgba(255, 0, 0, 0.6); }
        }
        
        h1 {
            font-size: 4.5em;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 8px;
            text-shadow: 0 0 30px #ff0000;
        }
        
        .separator {
            height: 3px;
            background: linear-gradient(90deg, transparent, #ff0000, transparent);
            margin: 40px 0;
        }
        
        .message {
            font-size: 1.8em;
            color: #ff6666;
            margin: 30px 0;
            line-height: 1.6;
        }
        
        .url-box {
            background: rgba(255, 0, 0, 0.1);
            border: 2px solid rgba(255, 0, 0, 0.3);
            padding: 20px;
            margin: 40px 0;
            border-radius: 10px;
            font-size: 1.6em;
            word-break: break-all;
        }
        
        .url-box a {
            color: #ff3333;
            text-decoration: none;
            font-weight: bold;
        }
        
        .url-box a:hover {
            color: #ffffff;
            text-decoration: underline;
        }
        
        .warning {
            color: #888;
            font-size: 1.2em;
            margin: 30px 0;
        }
        
        .info {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 0, 0, 0.2);
            color: #555;
            font-size: 0.9em;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin: 25px 0;
        }
        
        .skid-message {
            color: #ff0000;
            font-weight: bold;
            font-size: 1.3em;
            margin-top: 30px;
            padding: 15px;
            border: 2px dashed #ff0000;
            border-radius: 10px;
        }
        
        .countdown {
            font-size: 2em;
            color: #ffffff;
            margin: 20px 0;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="glitch"></div>
    
    <div class="container">
        <h1>🔒 ACCESS DENIED</h1>
        
        <div class="separator"></div>
        
        <div class="message">
            This <span style="color: #ffffff; font-weight: bold;">PROTECTED SCRIPT</span><br>
            can only be loaded from within Roblox
        </div>
        
        <div class="url-box">
            Official website:<br>
            <a href="https://tryxhub.netlify.app">https://tryxhub.netlify.app</a>
        </div>
        
        <div class="warning">
            <i class="fas fa-shield-alt"></i> Direct access is blocked.<br>
            Your attempt has been logged and monitored.
        </div>
        
        <div class="countdown" id="countdown">Redirecting in 10...</div>
        
        <div class="info">
            <div class="info-grid">
                <div>
                    <strong>IP:</strong><br>
                    <span style="color: #aaa;">${window.location.hostname}</span>
                </div>
                <div>
                    <strong>Time:</strong><br>
                    <span style="color: #aaa;">${new Date().toLocaleString()}</span>
                </div>
                <div>
                    <strong>Agent:</strong><br>
                    <span style="color: #aaa;">${navigator.userAgent.substring(0, 40)}...</span>
                </div>
            </div>
            
            <div class="skid-message">
                ⚠️ Stop trying to steal scripts, skid. ⚠️
            </div>
        </div>
    </div>
    
    <script>
    // Redirection automatique
    let count = 10;
    const countdownEl = document.getElementById('countdown');
    const countdownInterval = setInterval(() => {
        count--;
        countdownEl.textContent = 'Redirecting in ' + count + '...';
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            window.location.href = 'https://tryxhub.netlify.app';
        }
    }, 1000);
    
    // Bloque toutes les interactions
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || e.ctrlKey || e.metaKey) {
            e.preventDefault();
            alert('Developer tools are disabled');
        }
    });
    
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Right-click is disabled');
    });
    
    // Bloque la navigation
    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = '';
    });
    </script>
</body>
</html>`;
  }
  
  // ==============================================
  // FONCTION: SERT LE VRAI SCRIPT POUR ROBLOX
  // ==============================================
  function serveRealScript() {
    // Ce code est exécuté quand Roblox fait Http.Get()
    
    const realScript = `
-- ============================================
-- TRYX SCRIPT v2.1.0 | Christmas Edition 🎄
-- OFFICIAL: https://tryxhub.netlify.app
-- LOADED: ${new Date().toISOString()}
-- SECURITY: SHΔDØW CORE PROTECTED
-- ============================================

print("🎄 TRYX Christmas Edition v2.1.0")
print("🔐 Loading from secure gateway...")

-- Charge le vrai script TRYX
loadstring(game:HttpGet("https://raw.githubusercontent.com/Moon-820/Tryx/refs/heads/main/Loader"))()

print("✅ TRYX loaded successfully!")
print("🎅 Merry Christmas from moon_820!")

-- Watermark: TRYX_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}
-- Security Hash: ${crypto.randomUUID ? crypto.randomUUID() : Date.now()}
`;
    
    // Envoie le script
    if (typeof module !== 'undefined' && module.exports) {
      // Pour Netlify/Node.js
      module.exports = realScript;
    } else {
      // Pour les navigateurs (normalement pas exécuté)
      console.log(realScript);
    }
  }
  
  // ==============================================
  // EXPORT POUR NETLIFY
  // ==============================================
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = (req, res) => {
      const userAgent = req.headers['user-agent'] || '';
      const isRoblox = userAgent.includes('Roblox') || 
                      userAgent.includes('Http') ||
                      req.query.source === 'roblox';
      
      if (!isRoblox) {
        res.setHeader('Content-Type', 'text/html');
        res.send(renderAccessDenied());
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('X-TRYX-Security', 'Protected');
        res.send(serveRealScript());
      }
    };
  }
})();