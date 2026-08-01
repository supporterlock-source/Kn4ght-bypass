// ============================================================
// STARFIELD EFFECT
// ============================================================
function createStars() {
    var container = document.getElementById('starContainer');
    for (var i = 0; i < 100; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        var size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(star);
    }
}
createStars();

// ============================================================
// TAB SWITCHING
// ============================================================
var tabBtns = document.querySelectorAll('.tab-btn');
var tabContents = {
    bypass: document.getElementById('tab-bypass'),
    obfuscator: document.getElementById('tab-obfuscator'),
    about: document.getElementById('tab-about')
};

tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        Object.values(tabContents).forEach(function(c) { c.classList.remove('active'); });
        this.classList.add('active');
        var tabId = this.dataset.tab;
        if (tabContents[tabId]) tabContents[tabId].classList.add('active');
    });
});

// ============================================================
// DOM ELEMENTS - PART 1
// ============================================================
var urlInput = document.getElementById('urlInput');
var apiSelect = document.getElementById('apiSelect');
var bypassBtn = document.getElementById('bypassBtn');
var testBtn = document.getElementById('testBtn');
var clearBtn = document.getElementById('clearBtn');
var loadingIndicator = document.getElementById('loadingIndicator');
var resultContainer = document.getElementById('resultContainer');
var resultBox = document.getElementById('resultBox');
var statusBadge = document.getElementById('statusBadge');
var fullUrlPreview = document.getElementById('fullUrlPreview');

// ============================================================
// DOM ELEMENTS - PART 2
// ============================================================
var luaInput = document.getElementById('luaInput');
var obfuscateBtn = document.getElementById('obfuscateBtn');
var clearLuaBtn = document.getElementById('clearLuaBtn');
var copyLuaBtn = document.getElementById('copyLuaBtn');
var downloadLuaBtn = document.getElementById('downloadLuaBtn');
var luaLoading = document.getElementById('luaLoading');
var luaResultContainer = document.getElementById('luaResultContainer');
var luaResultBox = document.getElementById('luaResultBox');
var codeStats = document.getElementById('codeStats');
var origSize = document.getElementById('origSize');
var obfSize = document.getElementById('obfSize');
var growth = document.getElementById('growth');

var confirmDialog = document.getElementById('confirmDialog');
var confirmYes = document.getElementById('confirmYes');
var confirmNo = document.getElementById('confirmNo');
var exitLink = document.getElementById('exitLink');

// ============================================================
// API CONFIGURATION
// ============================================================
var API_ENDPOINTS = {
    cosmic: {
        name: 'Cosmic API',
        base: 'https://cosmic-bypasser.vercel.app/api/bypass/free',
        method: 'GET',
        test: 'https://cosmic-bypasser.vercel.app/api/bypass/free?url=https://bstshrt.com/u/vy5c79'
    },
    abysm: {
        name: 'Abysm API',
        base: 'https://abysm.lat/api/free/bypass',
        method: 'GET',
        test: 'https://abysm.lat/api/free/bypass?url=https://bstshrt.com/u/vy5c79'
    }
};

// ============================================================
// BYPASS FUNCTIONS
// ============================================================
function setExample(url) {
    urlInput.value = url;
    updatePreview();
}

function updatePreview() {
    var url = urlInput.value.trim();
    var api = apiSelect.value;
    var endpoint = API_ENDPOINTS[api];
    if (url) {
        fullUrlPreview.textContent = endpoint.base + '?url=' + encodeURIComponent(url);
    } else {
        fullUrlPreview.textContent = 'No URL entered';
    }
}

