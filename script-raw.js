exports.handler = async function(event, context) {
  // Ce endpoint sert DU TEXTE BRUT (pas du HTML)
  
  // Vérifie l'user-agent
  const userAgent = event.headers['user-agent'] || '';
  const referer = event.headers.referer || '';
  
  const isRoblox = userAgent.includes('Roblox') || 
                  userAgent.includes('Http') ||
                  referer.includes('script.html') ||
                  event.queryStringParameters.source === 'roblox';
  
  // 🔴 SI C'EST UN NAVIGATEUR NORMAL → BLOQUE
  const isBrowser = userAgent.includes('Mozilla') && 
                   !userAgent.includes('Roblox');
  
  if (isBrowser) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store'
      },
      body: `-- 🔒 ACCESS DENIED
-- This script can only be loaded from within Roblox
-- Attempt from: ${userAgent.substring(0, 50)}
-- Time: ${new Date().toISOString()}
-- Go to: https://tryxhub.netlify.app

print("TRYX Security: Unauthorized access attempt")`
    };
  }
  
  // ✅ SI ROBLOX → SERT LE VRAI SCRIPT
  const realScript = `-- ============================================
-- TRYX SCRIPT v2.1.0 | Christmas Edition 🎄
-- OFFICIAL: https://tryxhub.netlify.app
-- SECURITY: SHΔDØW CORE PROTECTED
-- LOADED: ${new Date().toISOString()}
-- ============================================

print("🎄 TRYX Christmas Edition v2.1.0")
print("🔐 Loading from secure gateway...")

-- Charge le vrai script TRYX
loadstring(game:HttpGet("https://raw.githubusercontent.com/Moon-820/Tryx/refs/heads/main/Loader"))()

print("✅ TRYX loaded successfully!")
print("🎅 Merry Christmas from moon_820!")

-- Watermark: TRYX_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}
-- Security Check: PASSED`;
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'X-TRYX-Security': 'Protected',
      'Cache-Control': 'public, max-age=3600'
    },
    body: realScript
  };
};