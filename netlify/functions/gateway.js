// netlify/functions/gateway.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const userAgent = event.headers['user-agent'] || '';
  const referer = event.headers.referer || '';
  const ip = event.headers['x-forwarded-for'] || 'unknown';
  
  console.log(`🔍 Gateway Request: ${ip} | UA: ${userAgent.substring(0, 50)}...`);
  
  // 🔴 DÉTECTION : Est-ce un navigateur web normal ?
  const isNormalBrowser = (
    userAgent.includes('Mozilla') &&
    userAgent.includes('AppleWebKit') &&
    !userAgent.includes('Roblox') &&
    !userAgent.includes('HttpClient')
  );
  
  // 🔴 DÉTECTION : Est-ce Roblox/Executor ?
  const isRoblox = (
    userAgent.includes('Roblox') ||
    userAgent.includes('HttpClient') ||
    userAgent.includes('Executor') ||
    userAgent.includes('Synapse') ||
    userAgent.includes('KRNL') ||
    event.queryStringParameters.source === 'roblox'
  );
  
  // 🔴 CAS 1 : NAVIGATEUR NORMAL → BLOQUE
  if (isNormalBrowser) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      },
      body: `<!DOCTYPE html>
<html style="height: 100%; background: #000;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔒 ACCESS DENIED | TRYX</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            background: #000;
            color: #ff0000;
            font-family: 'Orbitron', monospace;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }
        
        .scanlines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to bottom,
                transparent 50%,
                rgba(255, 0, 0, 0.03) 50%
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 1;
            animation: scan 10s linear infinite;
        }
        
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        
        .container {
            text-align: center;
            border: 4px solid #ff0000;
            padding: 60px 80px;
            border-radius: 20px;
            background: rgba(10, 0, 0, 0.97);
            position: relative;
            z-index: 2;
            max-width: 900px;
            box-shadow: 
                0 0 100px rgba(255, 0, 0, 0.3),
                0 0 200px rgba(255, 0, 0, 0.1),
                inset 0 0 50px rgba(255, 0, 0, 0.2);
            animation: glitch 5s infinite;
        }
        
        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            1%, 3%, 5%, 7%, 9% { transform: translate(-1px, 1px); }
            2%, 4%, 6%, 8%, 10% { transform: translate(1px, -1px); }
        }
        
        h1 {
            font-size: 4.5em;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 8px;
            text-shadow: 
                0 0 20px #ff0000,
                0 0 40px #ff0000,
                0 0 60px #ff0000;
            animation: flicker 3s infinite;
        }
        
        @keyframes flicker {
            0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 72%, 100% { opacity: 1; }
            20%, 21.999%, 63%, 63.999%, 65%, 71.999% { opacity: 0.4; }
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
            font-family: 'Courier New', monospace;
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
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
            font-size: 0.9em;
            color: #888;
        }
        
        .warning {
            color: #ff0000;
            font-weight: bold;
            font-size: 1.3em;
            margin: 40px 0 20px 0;
            padding: 15px;
            border: 2px dashed #ff0000;
            border-radius: 10px;
            background: rgba(255, 0, 0, 0.05);
        }
        
        .countdown {
            font-size: 2em;
            color: #ffffff;
            margin: 30px 0;
            font-weight: bold;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="scanlines"></div>
    
    <div class="container">
        <h1>🔒 ACCESS DENIED</h1>
        
        <div class="separator"></div>
        
        <div class="message">
            <span style="color: #ffffff; font-weight: bold;">PROTECTED GATEWAY</span><br>
            This script can only be accessed from within Roblox
        </div>
        
        <div class="url-box">
            Official Source:<br>
            <a href="https://tryxhub.netlify.app">https://tryxhub.netlify.app</a>
        </div>
        
        <div class="info-grid">
            <div>
                <strong>IP:</strong><br>
                <span style="color: #aaa;">${ip}</span>
            </div>
            <div>
                <strong>TIME:</strong><br>
                <span style="color: #aaa;">${new Date().toLocaleString()}</span>
            </div>
            <div>
                <strong>AGENT:</strong><br>
                <span style="color: #aaa;">${userAgent.substring(0, 30)}...</span>
            </div>
        </div>
        
        <div class="countdown" id="countdown">10</div>
        
        <div class="warning">
            ⚠️ SECURITY VIOLATION DETECTED<br>
            Attempting to bypass protection is prohibited
        </div>
    </div>
    
    <script>
        // Redirection automatique
        let count = 10;
        const countdownEl = document.getElementById('countdown');
        
        const timer = setInterval(() => {
            count--;
            countdownEl.textContent = count;
            
            if (count <= 0) {
                clearInterval(timer);
                window.location.href = 'https://tryxhub.netlify.app';
            }
        }, 1000);
        
        // Bloque toutes les interactions
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || e.ctrlKey || e.metaKey) {
                e.preventDefault();
                document.body.innerHTML = '<h1 style="color: #ff0000; text-align: center; margin-top: 50px;">INSPECTOR DISABLED</h1>';
            }
        });
        
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert('🚫 Right-click disabled');
            return false;
        });
        
        // Empêche le drag & drop
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
        
        // Empêche la copie
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            alert('🚫 Copy disabled');
        });
    </script>
</body>
</html>`
    };
  }
  
  // ✅ CAS 2 : ROBLOX/EXECUTOR → SERT LE SCRIPT
  if (isRoblox) {
    try {
      // Récupère le vrai script depuis GitHub
      const response = await fetch('https://raw.githubusercontent.com/Moon-820/Tryx/refs/heads/main/Loader');
      
      if (!response.ok) {
        throw new Error(`GitHub responded with ${response.status}`);
      }
      
      let script = await response.text();
      
      // Ajoute un header de sécurité
      const securityHeader = `-- ============================================
-- 🔥 TRYX SCRIPT v2.1.0 | Christmas Edition 🎄
-- 🔒 PROTECTED BY SHΔDØW CORE
-- 🌐 OFFICIAL: https://tryxhub.netlify.app
-- ⏰ LOADED: ${new Date().toISOString()}
-- 🏷️ REQUEST-ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
-- ============================================

print("🎄 TRYX Christmas Edition v2.1.0")
print("🔐 Loading from secure gateway...")

-- Vérification d'origine
if not game:HttpGet then
    warn("TRYX Security: Invalid execution context")
    return
end

`;
      
      script = securityHeader + script;
      
      // Ajoute un watermark à la fin
      const watermark = `\n-- Watermark: TRYX_SECURE_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      script += watermark;
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/plain',
          'X-TRYX-Security': 'Protected',
          'X-TRYX-Origin': 'Official',
          'Cache-Control': 'public, max-age=3600'
        },
        body: script
      };
      
    } catch (error) {
      console.error('Error fetching script:', error);
      
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: `-- ❌ TRYX LOAD ERROR\nprint("Failed to load TRYX: ${error.message}")\n-- Please try again later`
      };
    }
  }
  
  // 🔴 CAS 3 : NI L'UN NI L'AUTRE → BLOQUE PRÉVENTIVEMENT
  return {
    statusCode: 403,
    headers: { 'Content-Type': 'text/plain' },
    body: '-- ACCESS DENIED\n-- Unrecognized client'
  };
};