// ============================================================
// SHOW RESULT FUNCTION
// ============================================================
function showResult(message, type, destination) {
    var html = '';
    if (destination) {
        html += '<div style="margin-bottom:16px;">';
        html += '<div style="color:#4ae0a0;font-weight:600;margin-bottom:4px;">BYPASS SUCCESSFUL</div>';
        html += '</div>';
        html += '<div class="destination-card">';
        html += '<div class="label">UNLOCKED LINK</div>';
        html += '<a href="' + destination + '" target="_blank" class="link">' + destination + '</a>';
        html += '<div class="btn-row">';
        html += '<button class="copy-btn" onclick="copyLink(\'' + destination + '\')">Copy Link</button>';
        html += '<button class="open-btn" onclick="window.open(\'' + destination + '\', \'_blank\')">Open Link</button>';
        html += '</div></div>';
    }
    html += '<div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(150,100,255,0.1);">';
    html += '<div style="font-size:11px;color:#6a5a8a;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Full Response</div>';
    html += '<pre style="font-size:12px;color:#b8a8e8;white-space:pre-wrap;word-break:break-all;margin:0;">' + message + '</pre>';
    html += '</div>';
    resultBox.innerHTML = html;
    resultBox.className = 'result-box ' + type;
    resultContainer.style.display = 'block';
}

function copyLink(url) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function() {
            var btn = event.target;
            var originalText = btn.textContent;
            btn.textContent = 'Copied';
            btn.style.background = 'rgba(34, 204, 136, 0.4)';
            setTimeout(function() {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        });
    } else {
        var textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Link copied to clipboard');
    }
}

// ============================================================
// CHECK API STATUS
// ============================================================
async function checkAPIStatus() {
    try {
        var response = await fetch('https://cosmic-bypasser.vercel.app/api/bypass/free?url=https://bstshrt.com/u/vy5c79', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            statusBadge.textContent = 'Cosmic API Online';
            statusBadge.className = 'status-badge status-online';
        } else {
            var response2 = await fetch('https://abysm.lat/api/free/bypass?url=https://bstshrt.com/u/vy5c79', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (response2.ok) {
                statusBadge.textContent = 'Abysm API Online';
                statusBadge.className = 'status-badge status-online';
            } else {
                statusBadge.textContent = 'All APIs Offline';
                statusBadge.className = 'status-badge status-offline';
            }
        }
    } catch (error) {
        statusBadge.textContent = 'Connection Failed';
        statusBadge.className = 'status-badge status-offline';
    }
}

// ============================================================
// TEST API
// ============================================================
async function testAPI() {
    loadingIndicator.style.display = 'block';
    bypassBtn.disabled = true;
    testBtn.disabled = true;
    resultContainer.style.display = 'none';

    try {
        var api = apiSelect.value;
        var endpoint = API_ENDPOINTS[api];
        var testUrl = endpoint.test || endpoint.base + '?url=https://bstshrt.com/u/vy5c79';

        var response = await fetch(testUrl, {
            method: endpoint.method || 'GET',
            headers: { 'Accept': 'application/json' }
        });

        var data;
        var contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            var text = await response.text();
            try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }
        }

        var output = 'API: ' + endpoint.name + '\n';
        output += 'Status: ' + response.status + ' ' + response.statusText + '\n';
        output += 'Response:\n' + JSON.stringify(data, null, 2);

        if (response.ok) {
            showResult(output, 'success', data.destination);
        } else {
            showResult(output, 'error');
        }
    } catch (error) {
        showResult('Request failed: ' + error.message, 'error');
        console.error('Test error:', error);
    } finally {
        loadingIndicator.style.display = 'none';
        bypassBtn.disabled = false;
        testBtn.disabled = false;
    }
}

// ============================================================
// BYPASS URL
// ============================================================
async function bypassURL() {
    var url = urlInput.value.trim();
    if (!url) {
        showResult('Please enter a valid URL', 'error');
        return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
        urlInput.value = url;
        updatePreview();
    }

    loadingIndicator.style.display = 'block';
    bypassBtn.disabled = true;
    testBtn.disabled = true;
    resultContainer.style.display = 'none';

    try {
        var api = apiSelect.value;
        var endpoint = API_ENDPOINTS[api];
        var bypassUrl = endpoint.base + '?url=' + encodeURIComponent(url);

        var response = await fetch(bypassUrl, {
            method: endpoint.method || 'GET',
            headers: { 
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        var data;
        var contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            var text = await response.text();
            try { 
                data = JSON.parse(text); 
            } catch (e) { 
                data = { raw: text }; 
            }
        }

        var output = 'API: ' + endpoint.name + '\n';
        output += 'Original: ' + url + '\n';
        output += 'Status: ' + response.status + ' ' + response.statusText + '\n';
        output += '\nFull Response:\n' + JSON.stringify(data, null, 2);

        if (response.ok) {
            var destination = data.destination || data.url || data.link || data.result || data.bypassed || data.unlocked || data.redirect;
            
            if (!destination && typeof data === 'object') {
                for (var key in data) {
                    if (typeof data[key] === 'string' && data[key].startsWith('http')) {
                        destination = data[key];
                        break;
                    }
                }
            }
            
            if (destination) {
                showResult(output, 'success', destination);
            } else {
                output += '\n\nNo destination URL found in response';
                showResult(output, 'info');
            }
        } else {
            showResult(output, 'error');
        }
    } catch (error) {
        var errorMsg = 'Request failed: ' + error.message;
        errorMsg += '\n\nTips:\n';
        errorMsg += 'Make sure the URL is valid\n';
        errorMsg += 'Try using a different API (Cosmic or Abysm)\n';
        errorMsg += 'Check your internet connection';
        showResult(errorMsg, 'error');
        console.error('Bypass error:', error);
    } finally {
        loadingIndicator.style.display = 'none';
        bypassBtn.disabled = false;
        testBtn.disabled = false;
    }
}

// ============================================================
// LUA OBFUSCATOR
// ============================================================
function setLuaExample(type) {
    var examples = {
        simple: '-- Simple Script\nprint(\'Hello World!\')\nlocal x = 10\nlocal y = 20\nprint(x + y)',
        complex: '-- Complex Script\nlocal function calculate(a, b, c)\n    local result = (a * b) + c\n    return result\nend\n\nlocal data = {\n    name = "KN4GHT",\n    version = "1.0",\n    features = {"bypass", "obfuscate"}\n}\n\nfor i, v in ipairs(data.features) do\n    print(v)\nend',
        function: '-- Function Example\nlocal function greet(name)\n    return "Hello, " .. name .. "!"\nend\n\nlocal function process(data)\n    for i, v in ipairs(data) do\n        print(greet(v))\n    end\nend\n\nlocal names = {"Alice", "Bob", "Charlie"}\nprocess(names)',
        table: '-- Table Example\nlocal config = {\n    settings = {\n        enabled = true,\n        timeout = 30,\n        retries = 3\n    },\n    endpoints = {\n        "https://api1.com",\n        "https://api2.com"\n    }\n}\n\nfunction config:print()\n    print("Enabled:", self.settings.enabled)\n    print("Timeout:", self.settings.timeout)\nend\n\nconfig:print()'
    };
    luaInput.value = examples[type] || examples.simple;
}

// ============================================================
// OBFUSCATE LUA
// ============================================================
async function obfuscateLua() {
    var script = luaInput.value.trim();
    if (!script) {
        luaResultBox.textContent = 'Please enter a Lua script to obfuscate';
        luaResultBox.className = 'result-box error';
        luaResultContainer.style.display = 'block';
        codeStats.classList.remove('active');
        return;
    }

    luaLoading.style.display = 'block';
    obfuscateBtn.disabled = true;
    luaResultContainer.style.display = 'none';

    try {
        var response = await fetch('https://wearedevs.net/api/obfuscate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script: script })
        });

        var data = await response.json();

        if (response.ok && data.obfuscated) {
            var obfuscated = data.obfuscated;
            luaResultBox.textContent = obfuscated;
            luaResultBox.className = 'result-box success';
            luaResultContainer.style.display = 'block';
            codeStats.classList.add('active');

            origSize.textContent = script.length;
            obfSize.textContent = obfuscated.length;
            var growthPercent = ((obfuscated.length - script.length) / script.length * 100).toFixed(1);
            growth.textContent = growthPercent + '%';
        } else {
            luaResultBox.textContent = 'Obfuscation failed: ' + (data.error || 'Unknown error');
            luaResultBox.className = 'result-box error';
            luaResultContainer.style.display = 'block';
            codeStats.classList.remove('active');
        }
    } catch (error) {
        luaResultBox.textContent = 'Request failed: ' + error.message;
        luaResultBox.className = 'result-box error';
        luaResultContainer.style.display = 'block';
        codeStats.classList.remove('active');
        console.error('Obfuscate error:', error);
    } finally {
        luaLoading.style.display = 'none';
        obfuscateBtn.disabled = false;
    }
}

// ============================================================
// COPY LUA RESULT
// ============================================================
function copyLuaResult() {
    var text = luaResultBox.textContent;
    if (!text) {
        alert('No text to copy');
        return;
    }
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            var btn = copyLuaBtn;
            var original = btn.textContent;
            btn.textContent = 'Copied';
            setTimeout(function() { btn.textContent = original; }, 2000);
        });
    } else {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Copied to clipboard');
    }
}

// ============================================================
// DOWNLOAD LUA RESULT
// ============================================================
function downloadLuaResult() {
    var text = luaResultBox.textContent;
    if (!text || text === '') {
        alert('No text to download. Please obfuscate a script first.');
        return;
    }
    
    try {
        var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        
        var link = document.createElement('a');
        link.href = url;
        link.download = 'obfuscated_script.lua';
        document.body.appendChild(link);
        link.click();
        
        setTimeout(function() {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
        
        var btn = downloadLuaBtn;
        var original = btn.textContent;
        btn.textContent = 'Downloaded';
        setTimeout(function() { btn.textContent = original; }, 2000);
        
    } catch (error) {
        alert('Download failed: ' + error.message);
        console.error('Download error:', error);
    }
}

// ============================================================
// CLEAR FUNCTIONS
// ============================================================
function clearResults() {
    resultContainer.style.display = 'none';
    resultBox.innerHTML = '';
    resultBox.className = 'result-box';
}

function clearLuaResults() {
    luaResultContainer.style.display = 'none';
    luaResultBox.textContent = '';
    luaResultBox.className = 'result-box';
    codeStats.classList.remove('active');
}

// ============================================================
// CONFIRM DIALOG
// ============================================================
function showConfirmDialog() {
    confirmDialog.classList.add('show');
}

function hideConfirmDialog() {
    confirmDialog.classList.remove('show');
}

// ============================================================
// EVENT LISTENERS
// ============================================================
bypassBtn.addEventListener('click', bypassURL);
testBtn.addEventListener('click', testAPI);
clearBtn.addEventListener('click', clearResults);

obfuscateBtn.addEventListener('click', obfuscateLua);
clearLuaBtn.addEventListener('click', clearLuaResults);
copyLuaBtn.addEventListener('click', copyLuaResult);
downloadLuaBtn.addEventListener('click', downloadLuaResult);

urlInput.addEventListener('input', updatePreview);
apiSelect.addEventListener('change', updatePreview);

urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        bypassURL();
    }
});

exitLink.addEventListener('click', function(e) {
    e.preventDefault();
    showConfirmDialog();
});

confirmYes.addEventListener('click', function() {
    hideConfirmDialog();
    resultBox.innerHTML = 'Exiting... Goodbye';
    resultBox.className = 'result-box info';
    resultContainer.style.display = 'block';
    bypassBtn.disabled = true;
    testBtn.disabled = true;
    urlInput.disabled = true;
});

confirmNo.addEventListener('click', function() {
    hideConfirmDialog();
    resultBox.innerHTML = 'Stayed in application';
    resultBox.className = 'result-box success';
    resultContainer.style.display = 'block';
});

document.addEventListener('click', function(e) {
    if (confirmDialog.classList.contains('show')) {
        if (!confirmDialog.contains(e.target) && e.target !== exitLink) {
            hideConfirmDialog();
        }
    }
});

// ============================================================
// INIT
// ============================================================
checkAPIStatus();
setInterval(checkAPIStatus, 60000);
updatePreview();

console.log('KN4GHT BYPASS loaded');
console.log('Lua Obfuscator ready');
console.log('Click Download .lua to save obfuscated scripts');